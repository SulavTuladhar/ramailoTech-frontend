import React from 'react'
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function NavComponent({ role }) {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const logout = () => {
        cookies.remove('token');
        cookies.remove('user');
        navigate('/');
    }
    return (
        <nav className='flex items-center justify-between py-4'>
            <h1>Blogs</h1>
            <div className='flex gap-4'>
                <Link to="/">Home</Link>
                <Link to="/category">Category</Link>
                <Link to="/category">Tags</Link>
            </div>
            {
                role === 'user'
                    ? <div className='flex gap-4'>
                        <Link to="/blog/create" className='p-2 px-4 bg-[#5e548e] text-white'>Create Blogs</Link>
                        <Link to="/user" className='p-2 px-4 border border-[#5e548e] text-[#5e548e]'>Profile</Link>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                    : role === 'admin'
                        ? <div className='flex gap-4'>
                            <Link to="/category" className='p-2 px-4 border border-[#5e548e] text-[#5e548e]'>Category</Link>
                            <Link to="/user" className='p-2 px-4 border border-[#5e548e] text-[#5e548e]'>Profile</Link>
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                        : <div className='flex gap-4'>
                            <Link to="/login" className='p-2 px-4 border border-[#5e548e] text-[#5e548e]'>Login</Link>
                            <Link to="/resgister" className='p-2 px-4 border border-[#5e548e] text-[#5e548e]'>Register</Link>
                        </div>
            }
        </nav>
    )
}

export default NavComponent;
