import { create } from 'zustand';

type Actions = {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setActive: (active: boolean) => void;
};

interface ModalState {
  title: string;
  content: string;
  active: boolean;
  actions: Actions;
}

const useModalStore = create<ModalState>(set => ({
  title: '',
  content: '',
  active: false,
  actions: {
    setTitle: title => set({ title }),
    setContent: content => set({ content }),
    setActive: active => set({ active }),
  },
}));

export const useModalTitle = () => useModalStore(state => state.title);
export const uesModalContent = () => useModalStore(state => state.content);
export const useModalActive = () => useModalStore(state => state.active);
export const useModalActions = () => useModalStore(state => state.actions);
