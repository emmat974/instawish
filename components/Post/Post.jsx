import Link from "next/link";
import Avatar from "../User/Avatar";
import Image from "next/image";
import styles from '@/styles/Post.module.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Comments from "../Comment/Comments";

export default function Post({ post }) {
    const [likesCount, setLikesCount] = useState(post.likeds.length);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        let isLiked = false;
        for (let i = 0; i < post.likeds.length; i++) {
            if (post.likeds[i].user.id === 57) {
                isLiked = true;
                break;
            }
        }
        setLiked(isLiked);
    }, [post.likeds]);

    const handleLike = async (id) => {

        try {
            const response = await fetch("https://symfony-instawish.formaterz.fr/api/liked/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                },
            });
            if (!liked) {
                setLiked(true);
                setLikesCount(likesCount + 1);
            } else {
                setLiked(false);
                setLikesCount(likesCount - 1);
            }
        } catch (error) {
            console.error('Failed to check following status', error);
        }
    };


    const imageLoader = (src) => {
        return `https://symfony-instawish.formaterz.fr${src}`;
    }

    return <>
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <Link href={`/user/${post.createdBy.id}`} className="d-flex align-items-center text-dark text-decoration-none">
                    <Avatar image={post.createdBy.imageUrl} />
                    <span className={`ms-2 ${styles.username}`}>{post.createdBy.username}</span>
                </Link>
            </div>

            <Image
                src={imageLoader(post.imageUrl)}
                width={500}
                height={500}
                alt={post.description}
                layout="responsive"
                className="card-img-top"
            />

            <div className="card-body">
                <p className="card-text"><i>{post.description}</i></p>
                <button onClick={() => handleLike(post.id)} className={liked ? "btn btn-dark" : "btn btn-light"}>
                    {liked ? '💙 ' : '❤️ '}
                    {likesCount} J'aime
                </button>
                {post.comments.length > 0 && (
                    <div className="my-2">
                        <Comments comments={post.comments} idPost={post.id} />
                    </div>
                )}
            </div>
        </div>
    </>
}