import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogCardComponent({ blog }) {
    const navigate = useNavigate();
    return (
        <div className='flex w-fit h-fit gap-4 items-center'>
            {
                blog.image.length
                    ? <img src={`${process.env.REACT_APP_IMG_URL}/blogs/${blog.image}`} alt='blog-img' className='h-[10rem] w-[16rem]' />
                    : <img src='/img.jpg' alt='blog-img' className='h-[10rem] w-[16rem]' />
            }
            <div>
                <p className='text-[0.7rem] text-[#555]'>{blog.authorName} - {moment(blog.creationDate).format('DD MMM YYYY')}</p>
                <h4 className='font-semibold'>{blog.title} <span className='bg-[#5e548e] text-white px-1'>{blog.category}</span></h4>
                <div className='flex gap-4 mt-4'>
                    <div className='border border-[#5e548e] text-[#5e548e] px-1'>
                        <p>Design</p>
                    </div>
                    <div className='border border-[#5e548e] text-[#5e548e] px-1'>
                        <p>Research</p>
                    </div>
                </div>
                <button className='mt-4 border border-[#5e548e] bg-[#5e548e] text-[#fff] py-2 px-4 hover:bg-white hover:text-[#5e548e] duration-300' onClick={() => navigate(`/blog/${blog.id}`)}>
                    View More
                </button>
            </div>
        </div>
    )
}

export default BlogCardComponent
