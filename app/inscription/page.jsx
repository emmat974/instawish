"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setErrors(true);
            console.error('Les champs email et mot de passe sont requis');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);

            const response = await fetch('https://symfony-instawish.formaterz.fr/api/register', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                setErrors(true);
                throw new Error('Problème d\'inscription');
            }

            return document.location.href = 'http://localhost:3000/connexion';
        } catch (error) {
            setErrors(true);
            console.error(error.message);
        }
    };


    return <>
        <h1 className="text-center my-4">Inscription</h1>
        {errors ?? <div className="alert alert-danger">
            Vous n'avez pas remplir tous les champs
        </div>}
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Pseudo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mot de Passe</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profilePicture" className="form-label">Photo de profil</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="profilePicture"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">M'inscrire</button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <span>Vous possédez déjà un compte ? </span><Link href="/inscription">Me connecter</Link>
                </div>
            </div>
        </div>
    </>

}