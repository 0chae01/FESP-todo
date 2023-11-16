import { atom } from 'recoil';

export const todoFilterAtom = atom<TodoFilterType>({
  key: 'todoFilterAtom',
  default: 'All',
});
