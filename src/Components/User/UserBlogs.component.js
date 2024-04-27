import React, { useState } from 'react'
import BlogCardComponent from '../Common/BlogCard/BlogCard.component'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';

function UserBlogsComponent({ blogs , func}) {
    const navigate = useNavigate();
    async function deleteBlog(id){
        try{
            const confirmation = window.confirm("Are you sure to Delete this Blog ?");
            if(confirmation){
                const res = await httpClient.DELETE(`/blog/${id}`, true);
                func()
                notify(res.data.message);
            }
        }catch(err){
        }
    }
    return (
        <section className='flex flex-wrap'>
            {
                blogs.length
                    ? blogs.map((blog, index) => (
                        <div className='w-[50%] mt-4' key={index}>
                            <div className='flex gap-1'>
                                <p onClick={() => navigate(`/blog/edit/${blog.id}`)} className='border cursor-pointer border-[#5e548e] text-[#5e548e] px-1'>Edit</p>
                                <p className='border border-[#5e548e] text-[#5e548e] px-1' onClick={() => deleteBlog(blog.id)}>Delete</p>
                            </div>
                            <BlogCardComponent blog={blog} />
                        </div>
                    ))
                    : <p className='text-center'>No Blogs Found</p>
            }
        </section>
    )
}

export default UserBlogsComponent
