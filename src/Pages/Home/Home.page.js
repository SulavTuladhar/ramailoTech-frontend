import React, { useEffect, useState } from 'react'
import HeroSectionComponent from '../../Components/Home/HeroSection.component'
import RecentBlogSectionComponent from '../../Components/Home/RecentBlogSection.component'
import { httpClient } from '../../utils/httpClient';

function HomePage() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            const response = await httpClient.GET(`/blog?page=${page}&pageSize=${pageSize}`);
            setBlogs(response.data.data);
            setTotalItems(response.data.totalItems);
        } catch (error) {
        }
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1));
    };
    return (
        <>
            <HeroSectionComponent />
            <RecentBlogSectionComponent blogs={blogs} prevPage={handlePreviousPage} nextPage={handleNextPage} pagination={true}/>
        </>
    )
}

export default HomePage
