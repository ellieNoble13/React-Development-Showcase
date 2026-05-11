import { useParams, useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';

const PostView = () => {
    const { postId } = useParams(); // Grabs the ID from the URL
    const navigate = useNavigate(); // For the back button logic

    // Find the post by ID (must parse postId to an integer)
    const post = posts.find((p) => p.id === parseInt(postId));

    if (!post) {
        return (
            <div className="lab-card">
                <h2 className="fail-btn">Post Not Found</h2>
                <button onClick={() => navigate('/blog')} className="mt-2">Back to Feed</button>
            </div>
        );
    }

    return (
        <div className="lab-card text-left">
            <p className="subtitle" style={{ fontSize: '0.7rem' }}>Module: Dynamic View</p>
            <h2 className="main-title">{post.title}</h2>

            <div className="section-divider">
                <p className="text-muted" style={{ lineHeight: '1.6' }}>
                    {post.content}
                </p>
            </div>


            <button
                onClick={() => navigate('/blog')}
                className="mt-2"
                style={{ background: '#ced2ef', color: '#1d1d1f' }}
            >
                ← Return to Feed
            </button>
        </div>
    );
};

export default PostView;