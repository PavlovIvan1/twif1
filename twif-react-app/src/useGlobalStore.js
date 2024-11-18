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



    // fetchIdsForSquadFounders: async () => {
    //     const { squadFounders } = get();
    //     const ids = [];
    
    //     for (const founder of squadFounders) {
    //         try {
    //             const response = await fetch(`https://playcloud.pro/users/search?query=${founder.name}`);
    //             const data = await response.json();
    
    //             if (data.users && data.users.length > 0) {
    //                 ids.push(data.users[0].id);
    //             }
    //         } catch (error) {
    //             console.error('Ошибка при запросе:', error);
    //         }
    //     }
    
    //     console.log('Полученные ID:', ids);
    // },

    // fetchIdsForSquadFounders: async () => {
    //     const { squadFounders } = get();
    //     const ids = [];
    
    //     for (const founder of squadFounders) {
    //         try {
    //             const response = await fetch(`https://playcloud.pro/users/search?query=${founder.name}`);
    //             const data = await response.json();
    //             console.log("Search data", data)
    //             if (data.users && data.users.length > 0) {
    //                 const founderIds = data.users.map(user => user.id);11111
    //                 ids.push(...founderIds);
    //             }
    //         } catch (error) {
    //             console.error('Ошибка при запросе:', error);
    //         }
    //     }
    
    //     console.log('Полученные ID:', ids);
    // },

}));