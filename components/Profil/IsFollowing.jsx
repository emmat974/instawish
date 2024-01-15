"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function IsFollowing({ userProfileId, userMeId }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const checkFollowingStatus = async () => {
            try {
                const response = await fetch("https://symfony-instawish.formaterz.fr/api/follow/followings/" + userMeId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + Cookies.get('authToken')
                    },
                });
                const data = await response.json();
                const isCurrentlyFollowing = data.followings.some(following => following.following.id === userProfileId);
                setIsFollowing(isCurrentlyFollowing);

            } catch (error) {
                console.error('Failed to check following status', error);
            }
        };

        checkFollowingStatus();
    }, [userMeId]);

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

    return (
        <div className="my-4">
            <button onClick={handleFollowToggle} className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );

}
