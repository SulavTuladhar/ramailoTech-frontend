import React, { useEffect, useState } from 'react'
import BlogFormComponent from '../../Components/Blog/BlogForm.component'
import { httpClient } from '../../utils/httpClient';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../../utils/toaster';

function EditPostPage() {
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        fetchBlog()
    }, []);

    async function fetchBlog() {
        try {
            const res = await httpClient.GET(`/blog/${id}`)
            setBlog(res.data.data)
        } catch (err) {
        }
    }

    async function editBlog(e, data) {
        e.preventDefault();
        const res = await httpClient.PUT(`/blog/${id}`, data, true, true);
        notify.showSuccess('Blog updated successfully')
        navigate(-1)
    }

    return (
        <div>
            <BlogFormComponent func={editBlog} blog={blog} />
        </div>
    )
}

export default EditPostPage
