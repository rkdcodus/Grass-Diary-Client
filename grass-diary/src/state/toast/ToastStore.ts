import { create } from 'zustand';

interface ToastState {
  text: string;
  active: boolean;
  setText: (text: string) => void;
  setActive: () => void;
}

const useToastStore = create<ToastState>(set => ({
  text: 'test',
  active: false,
  setText: text => set({ text }),
  setActive: () => set(state => ({ active: !state.active })),
}));

export const useToastText = () => useToastStore(state => state.text);
export const useToastActive = () => useToastStore(state => state.active);
export const useToastSetText = () => useToastStore(state => state.setText);
export const useToastSetActive = () => useToastStore(state => state.setActive);
