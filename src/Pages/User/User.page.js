/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { httpClient } from '../../utils/httpClient';
import UserProfileComponent from '../../Components/User/UserProfile.component';
import UserBlogsComponent from '../../Components/User/UserBlogs.component';

function UserPage() {
    const cookies = new Cookies();
    const cookieUser = cookies.get('user');
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [page, pageSize])

    const fetchBlogs = async () => {
        try {
            const res = await httpClient.GET(`/user/blogs?page=${page}&pageSize=${pageSize}`, true);
            setBlogs(res.data.data);
            setTotalItems(res.data.totalItems);
        } catch (err) {
        }
    }
    const fetchUser = async () => {
        try {
            const response = await httpClient.GET(`/user`, true);
            setUser(response.data.data);
        } catch (error) {
        }
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, Math.ceil(totalItems / pageSize)));
    };
    const content = user !== null
        ? <>
            <UserProfileComponent user={user} />
            <UserBlogsComponent blogs={blogs} func={fetchBlogs}/>
        </>
        : <p>Loading...</p>;

    return (
        <section>
            {content}
        </section>
    )
}

export default UserPage
