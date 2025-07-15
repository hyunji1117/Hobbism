import Image from 'next/image';

interface LoginButtonProps {
  children: string;
  onClick: () => void;
  iconSrc: string;
  width: number;
  height: number;
}

export function LoginButton({children, onClick, iconSrc, width, height}: LoginButtonProps) {
  return (
    <button onClick={onClick}>
      <Image src={iconSrc} alt={`${children} icon`} width={width} height={height}></Image>
      {children}
    </button>
  );
}
export default LoginButton;
