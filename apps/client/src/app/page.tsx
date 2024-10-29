'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Logo from '../../public/images/logo.svg';
import GlobalButtonIcon from './(global)/GlobalButtonIcon';
import { IconName } from './(global)/GlobalIcon';
import HomeFilter, { FilterList } from './(home)/HomeFilter';
import HomeHeader from './(home)/HomeHeader';
import HomeList from './(home)/HomeList';
import HomeModalUnlock from './(home)/HomeModalUnlock';
import HomeModalAddContact from './(home)/HomeModalAddContact';
import HomeModalEditContact from './(home)/HomeModalEditContact';
import { supabaseLogout } from './actions';
import { createClient } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function HomePage() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const [currentFilter, setFilter] = useState<FilterList>();

  function changeFilter(value: FilterList) {
    setFilter(value === currentFilter ? undefined : value);
  }

  const [dataToUnlock, setDataToUnlock] = useState<string[]>([]);
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);

  function unlockData() {
    setDataToUnlock([]);
    setShowUnlockModal(true);
  }

  function saveUnlockedData(data: unknown[]) {
    setShowUnlockModal(false);
  }

  const [showModalAddContact, setShowModalAddContact] =
    useState<boolean>(false);

  function saveNewContact(data: unknown) {
    setShowModalAddContact(false);
  }

  const [showModalEditContact, setShowModalEditContact] =
    useState<boolean>(false);
  const [dataToChange, setDataToChange] = useState<string>();
  const [dataToRemove, setDataToRemove] = useState<string>();

  function changeContact(id: string) {
    setDataToChange(id);
    setShowModalEditContact(true);
  }

  function removeContact(id: string) {
    setDataToRemove(id);
  }

  function saveContactChange(data: unknown) {
    setShowModalEditContact(false);
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
      <main className="flex flex-col flex-1 gap-[32px] p-[40px] bg-background-secondary rounded-[40px]">
        <HomeHeader
          unlockAll={unlockData}
          addContact={() => setShowModalAddContact(true)}
        />
        <div className="flex flex-1 gap-[48px] overflow-hidden">
          <HomeFilter value={currentFilter} select={changeFilter} />
          <div className="flex flex-col flex-1 gap-[29px] me-[54px]">
            <p className="min-h-[38px] text-sm font-bold border-b border-content-primary/20">
              {currentFilter ?? 'Todos'}
            </p>
            <HomeList
              change={changeContact}
              unlock={unlockData}
              remove={removeContact}
            />
          </div>
        </div>
      </main>
      {showUnlockModal && (
        <HomeModalUnlock
          data={dataToUnlock}
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
          close={() => setShowModalEditContact(false)}
          cancel={() => setShowModalEditContact(false)}
          save={saveContactChange}
        />
      )}
    </div>
  );
}
