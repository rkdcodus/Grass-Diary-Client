import { atom } from 'recoil';

export const memberIdAtom = atom<number>({
  key: 'memberId',
  default: 0,
});
