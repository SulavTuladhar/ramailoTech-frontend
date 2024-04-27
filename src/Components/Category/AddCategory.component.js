import React, { useState } from 'react'

function AddCategoryComponent({ func }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        func(e, name);
        setName("")
    }
    return (
        <div>
            <form className='shadow-xl flex flex-col gap-4 w-[40%] my-8'>
                <h1 className='text-[#5e548e] text-xl font-bold'>Create category</h1>
                <label htmlFor='name'>Category Name</label>
                <input id='name' type="text" onChange={(e) => setName(e.target.value)} placeholder='Eg: Technology' className='border border-b-[#5e548e]' value={name}/>
                <button onClick={(e) => handleSubmit(e)} className='bg-[#5e548e] text-white'>submit</button>
            </form>
        </div>
    )
}

export default AddCategoryComponent
