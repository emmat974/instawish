"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Blocks } from "react-loader-spinner";

export default function Posts({ me, posts }) {
    const [currentPosts, setCurrentPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const fetchApi = async () => {
        try {
            const response = await fetch(`https://symfony-instawish.formaterz.fr/api/home/page/${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setCurrentPosts(prevPosts => [...prevPosts, ...data]);
                    setPage(prevPage => prevPage + 1);
                }
            } else {
                throw new Error('Erreur réseau');
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    }

    const onDelete = async (id) => {
        try {
            const response = await fetch(`https://symfony-instawish.formaterz.fr/api/post/remove/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                },
            });

            if (response.ok) {
                setCurrentPosts(currentPosts.filter((post) => post.id !== id));
            } else {
                throw new Error('Erreur lors de la suppression du post');
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    }

    let isMounted = true;
    useEffect(() => {
        if (posts) {
            setCurrentPosts(posts);
            setHasMore(false);
        }
        else {
            if (isMounted) {
                fetchApi();
            }

            isMounted = false;
        }
    }, []);

    return (
        <InfiniteScroll
            dataLength={currentPosts.length}
            next={fetchApi}
            hasMore={hasMore}
            loader={<Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>C'est tout</b>
                </p>
            }
        >
            {currentPosts.map(post => (
                <Post key={post.id} post={post} me={me} onDelete={onDelete} />
            ))}
        </InfiniteScroll>
    );
}
