import { create } from 'zustand';

type Setting = {
  title: string;
  content: string;
};

type Actions = {
  setActive: (active: boolean) => void;
  setSetting: ({ title, content }: Setting) => void;
};

type ModalState = {
  active: boolean;
  setting: Setting;
  actions: Actions;
};

const useModalStore = create<ModalState>(set => ({
  active: false,
  setting: {
    title: '',
    content: '',
  },
  actions: {
    setActive: active => set({ active }),
    setSetting: setting => set({ setting }),
  },
}));

export const useModalSetting = () => useModalStore(state => state.setting);
export const useModalActive = () => useModalStore(state => state.active);
export const useModalActions = () => useModalStore(state => state.actions);
