import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
        // Setting this is a string for potentially adding more than two themes
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // nothing to see here
    const activateClownMode = () => setTheme('clown');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, activateClownMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook always useful
export const useTheme = () => useContext(ThemeContext);