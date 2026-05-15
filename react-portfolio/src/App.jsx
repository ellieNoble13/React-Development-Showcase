import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout & Hub
import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import './App.css'

// Import All Labs
import Counter from './pages/Counter';
import DogQueryApp from './pages/DogQueryApp';
import Gallery from './pages/Gallery';
import PostManager from './pages/PostManager';
import ShoppingListWithImmer from './pages/ShoppingListWithImmer';
import TaskManager from './pages/TaskManager';
import UserProfile from './pages/UserProfile';
import UserProfileImmer from './pages/UserProfileImmer';
import BlogHome from './pages/BlogHome';
import PostView from './pages/PostView.jsx';
import RecipeDetail from "./pages/RecipeDetail.jsx";


const queryClient = new QueryClient();

function App() {
    return (

        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<LandingPage />} />

                        {/* Ensure these paths match your LandingPage links */}
                        <Route path="lab/counter" element={<Counter />} />
                        <Route path="lab/dogs" element={<DogQueryApp />} />
                        <Route path="lab/gallery" element={<Gallery />} />
                        <Route path="lab/posts" element={<PostManager />} />
                        <Route path="lab/shopping" element={<ShoppingListWithImmer />} />
                        <Route path="lab/tasks" element={<TaskManager />} />
                        <Route path="lab/profile-basic" element={<UserProfile />} />
                        <Route path="lab/profile-immer" element={<UserProfileImmer />} />

                        <Route path="blog" element={<BlogHome />} />
                        <Route path="blog/post/:postId" element={<PostView />} />
                        <Route path="recipe/:id" element={<RecipeDetail />} />
                        <Route path="about" element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;