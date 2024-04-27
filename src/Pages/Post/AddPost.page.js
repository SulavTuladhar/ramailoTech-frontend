import React, { useEffect, useState } from 'react'
import BlogFormComponent from '../../Components/Blog/BlogForm.component'
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { useNavigate } from 'react-router-dom';

function AddPostPage() {
   
    const navigate = useNavigate()
    
    async function handleSubmit(e, data){
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append('blog', data.file);
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('category', data.category);
            const res = await httpClient.POST(`/blog`, formData, true, true);
            notify.showSuccess('Blog Created successfully')
            navigate(-1)

        }catch(err){
        }
    }
    return (
        <div>
            <BlogFormComponent func={handleSubmit} blog={null}/>
        </div>
    )
}

export default AddPostPage
