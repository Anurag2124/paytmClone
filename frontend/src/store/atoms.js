import { atom } from "recoil";

export const usersState = atom({
  key: 'usersState',
  default: []
})

export const loggedInUserState = atom({
  key: 'loggedInUserState',
  default: {}
})

export const filterState = atom({
  key: 'filterState',
  default: ''
})