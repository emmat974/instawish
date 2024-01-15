"use client";

import { useState } from "react";
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            console.error('Les champs email et mot de passe sont requis');
            return;
        }

        try {
            const response = await fetch('https://symfony-instawish.formaterz.fr/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Problème de connexion');
            }
            const { token } = await response.json();
            Cookies.set('authToken', token, { expires: 1 / 24 });

            console.log("Hello les gens");
            return document.location.href = 'http://localhost:3000/';
        } catch (error) {
            setErrors(true);
            console.error(error.message);
        }
    };


    return <>
        <h1 className="text-center my-4">Connexion</h1>
        {errors ?? <div className="alert alert-danger">
            Mot de passe ou identifiant incorrect
        </div>}
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <span>Pas encore de compte ? </span><a href="/inscription">Inscrivez-vous</a>
                </div>
            </div>
        </div>
    </>

}