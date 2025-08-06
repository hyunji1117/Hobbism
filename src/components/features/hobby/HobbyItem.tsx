import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  code: string;
  image: string;
  title: string;
  label: string;
  selected?: boolean;
  onSelect: () => void;
}

export default function HobbyItem({
  image,
  title,
  label,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className={cn(
        'flex cursor-pointer gap-4 rounded-xl border-2 border-[#E9EBED] bg-white p-4',
        selected && 'border-2 border-gray-500',
      )}
      onClick={onSelect}
    >
      <div className="relative aspect-square w-14">
        <Image
          src={image}
          alt={title}
          fill
          sizes="84px"
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{title}</p>
      </div>
    </div>
  );
}
