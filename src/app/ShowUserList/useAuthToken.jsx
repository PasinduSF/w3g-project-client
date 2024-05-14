import { useState, useEffect } from 'react';

const useAuthToken = () => {
    // State to store the authentication token
    const [token, setToken] = useState('');

    // Effect to run once when the component mounts to fetch the token from local storage
    useEffect(() => {
        // Fetch the JWT token from local storage
        const jwtToken = localStorage.getItem('token1');
        if (jwtToken) {
            setToken(jwtToken);
        }
    }, []);

    // Function to save the token to local storage
    const saveToken = (token) => {
        // Save the JWT token to local storage
        localStorage.setItem('token1', token);
        // Update the token state
        setToken(token);
    };

    // Function to remove the token from local storage
    const removeToken = () => {
        // Remove the JWT token from local storage
        localStorage.removeItem('token1');
        // Clear the token state
        setToken('');
    };

    // Return the token state and functions to save and remove the token
    return { token, saveToken, removeToken };
};

export default useAuthToken;
