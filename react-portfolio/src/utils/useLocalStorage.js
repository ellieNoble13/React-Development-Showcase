import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // Load Inital Data
    const [state, setState] = useState(() => {
        try {
            const savedValue = localStorage.getItem(key);
            // Use data if it already exists
            if (savedValue !== null) {
                return JSON.parse(savedValue);
            }
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
        }

        // Otherwise fall back to inital provided data
        return initialValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, state]);
    
    return [state, setState];
}