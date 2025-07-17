import Image from 'next/image';

interface LoginButtonProps {
  children: string;
  onClick?: () => void;
  iconSrc: string;
  width: number;
  height: number;
  className: string
}

export function LoginButton({children, onClick, iconSrc, width, height, className}: LoginButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      <Image src={iconSrc} alt={`${children} icon`} width={width} height={height}></Image>
      {children}
    </button>
  );
}
export default LoginButton;
