export type Code =
  | 'sofa'
  | 'mirror'
  | 'frame'
  | 'shelf'
  | 'diffuser'
  | 'circulator';

export type Item = {
  name: string;
  code: Code;
  image: string;
  price: number;
  width: number;
  height: number;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  hobby: string;
  z: number;
};
