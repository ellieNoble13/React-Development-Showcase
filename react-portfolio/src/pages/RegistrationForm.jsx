import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
    // Builds form components
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange' // Triggers validation on every keystroke/change
    });

    // Syncs with local storage
    const watchAllFields = watch();

    // Sets up auto focus and cashing
    useEffect(() => {
        const savedDraft = localStorage.getItem('registration_draft');
        if (savedDraft) {
            const parsedDraft = JSON.parse(savedDraft);
            // Pre-fill fields asynchronously using setValue
            Object.keys(parsedDraft).forEach((key) => {
                setValue(key, parsedDraft[key]);
            });
        }
    }, [setValue]);

    // Syncs with local storage
    useEffect(() => {
        // Only save if there is data to save
        if (Object.keys(watchAllFields).length > 0) {
            localStorage.setItem('registration_draft', JSON.stringify(watchAllFields));
        }
    }, [watchAllFields]);

    // Form Submission Handler with simulated 2-second API network delay
    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Registration Successful:', data);

        // Submission Reset
        localStorage.removeItem('registration_draft');
        reset({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            terms: false
        });
        alert('Registration complete!');
    };

    // Watch password field to check alignment inside Confirm Password rule
    const passwordValue = watch('password');

    return (
        <div className="lab-card text-left">
            <h2>User Registration</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Full Name */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
                    <input
                        type="text"
                        autoFocus // Requirements: Auto-Focus on Mount
                        {...register('fullName', {
                            required: 'Full name is required',
                            minLength: { value: 3, message: 'Name must be at least 3 characters' }
                        })}
                    />
                    {errors.fullName && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.fullName.message}</p>}
                </div>

                {/* Email Address */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email Address</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            validate: {
                                hasUpper: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
                                hasLower: (v) => /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
                                hasNumber: (v) => /[0-9]/.test(v) || 'Must contain at least one number'
                            }
                        })}
                    />
                    {errors.password && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === passwordValue || 'Passwords do not match'
                        })}
                    />
                    {errors.confirmPassword && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.confirmPassword.message}</p>}
                </div>

                {/* Role/Account Type */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Role/Account Type</label>
                    <select
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}
                        {...register('role', { required: 'Please select a role' })}
                    >
                        <option value="">Select a role...</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="product-manager">Product Manager</option>
                    </select>
                    {errors.role && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.role.message}</p>}
                </div>

                {/* Terms & Conditions */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            style={{ width: 'auto' }}
                            {...register('terms', { required: 'You must accept the terms and conditions' })}
                        />
                        <span style={{ fontSize: '0.85rem' }}>I verify the terms & conditions</span>
                    </label>
                    {errors.terms && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{errors.terms.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', padding: '12px' }}
                >
                    {isSubmitting ? 'Registering...' : 'Submit Registration'}
                </button>

            </form>
        </div>
    );
};

export default RegistrationForm;