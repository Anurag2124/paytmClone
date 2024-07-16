import { atom } from "recoil";

export const usersState = atom({
  key: 'usersState',
  default: []
})

export const filterState = atom({
  key: 'filterState',
  default: ''
})