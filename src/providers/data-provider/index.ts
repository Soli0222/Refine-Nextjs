// dataProvider.js
import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

const createAuthAxiosInstance = async () => {
    const session = await getSession();

    if (!session) {
        // Redirect to login page or show a login prompt
        signIn(); // Redirects to the login page
        return null; // Return null to handle the absence of session
    }

    const accessToken = session.accessToken;

    return axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

const API_URL = "https://api.spotify.com/v1/";

export const createDataProvider = async () => {
    const axiosInstance = await createAuthAxiosInstance();
    if (!axiosInstance) return null; // Handle the absence of axiosInstance
    return dataProviderSimpleRest(API_URL, axiosInstance);
};
