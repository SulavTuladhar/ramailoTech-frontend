import React, { useEffect, useState } from 'react'
import { httpClient } from '../../utils/httpClient';
import RecentBlogSectionComponent from '../../Components/Home/RecentBlogSection.component';

function PostByCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchBlogs();
    }, [category]);

    async function fetchCategories() {
        try {
            const res = await httpClient.GET(`/blog/category`);
            setCategories(res.data.data)
            setCategory(res.data.data[0].id)
        } catch (err) {
        }
    }

    async function fetchBlogs() {
        try {
            setIsLoading(true)
            const res = await httpClient.GET(`/blog/category/${category}`);
            setBlogs(res.data.data)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
        }
    }
    return (
        <div>
            {
                isLoading
                    ? <p> Loading ...</p>
                    : <>
                        <div className='flex gap-4'>
                            {categories.map((item, index) => (
                                <div className={`${category === item.id ? 'bg-[#5e548e] text-white' : ''} cursor-pointer px-2 border border-[#5e548e] px-1`} key={index} onClick={() => setCategory(item.id)}>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <RecentBlogSectionComponent blogs={blogs} pagination={false} />
                        </div>
                    </>
            }
        </div>
    )
}

export default PostByCategoryPage
