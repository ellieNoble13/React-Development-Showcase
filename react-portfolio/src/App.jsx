import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Hub
import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import About from './pages/About';

// Import All Labs
import Counter from './pages/Counter';
import DogQueryApp from './pages/DogQueryApp';
import Gallery from './pages/Gallery';
import PostManager from './pages/PostManager';
import ShoppingListWithImmer from './pages/ShoppingListWithImmer';
import TaskManager from './pages/TaskManager';
import UserProfile from './pages/UserProfile';
import UserProfileImmer from './pages/UserProfileImmer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MainLayout provides the Header, Nav, and Footer */}
                <Route path="/" element={<MainLayout />}>

                    {/* This is the first thing users see at the root URL */}
                    <Route index element={<LandingPage />} />

                    {/* Individual Lab Routes */}
                    <Route path="lab/counter" element={<Counter />} />
                    <Route path="lab/dogs" element={<DogQueryApp />} />
                    <Route path="lab/gallery" element={<Gallery />} />
                    <Route path="lab/posts" element={<PostManager />} />
                    <Route path="lab/shopping" element={<ShoppingListWithImmer />} />
                    <Route path="lab/tasks" element={<TaskManager />} />
                    <Route path="lab/profile-basic" element={<UserProfile />} />
                    <Route path="lab/profile-immer" element={<UserProfileImmer />} />

                    {/* About Page*/}
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;