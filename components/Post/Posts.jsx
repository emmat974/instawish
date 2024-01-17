"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import Cookies from 'js-cookie';


export default function Posts({ posts, me }) {
    const [currentPosts, setCurrentPosts] = useState([]);

    useEffect(() => {
        setCurrentPosts(posts);
    }, [posts])

    const onDelete = async (id) => {
        try {
            const response = await fetch("https://symfony-instawish.formaterz.fr/api/post/remove/" + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                },
            });
            setCurrentPosts(currentPosts.filter((post) => post.id != id));
        } catch (error) {
            console.error('Failed to check following status', error);
        }
    }

    return <>
        {currentPosts.map(post => (
            <Post key={post.id} post={post} me={me} onDelete={onDelete} />
        ))}
    </>
}