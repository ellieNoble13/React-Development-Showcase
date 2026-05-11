import {useImmer} from 'use-immer';

const UserProfileImmer = () => {
    const [userProfile, updateProfile] = useImmer({
        name: "Immer Man",
        email: "ImmerMan@ImmerIsCool.net",
        contactDetails: {
            phone: "1-800-222-2222",
            address: "123 Immer Street, ImmerLand, MA"
        },
        preferences: {
            newsletter: true,
            notifications: true
        }
    });
    const handleUpdateField = (category, field, value) => {
        updateProfile (draft =>{
            if (category) {
                draft[category][field] = value;
            } else {
                draft[field] = value;
            }
        });
    };

    const toggleNewsletter = () => {
        updateProfile (draft =>{
            draft.preferences.newsletter = !draft.preferences.newsletter;
        });
    };

    return (
            <div className="lab-card">
                <h2>User Profile (Nested Immer)</h2>

                <div className="button-grid" style={{ textAlign: 'left', gap: '10px' }}>
                    <label className="subtitle">Basic Info</label>
                    <input
                        placeholder="Name"
                        value={userProfile.name}
                        onChange={(e) => handleUpdateField(null, 'name', e.target.value)}
                    />

                    <label className="subtitle">Contact Details</label>
                    <input
                        placeholder="Phone"
                        value={userProfile.contactDetails.phone}
                        onChange={(e) => handleUpdateField('contactDetails', 'phone', e.target.value)}
                    />
                    <input
                        placeholder="Address"
                        value={userProfile.contactDetails.address}
                        onChange={(e) => handleUpdateField('contactDetails', 'address', e.target.value)}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                        <button
                            onClick={toggleNewsletter}
                            className={userProfile.preferences.newsletter ? "success-btn" : "fail-btn"}
                        >
                            Newsletter: {userProfile.preferences.newsletter ? "Subscribed" : "Unsubscribed"}
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '30px', textAlign: 'left', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <p className="subtitle" style={{ marginBottom: '10px' }}>Current State Snapshot (JSON)</p>
                    <pre style={{ fontSize: '0.75rem', color: '#475569', overflowX: 'auto' }}>
                    {JSON.stringify(userProfile, null, 2)}
                </pre>
                </div>
            </div>
        );
    };

    export default UserProfileImmer;