import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn-small"
            style={{ fontWeight: 'bold' }}
        >

            {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeSwitcher;