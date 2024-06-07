import React, { useEffect, useState } from 'react';

const News = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            fetchPosts(); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Latest News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <div key={post._id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <p className="text-gray-700">{post.description}</p>
                        <div className="flex justify-end mt-4">
                            {/* <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                                Delete
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
