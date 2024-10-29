'use server';

import {
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  RegisterFields,
  RegisterValidationSchema,
  LoginFields,
  LoginValidationSchema,
} from '@loja-santo-antonio-contact-manager/models';
import { createClient } from '../../utils/supabase/server';

export async function supabaseLogin(data: LoginValidationSchema) {
  const supabase = await createClient();

  const credentials: SignInWithPasswordCredentials = {
    email: data[LoginFields.EMAIL],
    password: data[LoginFields.PASSWORD],
  };

  const { error: signInError } = await supabase.auth.signInWithPassword(
    credentials
  );

  if (signInError) {
    throw signInError;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function supabaseRegister(data: RegisterValidationSchema) {
  const supabase = await createClient();

  const credentials: SignUpWithPasswordCredentials = {
    email: data[RegisterFields.EMAIL],
    password: data[RegisterFields.PASSWORD],
  };

  const { data: response, error: signUpError } = await supabase.auth.signUp(
    credentials
  );
  if (signUpError) {
    throw signUpError;
  }

  const userId = response.user?.id;
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ name: data[RegisterFields.NAME] })
    .eq('id', userId);

  if (updateError) {
    throw updateError;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
