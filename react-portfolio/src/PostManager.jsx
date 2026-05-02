import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const PostManager = () => {
    const queryClient = useQueryClient();

    // --- STATE ---
    const [userIdFilter, setUserIdFilter] = useState("");
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [editPost, setEditPost] = useState(null); // Used for both PUT and PATCH

    // --- 1. FETCHING (GET) ---
    const { data: posts, isPending, isError } = useQuery({
        queryKey: ['posts', userIdFilter],
        queryFn: () => fetch(userIdFilter ? `${BASE_URL}?userId=${userIdFilter}` : BASE_URL).then(res => res.json())
    });

    // --- 2. CREATING (POST) ---
    const createMutation = useMutation({
        mutationFn: (post) => fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ ...post, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(res => res.json()),
        onSuccess: (data) => {
            alert(`POST SUCCESS! Created Item #${data.id}. (Note: Mock APIs don't save permanently)`);
            setNewPost({ title: '', body: '' });
            queryClient.invalidateQueries(['posts']);
        }
    });

    // --- 3. UPDATING (PUT - Full Replace) ---
    const updateMutation = useMutation({
        mutationFn: (post) => fetch(`${BASE_URL}/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(res => res.json()),
        onSuccess: () => {
            alert("PUT SUCCESS: Entire post updated on server!");
            setEditPost(null);
            queryClient.invalidateQueries(['posts']);
        }
    });

    // --- 4. PATCHING (PATCH - Title Only) ---
    const patchMutation = useMutation({
        mutationFn: ({ id, title }) => fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(res => res.json()),
        onSuccess: () => {
            alert("PATCH SUCCESS: Title updated on server!");
            setEditPost(null);
            queryClient.invalidateQueries(['posts']);
        }
    });

    // --- 5. DELETING (DELETE) ---
    const deleteMutation = useMutation({
        mutationFn: (id) => fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            alert("DELETE SUCCESS: Post removed from server!");
            queryClient.invalidateQueries(['posts']);
        }
    });

    if (isPending) return <div className="status-indicator"><span className="pulse-dot"></span> Talking to Server...</div>;

    return (
        <div className="lab-card text-left">
            <h2>JSONPlaceholder CRUD Explorer</h2>

            {/* Task 6: Filter Section */}
            <div className="mt-2">
                <p className="subtitle">Filter by User ID</p>
                <input
                    type="number"
                    placeholder="Search User ID (1-10)..."
                    value={userIdFilter}
                    onChange={(e) => setUserIdFilter(e.target.value)}
                />
            </div>

            {/* Task 2, 3, & 4: Create/Edit Form */}
            <div className="alert-box mt-2" style={{ background: '#f8fafc', borderColor: '#d1d5db' }}>
                <p className="subtitle">{editPost ? `Editing Post #${editPost.id}` : "Create New Post"}</p>

                <input
                    placeholder="Post Title"
                    value={editPost ? editPost.title : newPost.title}
                    onChange={(e) => editPost ? setEditPost({...editPost, title: e.target.value}) : setNewPost({...newPost, title: e.target.value})}
                />

                {/* Only show body field for POST and PUT (PATCH only needs title) */}
                <textarea
                    className="mt-2"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'inherit' }}
                    placeholder="Post Body"
                    value={editPost ? editPost.body : newPost.body}
                    onChange={(e) => editPost ? setEditPost({...editPost, body: e.target.value}) : setNewPost({...newPost, body: e.target.value})}
                />

                <div className="flex-wrap-gap mt-2">
                    {editPost ? (
                        <>
                            <button className="success-btn btn-small" onClick={() => updateMutation.mutate(editPost)}>Save (PUT)</button>
                            <button className="btn-small" onClick={() => patchMutation.mutate({ id: editPost.id, title: editPost.title })}>Patch Title</button>
                            <button className="fail-btn btn-small" onClick={() => setEditPost(null)}>Cancel</button>
                        </>
                    ) : (
                        <button className="success-btn btn-small" onClick={() => createMutation.mutate(newPost)}>Create Post (POST)</button>
                    )}
                </div>
            </div>

            {/* Task 1 & 5: Scroll List */}
            <div className="section-divider">
                <p className="subtitle">Server Feed</p>
                <div className="scroll-list" style={{ maxHeight: '300px' }}>
                    {posts?.slice(0, 10).map(post => (
                        <div key={post.id} className="list-item" style={{ borderBottom: '1px solid #eee', cursor: 'default' }}>
                            <strong>{post.title}</strong>
                            <p className="text-muted text-small">{post.body}</p>
                            <div className="flex-wrap-gap mt-2">
                                <button className="btn-small" onClick={() => setEditPost(post)}>Edit</button>
                                <button className="fail-btn btn-small" onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostManager;