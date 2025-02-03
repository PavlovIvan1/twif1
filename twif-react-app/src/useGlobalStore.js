// import create from 'zustand'

// export const useGlobalStore = create((set) => ({
//     Id_party: null,
//     setId_party: (newId_party) => set({ Id_party: newId_party }),
// }));


import { create } from 'zustand'

export const useGlobalStore = create((set) => ({
    idp: null, // Начальное значение idp
    setIdp: (newIdp) => set({ idp: newIdp }), // Функция для обновления idp

    dailyBoost: null,
    setDailyBoost: (newDailyBoost) => set({dailyBoost: newDailyBoost}),

    dailyNftBoost: null,
    setDailyNftBoost: (newDailyNftBoost) => set({dailyNftBoost: newDailyNftBoost}),

    squadFounders: [], // Новое состояние для squadFounders
    setSquadFounders: (newSquadFounders) => set({ squadFounders: newSquadFounders }),

    squadFoundersIds: [], 
    setSquadFoundersIds: (newSquadFoundersIds) => set({ squadFoundersIds: newSquadFoundersIds }),


}));