import React from 'react'

function UserProfileComponent({ user }) {
    return (
        <section className='flex items-center my-10 gap-8'>
            {
                user.image
                    ? <img src={user.image} alt="user-img" />
                    : <img src="/avatar.jpg" alt="user-img" className='h-60 w-60 rounded-full' />
            }
            <div className='flex flex-col gap-4'>
                <span>
                    <p className='text-[#555] text-[0.7rem]'>Name</p>
                    <h1 className='text-xl font-bold text-[#5e548e]'>{user.name}</h1>
                </span>
                <span>
                    <p className='text-[#555] text-[0.7rem]'>Email</p>
                    <h1 className='text-xl font-bold text-[#5e548e]'>{user.email}</h1>
                </span>
                <button className='bg-[#5e548e] text-white px-4 py-2'>
                    Edit Profile
                </button>
            </div>
        </section>
    )
}

export default UserProfileComponent
