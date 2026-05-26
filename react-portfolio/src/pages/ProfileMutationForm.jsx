import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ProfileMutationForm = () => {
    const queryClient = useQueryClient();

    // Build React hook form
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isDirty }
    } = useForm();

    // UseQuery to local JSON
    const { data: profileData, isLoading, isError } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/profile');
            if (!res.ok) throw new Error('Network response failure');
            return res.json();
        }
    });

    // Hydratively seed the form once server data resolves
    useEffect(() => {
        if (profileData) {
            reset(profileData);
        }
    }, [profileData, reset]);

    // data mutation
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            // Check for invalid email
            if (updatedData.email === 'conflict@example.com') {
                throw { status: 409, message: 'Email address is already taken.' };
            }

            const res = await fetch('http://localhost:3001/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (!res.ok) throw new Error('Failed to update profile');
            return res.json();
        },
        onSuccess: (savedData) => {
            // Force a cache invalidation on the primary database key
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            // Sync form internal modification history flags with new baseline
            reset(savedData);
            alert('Profile updated successfully!');
        },
        onError: (error) => {
            // Mapping Mock Server Rejections back onto the UI layout
            if (error.status === 409) {
                setError('email', { type: 'server', message: error.message });
            } else {
                alert('An unexpected server error occurred.');
            }
        }
    });

    const onSubmit = (formData) => {
        mutation.mutate(formData);
    };

    if (isLoading) return <div className="lab-card"><h3>Loading Profile Server-State...</h3></div>;
    if (isError) return <div className="lab-card"><h3>Error contacting mock API server.</h3></div>;

    return (
        <div className="lab-card text-left">
            <h2>Server Profile Integration</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Username */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Username</label>
                    <input
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.username.message}</p>}
                </div>

                {/* Email Address */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email Address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                        })}
                    />
                    {errors.email && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email.message}</p>}
                </div>

                {/* Bio */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Bio</label>
                    <textarea
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                        rows="4"
                        {...register('bio')}
                    />
                </div>

                {/* Notifications Checkbox */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            style={{ width: 'auto' }}
                            {...register('notifications')}
                        />
                        <span style={{ fontSize: '0.85rem' }}>Enable email updates</span>
                    </label>
                </div>

                {/* Save Controller Button */}
                <button
                    type="submit"
                    disabled={!isDirty || mutation.isPending}
                    style={{ width: '100%', padding: '12px' }}
                >
                    {mutation.isPending ? 'Saving to Database...' : 'Save Profile Changes'}
                </button>
            </form>
        </div>
    );
};

export default ProfileMutationForm;