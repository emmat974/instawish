"use client";

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Logout() {

    useEffect(() => {
        // Supprimer le cookie "authToken"
        Cookies.remove('authToken')

        return document.location.href = 'http://localhost:3000/connexion';
    }, []);

    // Vous pouvez afficher un message ou un indicateur de chargement ici
    return (
        <div>En cours de déconnexion...</div>
    );
}
