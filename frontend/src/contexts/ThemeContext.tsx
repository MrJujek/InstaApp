import React, { ReactNode, useContext, useEffect, useState } from "react";

interface ThemeProvider {
    isDarkTheme: boolean;
    changeTheme: () => void;
}

export const ThemeContext = React.createContext({} as ThemeProvider);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const value = {
        isDarkTheme,
        changeTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}