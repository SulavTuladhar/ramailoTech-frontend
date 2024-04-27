import React from 'react'
import { Cookies } from 'react-cookie';

function HeroSectionComponent() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const btnClass = `p-2 px-4 border hover:bg-white text-white font-bold duration-300`
    return (
        <section className='h-[30vh] flex items-center justify-center flex-col gap-2'>
            <h1 className='text-3xl font-bold'>Blog Website Created By <a href='www.sulavtuladhar.com.np' className='text-[#5e548e]'> Sulav Tuladhar </a></h1>
            <p className='text-[#555]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className='flex gap-6'>
                {
                    token
                        ? <>
                            <button className={`${btnClass} bg-[#231942] border-[#231942] hover:text-[#231942]`}>Creat Blog</button>
                            <button className={`${btnClass} bg-[#5e548e]  border-[#5e548e] hover:text-[#5e548e]`}>Profile</button>
                        </>
                        : <>
                            <button className={`${btnClass} bg-[#231942] border-[#231942] hover:text-[#231942]`}>Login</button>
                            <button className={`${btnClass} bg-[#5e548e]  border-[#5e548e] hover:text-[#5e548e]`}>Register</button>
                        </>
                }

            </div>
        </section>
    )
}

export default HeroSectionComponent
