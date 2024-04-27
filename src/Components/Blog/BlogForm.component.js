import React, { useEffect, useState } from 'react'
import { httpClient } from '../../utils/httpClient';

function BlogFormComponent({ categories, func, blog }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [cat, setCategories] = useState([]);
    const [file, setFile] = useState()
    function handleChange(event) {
        setFile(event.target.files[0])
    }
    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setContent(blog.content)
            setCategory(blog.category)
        }
    }, [blog])

    async function fetchCategories() {
        try {
            const res = await httpClient.GET(`/blog/category`);
            setCategories(res.data.data)
            setCategory(res.data.data[0].id)
        } catch (err) {
        }
    }
    const handleSubmit = (e) => {
        const data = {
            title,
            content,
            category,
            file
        }
        func(e, data)
    }
    const inputClass = `border border-[#5e548e] py-1 px-2`
    return (
        <section>
            <form className='flex flex-col shadow-xl'>
                <label>Title</label>
                <input type='text' id='title' onChange={(e) => setTitle(e.target.value)} className={inputClass} value={title} />
                <label>Content</label>
                <input type='text' id='content' onChange={(e) => setContent(e.target.value)} className={inputClass} value={content} />
                <div className='flex items-center my-2 gap-2'>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className='border border-[#5e548e] py-1'
                    >
                        {
                            cat.map((cat, index) => (
                                <option value={cat.id} key={index}>{cat.name}</option>
                            ))
                        }

                    </select>
                </div>
                <label>Image</label>
                <input type="file" onChange={handleChange} />
                <button className='bg-[#5e548e] mt-4 text-white p-2 px-4' onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>
            </form>
        </section>
    )
}

export default BlogFormComponent
