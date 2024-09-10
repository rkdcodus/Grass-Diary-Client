import { create } from 'zustand';

type Button1Props = {
  active: boolean;
  text: string;
  color?: string;
  interaction?: string;
};

type Button2Props = {
  active: boolean;
  text: string;
  color?: string;
  interaction?: string;
  clickHandler: () => void;
};

type Actions = {
  setButton1: ({ active, text, color, interaction }: Button1Props) => void;
  setButton2: ({
    active,
    text,
    color,
    interaction,
    clickHandler,
  }: Button2Props) => void;
  setResetActive: () => void;
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
    clickHandler: () => console.log('button2 default'),
  },

  actions: {
    setResetActive: () =>
      set(state => ({
        button1: { ...state.button1, active: false },
        button2: { ...state.button2, active: false },
      })),
    setButton1: ({ active, text, color, interaction }) =>
      set(state => ({
        button1: { ...state.button1, active, text, color, interaction },
      })),
    setButton2: ({ active, text, color, interaction, clickHandler }) =>
      set(state => ({
        button2: {
          ...state.button2,
          active,
          text,
          color,
          interaction,
          clickHandler,
        },
      })),
  },
}));

export const useModalButton1 = () =>
  useModalButtonStore(state => state.button1);
export const useModalButton2 = () =>
  useModalButtonStore(state => state.button2);
export const useModalButtonActions = () =>
  useModalButtonStore(state => state.actions);
