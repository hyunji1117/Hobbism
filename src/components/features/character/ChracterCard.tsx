import { Lock } from 'lucide-react';
import Image from 'next/image';

interface ChracterCardProps {
  name: string;
  src: string;
  nickName: string;
  locked: boolean;
}

export default function ChracterCard({
  name,
  src,
  nickName,
  locked,
}: ChracterCardProps) {
  return (
    <div
      className={`flex h-[124px] w-[113px] flex-col items-center rounded-[18px] pt-5 ${locked ? 'bg-black opacity-50' : 'bg-[#F3F4F6]'}`}
    >
      {locked ? (
        <>
          <Lock size={24} className="my-3 text-white" />
          <span className="text-center text-[12px] leading-4 font-medium text-white">
            아직 달성 되지 <br />
            않았어요!
          </span>
        </>
      ) : (
        <>
          <Image
            src={src}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="relative top-3 text-sm text-[#4B5563]">
            {nickName}
          </span>
        </>
      )}
    </div>
  );
}
