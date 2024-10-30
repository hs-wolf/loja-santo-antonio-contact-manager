'use client';

import { contacts as Contact } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from '../../public/images/logo.svg';
import GlobalButtonIcon from './(global)/GlobalButtonIcon';
import { IconName } from './(global)/GlobalIcon';
import HomeFilter, { FilterList } from './(home)/HomeFilter';
import HomeHeader from './(home)/HomeHeader';
import HomeModalUnlock from './(home)/HomeModalUnlock';
import HomeModalAddContact from './(home)/HomeModalAddContact';
import HomeModalEditContact from './(home)/HomeModalEditContact';
import { getContacts, deletecontact, supabaseLogout } from './(home)/actions';
import { createClient } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';
import HomeListItem from './(home)/HomeListItem';

export default function HomePage() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [currentFilter, setFilter] = useState<FilterList>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dataToUnlock, setDataToUnlock] = useState<string>('');
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);
  const [showModalAddContact, setShowModalAddContact] =
    useState<boolean>(false);
  const [showModalEditContact, setShowModalEditContact] =
    useState<boolean>(false);
  const [dataToChange, setDataToChange] = useState<string>('');

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function changeFilter(value: FilterList) {
    setFilter(value === currentFilter ? undefined : value);
  }

  const fetchContacts = async () => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      const data = await getContacts();
      console.log('I was callled');
      setContacts(() => data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  function unlockData(id: string) {
    setDataToUnlock(id);
    setShowUnlockModal(true);
  }

  function saveUnlockedData(data: Contact) {
    const index = contacts.findIndex((contact) => contact.id === data.id);
    if (index >= 0) {
      const newContacts = contacts.map((contact, i) => {
        if (i === index) {
          return data;
        }
        return contact;
      });
      setContacts(() => newContacts);
      setShowUnlockModal(false);
    }
  }

  function saveNewContact(data: Contact) {
    const newContacts = [...contacts];
    newContacts.push(data);
    setContacts(() => newContacts);
    setShowModalAddContact(false);
  }

  function removeContact(id: string) {
    const index = contacts.findIndex((contact) => contact.id === id);
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(() => newContacts);
    deletecontact(id);
  }

  function changeContact(id: string) {
    setDataToChange(id);
    setShowModalEditContact(true);
  }

  return (
    <div className="relative flex flex-1 gap-[25px] py-[46px] ps-[36px] pe-[84px] justify-end overflow-hidden">
      <nav className="flex flex-col justify-between items-center w-[111px] h-full">
        <Image src={Logo} alt="Guard" width={29} height={32} />
        <div className="flex flex-col gap-3">
          <GlobalButtonIcon
            name={'account'}
            icon={IconName.ACCOUNT_CIRCLE}
            active={true}
          />
          <GlobalButtonIcon name={'account'} icon={IconName.SETTINGS} />
          <GlobalButtonIcon
            name={'account'}
            icon={IconName.LOGOUT}
            action={() => supabaseLogout()}
          />
        </div>
        <div className="flex flex-col gap-1 text-[10px]">
          <p className="text-content-muted font-bold">Logado como:</p>
          <p className="text-content-body">{user?.email}</p>
        </div>
      </nav>
      <div className="flex flex-col flex-1 gap-[32px] p-[40px] bg-background-secondary rounded-[40px]">
        <HomeHeader addContact={() => setShowModalAddContact(true)} />
        <div className="flex flex-1 gap-[48px] overflow-hidden">
          <HomeFilter value={currentFilter} select={changeFilter} />
          <div className="flex flex-col flex-1 gap-[29px] me-[54px]">
            <p className="min-h-[38px] text-sm font-bold border-b border-content-primary/20">
              {currentFilter ?? 'Todos'}
            </p>
            {isFetching ? (
              <div className="flex flex-col justify-center items-center flex-1 animate-pulse">
                <Image src={Logo} alt="Guard" width={58} height={64} />
              </div>
            ) : (
              <div className="flex flex-col overflow-auto hide-scrollbar">
                {contacts.map((contact) => (
                  <HomeListItem
                    contact={contact}
                    key={contact.id}
                    change={changeContact}
                    unlock={unlockData}
                    remove={removeContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showUnlockModal && (
        <HomeModalUnlock
          id={dataToUnlock}
          close={() => setShowUnlockModal(false)}
          back={() => setShowUnlockModal(false)}
          save={saveUnlockedData}
        />
      )}
      {showModalAddContact && (
        <HomeModalAddContact
          close={() => setShowModalAddContact(false)}
          cancel={() => setShowModalAddContact(false)}
          save={saveNewContact}
        />
      )}
      {showModalEditContact && (
        <HomeModalEditContact
          id={dataToChange}
          close={() => setShowModalEditContact(false)}
          cancel={() => setShowModalEditContact(false)}
        />
      )}
    </div>
  );
}
