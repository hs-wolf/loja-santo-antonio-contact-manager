'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { contacts as Contact } from '@prisma/client';
import { createClient } from '../../utils/supabase/server';
import customFetch from '../../utils/customFetch';
import { CreateContactValidationSchema } from '@loja-santo-antonio-contact-manager/models';

export async function supabaseLogout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect('/auth');
}

export async function createContact(data: CreateContactValidationSchema) {
  const newContact = await customFetch<Contact>('POST', 'contacts', data);
  return newContact;
}

export async function getContacts() {
  const contacts = await customFetch<Contact[]>('GET', `contacts`);
  return contacts;
}

export async function updateContact(
  id: string,
  data: CreateContactValidationSchema
) {
  await customFetch('PUT', `contacts/${id}`, data);
}

export async function deletecontact(id: string) {
  await customFetch('DELETE', `contacts/${id}`);
}

export async function unlockContact(id: string) {
  const contact = await customFetch<Contact>('GET', `contacts/${id}/unlock`);
  return contact;
}
