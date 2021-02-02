import { atom } from "recoil";

export const status = atom({
  key: 'status',
  default: {
    ip: 0,
    op: 0,
    fr: 0,
  }
})

export const isPaused = atom({
  key: 'isPaused',
  default: false
})

export const loop = atom({
  key: 'loop',
  default: true
})

export const direction = atom({
  key: 'direction',
  default: 1
})