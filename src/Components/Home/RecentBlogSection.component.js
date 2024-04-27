import React from 'react'
import BlogCardComponent from '../Common/BlogCard/BlogCard.component'

function RecentBlogSectionComponent({ blogs, prevPage, nextPage, pagination }) {
    return (
        <section>
            {
                pagination && (
                    <div>
                        <button className='mr-4 bg-[#5e548e] text-white p-2 px-4' onClick={() => prevPage()}>Prev</button>
                        <button className='mr-4 bg-[#5e548e] text-white p-2 px-4' onClick={() => nextPage()} disabled={blogs.length === 0 ? true : false}>Next</button>
                    </div>
                )
            }

            <div className='flex flex-wrap'>

                {
                    blogs.length
                        ? blogs.map((blog, index) => (
                            <div className='w-[50%] mt-4' key={index} >
                                <BlogCardComponent blog={blog} />
                            </div>
                        ))
                        : <p className='mt-4'>No Blogs Found</p>
                }
            </div>
        </section>
    )
}

export default RecentBlogSectionComponent
