import Image from 'next/image';
import BgLine1 from '../../../public/images/bg-line-1.svg';
import BgLine2 from '../../../public/images/bg-line-2.svg';
import BgLine3 from '../../../public/images/bg-line-3.svg';
import LogoText from '../../../public/images/logo-text.svg';
import AuthForm from './AuthForm';

export default function AuthPage() {
  return (
    <div className="relative flex flex-1 justify-end overflow-hidden">
      <div className="absolute flex w-full h-full blur-xl">
        <Image
          src={BgLine1}
          alt="Line 1"
          width={612}
          height={526}
          className="absolute top-[-263px] left-[-347px]"
          priority
        />
        <Image
          src={BgLine2}
          alt="Line 2"
          width={1022}
          height={186}
          className="absolute top-[66px] left-[507px]"
          priority
        />
        <Image
          src={BgLine3}
          alt="Line 3"
          width={866}
          height={379}
          className="absolute top-[512px] left-[-16px]"
          priority
        />
      </div>
      <button className="absolute top-[50px] left-[98px]">
        <Image src={LogoText} alt="Guard" width={131} height={32} />
      </button>
      <AuthForm />
    </div>
  );
}
