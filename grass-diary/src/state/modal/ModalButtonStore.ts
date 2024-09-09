import { create } from 'zustand';

type Button1Props = {
  active: boolean;
  text: string;
  color?: string;
  interaction?: string;
};

type Button2Props = {
  active: boolean;
  text?: string;
  onClick?: () => void;
  color?: string;
  interaction?: string;
};

type Actions = {
  setButton1: (
    active: boolean,
    text: string,
    color?: string,
    interaction?: string,
  ) => void;

  setButton2: (
    active: boolean,
    text?: string,
    onClick?: () => void,
    color?: string,
    interaction?: string,
  ) => void;
};

interface ModalButtonState {
  button1: Button1Props;
  button2: Button2Props;
  actions: Actions;
}

const useModalButtonStore = create<ModalButtonState>(set => ({
  button1: {
    active: false,
    text: '',
    color: '',
    interaction: '',
  },
  button2: {
    active: false,
    text: '',
    color: '',
    interaction: '',
  },

  actions: {
    setButton1: (active, text, color, interaction) =>
      set({ button1: { active, text, color, interaction } }),
    setButton2: (active, text, onClick, color, interaction) =>
      set({ button2: { active, text, onClick, color, interaction } }),
  },
}));

export const useModalButton1 = () =>
  useModalButtonStore(state => state.button1);
export const useModalButton2 = () =>
  useModalButtonStore(state => state.button2);
export const useModalButtonActions = () =>
  useModalButtonStore(state => state.actions);
