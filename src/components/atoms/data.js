import { atom, selector } from "recoil";
import { parseColors } from '../../core'

export const data = atom({
  key: 'data',
  default: null
})

export const parsedColor = selector({
  key: 'parsed-color',
  get: ({ get }) => {
    const json = get(data)

    return parseColors(json)
  }
})