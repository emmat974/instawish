"use client";

import Avatar from "../User/Avatar";
import styles from '@/styles/Profil.module.css';

export default function Profil({ user, followers, followings, posts }) {
    return <>
        <div className={`row ${styles.profil} my-2`}>
            <div className="col-sm-12 col-md-4 text-center text-md-start">
                <Avatar image={user.imageUrl} size="lg" />
            </div>
            <div className="col-sm-12 col-md-8 mt-3 mt-md-0">
                <div className="row">
                    <div className="col-12">
                        <h2>{user.username}</h2>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="text-center">
                            <div className="row">
                                <div className="col">
                                    <span className="fw-bold">{posts}</span>
                                    <p>publications</p>
                                </div>
                                <div className="col">
                                    <span className="fw-bold">{followers}</span>
                                    <p>followers</p>
                                </div>
                                <div className="col">
                                    <span className="fw-bold">{followings}</span>
                                    <p>suivis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}