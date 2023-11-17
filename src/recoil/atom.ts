import { atom } from 'recoil';

export const todoFilterAtom = atom<TodoFilterType>({
  key: 'todoFilterAtom',
  default: 'All',
});

export const todoSortAtom = atom<TodoSortType>({
  key: 'todoSortAtom',
  default: 'latest',
});

export const todoListAtom = atom<TodoItem[]>({
  key: 'todoListAtom',
  default: [],
});

export const todoSearchAtom = atom<string>({
  key: 'todoSearchAtom',
  default: '',
});
