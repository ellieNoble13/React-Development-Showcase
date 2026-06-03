import { useLocalStorage } from '../utils/useLocalStorage';

const ThemeSettingsLab = () => {
    // Uses Custom Hook
    const [theme, setTheme] = useLocalStorage('app_theme_mode', 'light');

    // sets style based on cached values
    const isDark = theme === 'dark';

    const previewBoxStyle = {
        padding: '30px',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: isDark ? '#1e293b' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#0f172a',
        border: '1px solid var(--border)',
        marginTop: '20px',
        textAlign: 'center'
    };

    return (
        <div className="lab-card text-left">
            <h2>Custom LocalStorage Hook</h2>
            <p className="text-muted text-small" style={{ marginBottom: '20px' }}>
                This lab uses your custom <code>useLocalStorage</code> hook to manage preference state.
                Toggle the mode buttons below, then refresh your browser tab to see the memory persistence layer in action.
            </p>

            {/* Theme Toggle Button Controller */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    type="button"
                    onClick={() => setTheme('light')}
                    style={{
                        flex: 1,
                        background: !isDark ? 'var(--accent)' : 'var(--bg-color)',
                        color: !isDark ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid var(--border)',
                        fontWeight: !isDark ? 'bold' : 'normal'
                    }}
                >
                    Light Mode
                </button>
                <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    style={{
                        flex: 1,
                        background: isDark ? 'var(--accent)' : 'var(--bg-color)',
                        color: isDark ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid var(--border)',
                        fontWeight: isDark ? 'bold' : 'normal'
                    }}
                >
                    Dark Mode
                </button>
            </div>

            {/* Interactive Theme Preview Zone */}
            <div style={previewBoxStyle}>
                <h3 style={{ color: 'inherit', margin: '0 0 10px 0' }}>
                    {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
                </h3>
                <p style={{ color: 'inherit', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                    The state variable inside this card container is bound directly to your utility hook.
                </p>
            </div>

            {/* Live LocalStorage Data Monitor */}
            <div style={{ marginTop: '25px', background: 'var(--bg-color)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ marginTop: 0, marginBottom: '8px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    Live LocalStorage Cache Inspector
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    settings_key: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>"app_theme_mode"</span>
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    raw_json_value: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>"{theme}"</span>
                </p>
            </div>
        </div>
    );
};

export default ThemeSettingsLab;