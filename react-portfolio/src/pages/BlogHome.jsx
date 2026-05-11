import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

const BlogHome = () => {
    return (
        <div className="lab-card text-left">
            <h2 className="main-title">Blog Feed</h2>
            <p className="subtitle">Select a post to read the full content</p>

            <div className="scroll-list mt-2">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/blog/post/${post.id}`}
                        className="list-item"
                        style={{ display: 'block', textDecoration: 'none' }}
                    >
                        <strong>{post.title}</strong>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogHome;