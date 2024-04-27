import React, { useEffect, useState } from 'react'
import AddCategoryComponent from '../../Components/Category/AddCategory.component'
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/toaster';
import { useNavigate } from 'react-router-dom';

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [])
    async function fetchCategories() {
        try {
            const res = await httpClient.GET(`/blog/category`);
            setCategories(res.data.data)
        } catch (err) {
        }
    }
    async function createcategory(e, name) {
        try {
            e.preventDefault();
            const res = await httpClient.POST(`/blog/category`, { name }, true);
            notify.showSuccess("Category created successfully")
            fetchCategories()
        } catch (err) {
        }
    }
    async function deleteBlog(id) {
        try {
            const confirmation = window.confirm("Are you sure to Delete this Blog ?");
            if (confirmation) {
                const res = await httpClient.DELETE(`/blog/category/${id}`, true);
                fetchCategories()
                notify(res.data.message);
            }
        } catch (err) {
        }
    }
    return (
        <section>
            <AddCategoryComponent func={createcategory} />
            <div className='flex gap-4'>
                {
                    categories?.map((category, index) => (
                        <div key={index} className='border border-[#5e548e] text-white p-2 w-[8rem]'>
                            <div className='flex gap-4'>
                                <p className='bg-red-600 text-sm  p-1' onClick={() => deleteBlog(category.id)}>Delete</p>
                            </div>
                            <p className='bg-[#5e548e] mt-4 text-center py-4'>{category.name}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default CategoryPage
