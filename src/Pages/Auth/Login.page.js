import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';

function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [cookies, setCookie] = useCookies(['token', 'user']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nagivate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const res = await httpClient.POST(`/auth/login`, {
                email,
                password
            })
            setCookie('token', res.data.token);
            setCookie('user', res.data.data);
            notify.showSuccess(`Welcome ${res.data.data.name}`)
            setIsSubmitting(false);
            nagivate('/user')
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false);
            notify.showError(err?.response?.data?.message)
        }
    }

    return (
        <section className='flex items-center justify-center h-[90vh]'>
            <div className=' p-4 w-[40%] shadow-xl'>
                <form className='flex flex-col'>
                    <label>Email</label>
                    <input required type='email' id='email' name='email' className='border border-[#5e548e] py-1' onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input required type='password' id='password' name='password' className='border border-[#5e548e] py-1' onChange={(e) => setPassword(e.target.value)} />
                    <button
                        disabled={isSubmitting}
                        className='my-6 border border-[#5e548e] bg-[#5e548e] text-[#fff] py-1'
                        onClick={(e) => handleSubmit(e)}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage
