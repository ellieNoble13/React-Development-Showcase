import { Link } from 'react-router-dom';

const LandingPage = () => {
    const labGroups = [
        {
            category: "Dynamic Content",
            items: [
                { path: "/blog", title: "Multi Page Blog", desc: "Multi-page blog with dynamic routing and useParams." }
            ]
        },
        {
            category: "Data & APIs",
            items: [
                { path: "/lab/dogs", title: "Dog API Explorer", desc: "TanStack Query fetching & caching." },
                { path: "/lab/posts", title: "CRUD Operations", desc: "Full Server-State management (REST)." }
            ]
        },
        {
            category: "UI & Layout (Phase 3 Prep)",
            items: [
                { path: "/lab/gallery", title: "Recipe Gallery", desc: "Responsive grid layout and media handling." },
                { path: "/lab/tasks", title: "Task Manager", desc: "Filtering and persistent list logic." }
            ]
        },
        {
            category: "State Management Labs",
            items: [
                { path: "/lab/shopping", title: "Immer Shopping", desc: "Complex list state with useImmer." },
                { path: "/lab/profile-immer", title: "User Profile (Immer)", desc: "Deeply nested object updates." },
                { path: "/lab/profile-basic", title: "User Profile (Basic)", desc: "Standard object state patterns." },
                { path: "/lab/counter", title: "Counter Basics", desc: "The fundamental useState counter." }
            ]
        }
    ];

    return (
        <div className="lab-card">
            <h2 className="main-title">Project Laboratory</h2>
            <p className="subtitle" style={{ marginBottom: '30px' }}>
                Select A Lab
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {labGroups.map((group, gIndex) => (
                    <div key={gIndex} className="text-left">
                        <p className="subtitle" style={{ color: '#9ca3af', marginBottom: '10px', fontSize: '0.7rem' }}>
                            {group.category}
                        </p>

                        <div className="grid-halves" style={{ gap: '12px' }}>
                            {group.items.map((item, iIndex) => (
                                <Link key={iIndex} to={item.path} className="list-item" style={{
                                    textDecoration: 'none',
                                    padding: '15px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    display: 'block'
                                }}>
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