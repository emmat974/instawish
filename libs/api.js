import { cookies } from 'next/headers'

const API_URL = "https://symfony-instawish.formaterz.fr/api";

async function fetchAPI(uri = '', isLogging = false, method = "GET", data = null) {
    const cookieStore = cookies();
    let headers = {}
    if (isLogging) {
        headers = {
            "Authorization": "Bearer " + cookieStore.get("authToken").value // Assurez-vous de sécuriser votre token
        }
    }

    let options = {
        method: method,
        headers: headers
    }

    if (data != null) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(API_URL + uri, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json(); // Assurez-vous de retourner les données JSON
    } catch (error) {
        console.error('Failed to fetch API', error);
        throw error; // Propagez l'erreur pour une gestion ultérieure
    }
}

export async function getHome() {
    const data = await fetchAPI("/home/page/0", true);
    return data;
}

export async function getMe() {
    const data = await fetchAPI("/me", true);
    return data;
}

export async function getFollowers() {
    const data = await fetchAPI("/users", true);
    return data;
}

export async function getLogin(data) {
    const res = await fetchAPI("/login_check", false, "POST", data);
    return res;
}

export async function getPostsUser(id) {
    const res = await fetchAPI("/home/" + id, true)
    return res;
}

export async function getUserFollowers(id) {
    const res = await fetchAPI("/follow/followers/" + id, true);
    return res;
}

export async function getUserFollowings(id) {
    const res = await fetchAPI("/follow/followings/" + id, true);
    return res;
}