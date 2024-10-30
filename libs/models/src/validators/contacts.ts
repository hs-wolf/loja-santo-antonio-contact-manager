import { z } from 'zod';

export enum CreateContactFields {
  NAME = 'name',
  PHONE = 'phone',
  EMAIL = 'email',
}

export const createContactValidaitonSchema = z.object({
  [CreateContactFields.NAME]: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  [CreateContactFields.PHONE]: z
    .string()
    .min(1, { message: 'Este campo é obrigatório' }),
  [CreateContactFields.EMAIL]: z
    .string()
    .email({ message: 'Digite um e-mail válido' }),
});

export type CreateContactValidationSchema = z.infer<
  typeof createContactValidaitonSchema
>;
