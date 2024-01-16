"use client";

import Post from "./Post";

export default function Posts({ posts, me }) {
    return <>
        {posts.map(post => (
            <Post key={post.id} post={post} me={me} />
        ))}
    </>
}