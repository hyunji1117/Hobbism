import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <ClipLoader
        size={20}
        color="#4A4A4A"
        cssOverride={{ borderWidth: '3px' }}
      />
    </div>
  );
}
