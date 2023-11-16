import { atom } from 'recoil';

export const todoFilterAtom = atom<TodoFilterType>({
  key: 'todoFilterAtom',
  default: 'All',
});

export const todoSortAtom = atom<TodoSortType>({
  key: 'todoSortAtom',
  default: 'latest',
});
