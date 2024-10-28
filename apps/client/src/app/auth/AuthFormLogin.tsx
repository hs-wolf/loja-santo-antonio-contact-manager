'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalButton from '../(global)/GlobalButton';

export default function AuthFormLogin({
  changeForm,
}: {
  changeForm: () => void;
}) {
  enum Fields {
    EMAIL = 'email',
    PASSWORD = 'password',
  }

  const validationFormSchema = z.object({
    [Fields.EMAIL]: z.string().email({ message: 'Digite um e-mail válido' }),
    [Fields.PASSWORD]: z
      .string()
      .min(8, { message: 'Pelo menos 8 caracteres' }),
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
      <p className="text-xs text-end">
        Não tem uma conta?{' '}
        <button className="font-bold text-accent-brand" onClick={changeForm}>
          Criar conta
        </button>
      </p>
      <div className="flex flex-col justify-center flex-1 gap-[36px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Acessar conta</h1>
          <GlobalInputField
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            error={errors[Fields.EMAIL]?.message}
            {...register(Fields.EMAIL)}
          />
          <GlobalInputField
            type="password"
            label="Senha"
            placeholder="Insira sua senha"
            error={errors[Fields.PASSWORD]?.message}
            {...register(Fields.PASSWORD)}
          />
        </div>
        <GlobalButton
          name={'login'}
          label={'Acessar conta'}
          type="submit"
          className="self-end"
        />
      </div>
    </form>
  );
}
