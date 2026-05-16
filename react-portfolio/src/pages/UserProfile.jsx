import { useState } from 'react';
import { useUser } from '../context/UserContext';

const UserProfile = () => {
    // Reads 'user' and 'updateUserAddress' directly from the code above
    const { user, updateUserAddress } = useUser();

    const [tempAddress, setTempAddress] = useState({
        street: '',
        city: '',
        country: ''
    });

    const handleUpdate = () => {
        updateUserAddress(tempAddress);
        setTempAddress({ street: '', city: '', country: '' });
    };

    return (
        <div className="lab-card">
            <h2>Profile Management</h2>

            <div className="display-box" style={{ textAlign: 'left', margin: '20px 0' }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.country}</p>
            </div>

            <div className="button-grid" style={{ flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="New Street"
                    value={tempAddress.street}
                    onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="New City"
                    value={tempAddress.city}
                    onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="New Country"
                    value={tempAddress.country}
                    onChange={(e) => setTempAddress({ ...tempAddress, country: e.target.value })}
                />
                <button onClick={handleUpdate} className="success-btn">Update Address</button>
            </div>
        </div>
    );
};

export default UserProfile;