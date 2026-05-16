import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Example McGee',
        email: 'example.mcgee@fakeemail.net',
        address: {
            street: '123 Example Street',
            city: 'Anytown',
            country: 'USA'
        }
    });


    const updateUserAddress = (newAddress) => {
        setUser((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                street: newAddress.street || prev.address.street,
                city: newAddress.city || prev.address.city,
                country: newAddress.country || prev.address.country
            }
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUserAddress }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);