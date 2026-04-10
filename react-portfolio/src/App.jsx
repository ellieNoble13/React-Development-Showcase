import './App.css';
import Counter from './Counter.jsx';

function App() {
    return (
        <div className="studio-root">
            <header className="studio-header">
                <div className="header-content">
                    <h1 className="main-title">React State Lab</h1>
                    <div className="status-indicator">
                        <span className="pulse-dot"></span>
                        <span className="status-text">Active</span>
                    </div>
                </div>
            </header>

            <main className="studio-stage">
                <Counter />
            </main>

            <footer className="studio-footer">
                <p>© 2026 Ellie Noble // Intermediate Development II</p>
            </footer>
        </div>
    );
}

export default App;