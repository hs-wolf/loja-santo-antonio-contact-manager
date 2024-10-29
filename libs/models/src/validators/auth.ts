import { z } from 'zod';

export enum RegisterFields {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export const registerValidaitonSchema = z
  .object({
    [RegisterFields.NAME]: z
      .string()
      .min(1, { message: 'Este campo é obrigatório' }),
    [RegisterFields.EMAIL]: z
      .string()
      .email({ message: 'Digite um e-mail válido' }),
    [RegisterFields.PASSWORD]: z
      .string()
      .min(8, { message: 'Pelo menos 8 caracteres' })
      .regex(/(?=.*[0-9])|(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: 'Contém um número ou símbolo',
      }),
    [RegisterFields.CONFIRM_PASSWORD]: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type RegisterValidationSchema = z.infer<typeof registerValidaitonSchema>;

export enum LoginFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const loginValidationSchema = z.object({
  [LoginFields.EMAIL]: z.string().email({ message: 'Digite um e-mail válido' }),
  [LoginFields.PASSWORD]: z
    .string()
    .min(8, { message: 'Pelo menos 8 caracteres' }),
});

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>;
