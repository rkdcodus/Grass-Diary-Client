import { useToastSetActive, useToastSetText } from './ToastStore';

export const useToast = () => {
  const setText = useToastSetText();
  const setActive = useToastSetActive();

  const toast = (text: string) => {
    setText(text);
    setActive();

    setTimeout(() => {
      setActive();
    }, 5000);
  };

  return { toast };
};
