import React, { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
    const [idp, setIdp] = useState(null);

    return (
        <GlobalStateContext.Provider value={{ idp, setIdp }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
