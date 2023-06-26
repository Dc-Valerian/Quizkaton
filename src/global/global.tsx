import { atom } from "recoil"
// import { recoilPersist } from "recoil-persist"


// const { persistAtom } = recoilPersist();
export const holdValue = atom({
    key: "holdValue",
    default: 0,
    // effects_UNSTABLE: [persistAtom]
})