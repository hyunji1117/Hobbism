'use client';

import { Toaster } from 'react-hot-toast';

const toastOption = {
  style: {
    background: 'white',
    color: 'black',
    borderRadius: '999px',
    padding: '8px 8px 8px 14px',
    font: '16px',
  },
  duration: 1500,
  success: {
    iconTheme: {
      primary: 'white',
      secondary: 'black',
    },
  },
};

export const ToastProvider = () => {
  return <Toaster toastOptions={toastOption} />;
};
