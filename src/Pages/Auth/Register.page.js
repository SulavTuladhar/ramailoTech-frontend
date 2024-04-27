import React, { useState } from 'react'
import { notify } from '../../utils/toaster';
import { httpClient } from "../../utils/httpClient";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                notify.showError("Passwords do not match");
            } else {
                setIsSubmitting(true);
                const res = await httpClient.POST(`/auth/register`, {
                    name,
                    email,
                    password,
                    role
                })
                notify.showSuccess("User created successfully");
                navigate('/login')
                setIsSubmitting(false);
            }
        } catch (err) {
            setIsSubmitting(false);
            notify.showError(err.response?.data?.message);

        }

    }
    return (
        <section className='flex items-center justify-center h-[90vh]'>
            <div className=' p-4 w-[40%] shadow-xl'>
                <form className='flex flex-col'>
                    <label>Name</label>
                    <input required type='text' id='name' name='name' className='border border-[#5e548e] py-1' onChange={(e) => setName(e.target.value)} />
                    <label>Email</label>
                    <input required type='email' id='email' name='email' className='border border-[#5e548e] py-1' onChange={(e) => setEmail(e.target.value)} />
                    <div className='flex items-center my-2 gap-2'>
                        <label>Role</label>
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className='border border-[#5e548e] py-1'
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <label>Password</label>
                    <input required type='password' id='password' name='password' className='border border-[#5e548e] py-1' onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password</label>
                    <input required type='password' id='confirm-password' name='confirm-password' className='border border-[#5e548e] py-1' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button
                        className='my-6 border border-[#5e548e] bg-[#5e548e] text-[#fff] py-1'
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registering..." : 'Register'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage;