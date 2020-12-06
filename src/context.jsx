import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");

    return (
        <AppContext.Provider
            value={{
                accessToken,
                setAccessToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };