import { atom } from 'recoil'

export const controllerCurrentTime = atom({
  key: 'controller-current-time',
  default: 0
})

export const lottieCurrentTime = atom({
  key: 'lottie-current-time',
  default: 0
})