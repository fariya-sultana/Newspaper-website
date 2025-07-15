import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet-async';

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const axios = useAxios();
    const hasPatched = useRef(false); // ✅ correctly scoped here

    const { data: article = {}, isLoading, isError } = useQuery({
        queryKey: ['article-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        },
    });


    useEffect(() => {
        if (!id || hasPatched.current) return;

        hasPatched.current = true; // 
        axios
            .patch(`/articles/${id}/view`)
            .catch(() => toast.error('Failed to update view count'));
    }, [id]); // 

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center">Error loading article</div>;

    const { title, image, publisher, description, longDescription, views } = article;

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 text-gray-800 dark:text-gray-100">
            <Helmet>
                <title> NewsPress | Articles Details </title>
            </Helmet>
            <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight mb-2">
                {title}
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Published by: <span className="font-medium">{publisher}</span>
            </p>

            <img
                src={image}
                alt={title}
                className="w-full max-h-[450px] object-cover rounded-xl shadow-lg mb-6 border dark:border-gray-700"
            />

            <div className="text-lg leading-7 space-y-4">
                <p>{description}</p>
                <p>{longDescription}</p>
            </div>

            <div className="text-sm text-right text-gray-600 dark:text-gray-400 mt-6">
                👁️ {views || 0} views
            </div>
        </div>
    );
};

export default ArticleDetails;
