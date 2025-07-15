import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { Info, PencilLine, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyArticlesPage = () => {
    const axiosSecure = useAxiosSecure();
    const [modal, setModal] = useState({ open: false, reason: '' });

    const { data: myArticles = [], refetch } = useQuery({
        queryKey: ['my-articles'],
        queryFn: () => axiosSecure.get('/my-articles').then(res => res.data),
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/articles/${id}`);
                toast.success('Article deleted successfully!');
                refetch();
            } catch (error) {
                const status = error?.response?.status;
                if (status === 403) {
                    toast.error('You are not authorized to delete this article.');
                } else {
                    toast.error('Failed to delete.');
                }
            }
        };
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
            <Helmet>
                <title> NewsPress | My Articles Page </title>
            </Helmet>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <span className="inline-flex items-center gap-2">
                    My Articles
                </span>
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Article Title</th>
                            <th className="px-6 py-4 text-left">Article Status</th>
                            <th className="px-6 py-4 text-left">Premium</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myArticles.map((article, idx) => (
                            <tr key={article._id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <td className="px-6 py-4 align-top">{idx + 1}</td>
                                <td className="px-6 py-4 align-top max-w-xs">
                                    <p className="line-clamp-3 leading-snug font-medium">{article.title}</p>
                                </td>
                                <td className="px-6 py-4 align-top text-center lg:text-left">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${article.status === 'approved'
                                        ? 'bg-green-100 text-green-700'
                                        : article.status === 'declined'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {article.status || 'Pending'}
                                    </span>
                                    {article.status === 'declined' && article.declineReason && (
                                        <button
                                            onClick={() => setModal({ open: true, reason: article.declineReason })}
                                            className="ml-2 text-xs text-red-600 hover:underline"
                                        >
                                            Why?
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4 align-top lg:text-left text-center">{article.isPremium ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 align-top">
                                    <div className="flex items-center gap-3">
                                        <Link to={`/articles/${article._id}`} title="Details">
                                            <Info className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                                        </Link>
                                        <Link to={`/update-article/${article._id}`} title="Edit">
                                            <PencilLine className="w-5 h-5 text-green-600 hover:text-green-800" />
                                        </Link>
                                        <button onClick={() => handleDelete(article._id)} title="Delete">
                                            <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {myArticles.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-400 dark:text-gray-500">
                                    No articles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Decline Reason</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{modal.reason}</p>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setModal({ open: false, reason: '' })}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArticlesPage;
