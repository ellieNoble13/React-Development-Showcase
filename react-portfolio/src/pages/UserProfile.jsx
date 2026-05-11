import {useState} from 'react'

const UserProfile = () => {
const [userProfile, setUserProfile] = useState({
    name: 'Example McGee',
    email: 'example.mcgee@fakeemail.net',
    address: {
        street: '123 Example Street',
        city: 'Anytown',
        country: 'USA'
    }
});

const [tempAddress, setTempAddress] = useState({
    street: '',
    city: '',
    country: ''
});

    const updateAddress = () => {
        setUserProfile({
            ...userProfile,
            address: {
                ...userProfile.address,
                street: tempAddress.street || userProfile.address.street,
                city: tempAddress.city || userProfile.address.city,
                country: tempAddress.country || userProfile.address.country
            }
        });
    };
    return (
        <div className="lab-card">
            <h2>Profile Management</h2>

            <div className="display-box" style={{textAlign: 'left', margin: '20px 0'}}>
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Address:</strong> {userProfile.address.street}, {userProfile.address.city}, {userProfile.address.country}</p>
            </div>

            <div className="button-grid" style={{flexDirection: 'column'}}>
                <input
                    type="text"
                    placeholder="New Street"
                    onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="New City"
                    onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="New Country"
                    onChange={(e) => setTempAddress({...tempAddress, country: e.target.value})}
                />
                <button onClick={updateAddress} className="success-btn">Update Address</button>
            </div>
        </div>
    );
};

export default UserProfile;