import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { httpClient } from '../../utils/httpClient';
import moment from 'moment';
import { Cookies } from 'react-cookie';

function PostDetailsPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const cookies = new Cookies();
    const user = cookies.get('user');
    useEffect(() => {
        fetchBlog();
    }, [])

    async function fetchBlog() {
        try {
            const res = await httpClient.GET(`/blog/${id}`);
            setBlog(res.data.data)
        } catch (err) {
        }
    }

    const content = blog !== null
        ? <div>
            {
                blog.image.length
                    ? <img src={`${process.env.REACT_APP_IMG_URL}/blogs/${blog.image}`} alt='blog-img' />
                    : <img src='/img.jpg' alt='blog-img' />
            }
            <p className='text-[0.9rem] text-[#555]'>{blog.authorName} - {moment(blog.crationDate).format('DD MMM YYYY')}</p>
            <span className='flex items-center gap-2 mt-2'>
                <h1 className='text-2xl text-[#5e548e] font-bold'>{blog.title}</h1> -
                <div className='bg-[#5e548e] text-white px-4 py-2'>
                    <p className=' text-[0.7rem] font-bold'>{blog.category}</p>
                </div>
            </span>
            <div>
                <p className='text-[0.7rem]'>Tags: {blog.tags}</p>
            </div>
            <p className='text-xl'> {blog.content}</p>

            {/*comment*/}
            <div className='mt-8'>
                <p>Comments:</p>
                {
                    blog?.comments.map((comment, index) => (
                        <div key={index} className='border border-[#5e548e] p-4 w-fit mt-4'>
                            {
                                user.id === comment.userId && (
                                    <div className='flex gap-4 text-sm'>
                                        <p className='border border-[#5e548e] text-[#5e548e] px-1'>Edit</p>
                                        <p className='border border-red-500 text-red-500 px-1'>Delete</p>
                                    </div>
                                )
                            }
                            <p className='text-sm '>{comment.userName}</p>
                            <p>{comment.comment}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        : <div>Loading...</div>
    return (
        <section>
            {content}
        </section>
    )
}

export default PostDetailsPage
