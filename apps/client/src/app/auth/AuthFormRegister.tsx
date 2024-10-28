'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalButton from '../(global)/GlobalButton';

export default function AuthFormRegister({
  changeForm,
}: {
  changeForm: () => void;
}) {
  enum Fields {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
  }

  const validationFormSchema = z
    .object({
      [Fields.NAME]: z.string().min(1, { message: 'Este campo é obrigatório' }),
      [Fields.EMAIL]: z.string().email({ message: 'Digite um e-mail válido' }),
      [Fields.PASSWORD]: z
        .string()
        .min(8, { message: 'Pelo menos 8 caracteres' })
        .regex(/(?=.*[0-9])|(?=.*[!@#$%^&*(),.?":{}|<>])/, {
          message: 'Contém um número ou símbolo',
        }),
      [Fields.CONFIRM_PASSWORD]: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'As senhas devem ser iguais',
      path: ['confirmPassword'],
    });

  type ValidationFormSchema = z.infer<typeof validationFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormSchema>({
    resolver: zodResolver(validationFormSchema),
  });

  const onSubmit = (data: ValidationFormSchema) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[50px] flex-1"
    >
      <p className="text-xs text-end">
        Já tem uma conta?{' '}
        <button className="font-bold text-accent-brand" onClick={changeForm}>
          Acessar conta
        </button>
      </p>
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <div className="flex flex-col flex-1 gap-[88px]">
        <div className="flex flex-col  gap-5">
          <GlobalInputField
            label="Nome"
            placeholder="Como você se chama?"
            error={errors[Fields.NAME]?.message}
            {...register(Fields.NAME)}
          />
          <GlobalInputField
            type="email"
            label="E-mail"
            placeholder="Seu e-mail aqui"
            error={errors[Fields.EMAIL]?.message}
            {...register(Fields.EMAIL)}
          />
          <GlobalInputField
            type="password"
            label="Senha"
            placeholder="Escolha uma senha segura"
            error={errors[Fields.PASSWORD]?.message}
            {...register(Fields.PASSWORD)}
          />
          <GlobalInputField
            type="password"
            label="Repetir a senha"
            placeholder="Repita sua senha para confirmar"
            error={errors[Fields.CONFIRM_PASSWORD]?.message}
            {...register(Fields.CONFIRM_PASSWORD)}
          />
        </div>
        <GlobalButton
          name={'register'}
          label={'Criar conta'}
          type="submit"
          className="self-end"
        />
      </div>
    </form>
  );
}
