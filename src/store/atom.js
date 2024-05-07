import { atom, selector } from "recoil"

export const isLoggedInAtom = atom({
    key : 'isLoggedInAtom',
    default : localStorage.getItem('token')? true : false
})
export const currentLevelAtom = atom({
    key : 'currentLevelAtom',
    default : 1
})
