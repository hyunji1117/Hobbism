// export default function Home() {
//   return <h1>final-01-1bone v2</h1>;
// }

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (session) {
      router.push('/character');
      return;
    }

    const timer = setTimeout(() => {
      router.push('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, session, status]);

  if (status === 'loading' || session) {
    return <Loading />;
  }

  return (
    <div className="absolute top-0 left-0 z-100 h-screen w-full overflow-hidden bg-[#a4a4a4]">
      {/* 로고 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="logo-animation text-center">
          <h1 className="mb-1">
            <Image
              src="/images/splash/logo.png"
              alt="로고"
              width={368}
              height={144}
              className="mx-auto h-30 w-auto"
            />
          </h1>
          <p className="mobile-text text-base font-normal text-white">
            SNS 가입 한번으로 취미 소통과 쇼핑까지!
          </p>
        </div>
      </div>

      {/* 위쪽 곰돌이 */}
      <div className="bear-top-animation absolute -top-18 -right-2 rotate-14">
        <Image
          src="/images/splash/bear-character02.png"
          alt="곰 캐릭터"
          width={1159}
          height={1321}
          priority
          className="mobile-bear h-auto w-60 rotate-180"
        />
      </div>

      {/* 아래쪽 곰돌이 */}
      <div className="bear-bottom-animation absolute bottom-0 left-0">
        <Image
          src="/images/splash/bear-character02.png"
          alt="곰 캐릭터"
          width={1159}
          height={1321}
          priority
          className="mobile-bear h-auto w-60"
        />
      </div>
    </div>
  );
}
