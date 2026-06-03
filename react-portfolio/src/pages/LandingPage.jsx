import { Link } from 'react-router-dom';
import {posts} from "../data/posts.js";
import {useWindowSize} from "../utils/useWindowSize.jsx";

const LandingPage = () => {
    const labGroups = [
        {
            category: "Dynamic Content",
            items: [
                { path: "/blog", title: "Blog", desc: "Multi-page blog with dynamic routing and useParams." },
                { path: "/lab/gallery", title: "Recipe Gallery v2", desc: "Transitioning from local state to dynamic URL parameters." },
                { path: "/lab/registration", title: "User Registration", desc: "Form verification using React Hook Form." },
                { path: "/lab/canvas", title:"Dynamic Canvas", desc: "Live canvas that tracks window size"},
                { path: "/lab/pokemonvote", title:"Pokemon Vote", desc: "Using Chart.js, vote for your favorite Pokemon"}
               ]
        },
        {
            category: "Server-State & APIs",
            items: [
                { path: "/lab/dogs", title: "Dog API Explorer", desc: "TanStack Query fetching & caching." },
                { path: "/lab/posts", title: "CRUD Operations", desc: "Full Server-State management (REST)." },
                { path: "/lab/profile-mutation", title: "Server Profile Form", desc: "TanStack queries with React Hook Form." }

            ]
        },
        {
            category: "State Management Labs",
            items: [
                { path: "/lab/shopping", title: "Immer Shopping", desc: "Complex list state with useImmer." },
                { path: "/lab/profile-immer", title: "User Profile (Immer)", desc: "Deeply nested object updates." },
                { path: "/lab/basic-profile", title: "User Profile", desc: "Now with context API!"},
                { path: "/lab/tasks", title: "Task Manager", desc: "Filtering and persistent list logic." },
                { path: "/lab/counter", title: "Counter With Use State", desc: "Fundamental useState patterns." }
            ]
        }
    ];
    const {width, height} =  useWindowSize ()
    return (
        <div className="lab-card">
            <h2 className="main-title">Project Laboratory</h2>
            <dv>
                { (() =>{
                    if(width < 768) return <h2 className="subtitle">Mobile</h2>
                    else return <h2 className="subtitle">Desktop</h2>})()}
            </dv>
            <p className="subtitle" style={{ marginBottom: '30px' }}>
                Select a Lab
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {labGroups.map((group, gIndex) => (
                    <div key={gIndex} className="text-left">
                        <p className="subtitle" style={{ color: '#9ca3af', marginBottom: '10px', fontSize: '0.7rem' }}>
                            {group.category}
                        </p>

                        <div className="grid-halves" style={{ gap: '12px' }}>
                            {group.items.map((item, iIndex) => (
                                <Link key={iIndex} to={item.path} className="list-item">
                                    <strong style={{ color: '#6366f1', display: 'block', fontSize: '0.85rem' }}>
                                        {item.title}
                                    </strong>
                                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                                        {item.desc}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;