import './App.css';
import Counter from './Counter.jsx';
import Gallery from './Gallery.jsx';
import UserProfile from './UserProfile.jsx';
import TaskManager from "./TaskManager.jsx";
import ShoppingListWithImmer from "./ShoppingListWithImmer.jsx";
import UserProfileImmer from "./UserProfileImmer.jsx";
import DogLaboratory from './DogQueryApp.jsx'

function App() {
    return (
        <div className="studio-root">
            <header className="studio-header">
                <div className="header-content">
                    <div className="title-block">
                        <h1 className="main-title">React Development Portfolio</h1>
                        <p className="subtitle">AD 312 // Intermediate Web Applications</p>
                    </div>
                    <div className="status-indicator">
                        <span className="pulse-dot"></span>
                        <span className="status-text">Laboratory Active</span>
                    </div>
                </div>
            </header>

            <main className="studio-stage">
                {/* Lab 01: State Snapshots */}
                <section className="lab-section">
                    <h2 className="section-title">State Management & Snapshots</h2>
                    <Counter />
                </section>

                {/* Lab 02: Recipe Gallery */}
                <section className="lab-section">
                    <h2 className="section-title">Interactive Index Navigation</h2>
                    <Gallery />
                </section>

                {/* Lab 03: State Change */}
                <section className="lab-section">
                    <h2 className="section-title">Nested State Immutability</h2>
                    <UserProfile />
                </section>

            {/* Lab 04: TaskManager */}
            <section className="lab-section">
                <h2 className="section-title">Task Manager</h2>
                <TaskManager />
            </section>

            {/* Lab 05: Shopping List With Immer*/}
            <section className="lab-section">
                <h2 className="section-title">Shopping List with Immer</h2>
                 <ShoppingListWithImmer />
            </section>

            {/* Lab 05:  User Profile With Immer*/}
            <section className="lab-section">
                <h2 className="section-title"> User Profile with Immer</h2>
                <UserProfileImmer />
            </section>

                {/* Lab 06: Dog API Explorer */}
                <section className="lab-section">
                    <h2 className="section-title">Dog API Explorer</h2>
                    <DogLaboratory />
                </section>


        </main>



    <footer className="studio-footer">
                <p>© 2026 Ellie Noble // North Seattle College</p>
            </footer>
        </div>
    );
}

export default App;