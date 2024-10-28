'use client';

import { useState } from 'react';
import AuthFormLogin from './AuthFormLogin';
import AuthFormRegister from './AuthFormRegister';

export default function AuthForm() {
  const [loginOrRegister, switchLoginOrRegister] = useState(true);

  function toggleDivs() {
    switchLoginOrRegister(!loginOrRegister);
  }

  return (
    <div className="z-10 flex flex-col w-[497px] h-full py-[40px] px-[88px] bg-background-secondary overflow-auto">
      {loginOrRegister ? (
        <AuthFormRegister changeForm={toggleDivs} />
      ) : (
        <AuthFormLogin changeForm={toggleDivs} />
      )}
    </div>
  );
}
