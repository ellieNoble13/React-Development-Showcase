import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const MainLayout = () => {
    const { theme } = useTheme();

    return (
        <div className={`studio-root ${theme}-mode`}>
            <header className="studio-header">
                <div className="header-content">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 className="main-title">
                            DevStudio <span className="subtitle">v2.0</span>
                        </h1>
                    </Link>

                    <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', fontSize: '0.8rem' }}>
                            Dashboard
                        </Link>
                        <Link to="/about" style={{ fontWeight: 'bold', textDecoration: 'none', fontSize: '0.8rem' }}>
                            About
                        </Link>
                        <ThemeSwitcher />
                    </nav>
                </div>
            </header>

            <main className="studio-stage">
                <Outlet />
            </main>

            <footer className="studio-footer">
                © 2026 ELLIE NOBLE // NORTH SEATTLE COLLEGE
            </footer>
        </div>
    );
};

export default MainLayout;