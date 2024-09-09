import { useModalButtonActions } from './ModalButtonStore';
import { useModalActions } from './ModalStore';

interface Settings {
  button1: boolean;
  button2: boolean;
  text1: string;
  text2?: string;
  onClick2?: () => void;
  color1?: string;
  color2?: string;
  interaction1?: string;
  interaction2?: string;
}

export const useModal = () => {
  const { setActive, setTitle, setContent } = useModalActions();
  const { setButton1, setButton2 } = useModalButtonActions();

  const modal = (title: string, content: string, settings: Settings) => {
    const onClick2 = () => {
      if (settings.onClick2) settings.onClick2();
      setActive(false);
    };

    setTitle(title);
    setContent(content);
    setActive(true);

    setButton1(
      settings.button1,
      settings.text1,
      settings.color1,
      settings.interaction1,
    );
    setButton2(
      settings.button2,
      settings.text2,
      onClick2,
      settings.color2,
      settings.interaction2,
    );
  };

  return { modal };
};
