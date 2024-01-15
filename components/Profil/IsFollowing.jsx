"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Blocks } from 'react-loader-spinner';

export default function IsFollowing({ followers, userMeId, userProfileId }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        let isLiked = false;
        for (let i = 0; i < followers.length; i++) {
            if (followers[i].follower.id === userMeId) {
                isLiked = true;
                break;
            }
        }
        setIsFollowing(isLiked);
    }, [followers]);

    const handleFollowToggle = async () => {
        try {
            const response = await fetch("https://symfony-instawish.formaterz.fr/api/follow/add/" + userProfileId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                }
            });

            if (response.ok) {
                setIsFollowing(!isFollowing);
            } else {
                console.error('Failed to toggle follow status');
            }
        } catch (error) {
            console.error('Failed to send follow toggle request', error);
        }
    };

    const handleUnFollowToggle = async () => {
        try {
            const response = await fetch("https://symfony-instawish.formaterz.fr/api/follow/remove/" + userProfileId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + Cookies.get('authToken')
                }
            });

            if (response.ok) {
                setIsFollowing(!isFollowing);
            } else {
                console.error('Failed to toggle follow status');
            }
        } catch (error) {
            console.error('Failed to send follow toggle request', error);
        }
    };

    return <>
        <div className="my-4">
            <button onClick={isFollowing ? handleUnFollowToggle : handleFollowToggle} className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}>
                {isFollowing ? 'Ne pas suivre' : 'Suivre'}
            </button>
        </div>
    </>

}
