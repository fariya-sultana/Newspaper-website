import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CheckCircle, XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineReason, setDeclineReason] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: articlesData = {}, refetch } = useQuery({
        queryKey: ['admin-articles', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/articles?page=${page}&limit=5`);
            return res.data;
        }
    });

    const articles = articlesData?.articles || [];
    const totalPages = Math.ceil((articlesData?.total || 0) / 5);

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/admin/articles/${id}/approve`);
            toast.success("Article approved!");
            refetch();
        } catch (err) {
            console.error(err)
            toast.error("Failed to approve article");
        }
    };

    const handleOpenDecline = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleDeclineSubmit = async () => {
        try {
            await axiosSecure.patch(`/admin/articles/${selectedArticle._id}/decline`, { reason: declineReason });
            toast.warning("Article declined");
            setIsModalOpen(false);
            setDeclineReason('');
            refetch();
        } catch (err) {
            console.error(err)
            toast.error("Failed to decline article");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/admin/articles/${id}`);
            toast.success("Article deleted");
            refetch();
        } catch (err) {
            console.error(err)
            toast.error("Failed to delete article");
        }
    };

    const handleMakePremium = async (id) => {
        try {
            const article = articles.find(a => a._id === id);
            const newStatus = !article.isPremium;

            await axiosSecure.patch(`/admin/articles/${id}/make-premium`, {
                isPremium: newStatus,
            });

            toast.info(`Article marked as ${newStatus ? 'Premium' : 'Not Premium'}`);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update premium status");
        }
    };


    return (
        <div className="p-4 md:p-6 dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
            <Helmet>
                <title> NewsPress | Dashboard | All Articles</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center">All Articles</h2>

            <div className="w-full overflow-x-auto rounded-xl shadow ring-1 ring-gray-300 dark:ring-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-3 py-3">#</th>
                            <th className="px-3 py-3">Photo</th>
                            <th className="px-3 py-3">Name</th>
                            <th className="px-3 py-3">Email</th>
                            <th className="px-3 py-3">Title</th>
                            <th className="px-3 py-3">Publisher</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="px-3 py-3">Date</th>
                            <th className="px-3 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {articles.map((article, index) => (
                            <tr key={article._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <td className="px-3 py-4 text-gray-500 dark:text-gray-400">{(page - 1) * 5 + index + 1}</td>
                                <td className="px-3 py-4">
                                    <img
                                        src={article.author?.photo}
                                        alt="Author"
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                </td>
                                <td className="px-3 py-4">{article.author?.name}</td>
                                <td className="px-3 py-4 text-blue-600 dark:text-blue-400">{article.author?.email}</td>
                                <td className="px-3 py-4 break-words text-gray-900 dark:text-white font-medium">
                                    {article.title}
                                </td>
                                <td className="px-3 py-4">{article.publisher}</td>
                                <td className="px-3 py-4 capitalize text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${article.status === 'approved'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400'
                                            : article.status === 'declined'
                                                ? 'bg-red-100 text-red-600 dark:bg-red-700/20 dark:text-red-400'
                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-300'
                                            }`}
                                    >
                                        {article.status}
                                    </span>
                                    {article.isPremium && (
                                        <div className="mt-2">
                                            <span className="px-2 py-0.5 text-xs bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300 rounded-full inline-block">
                                                Premium
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-3 py-4 text-gray-500 dark:text-gray-400">
                                    {new Date(article.postedAt).toLocaleDateString()}
                                </td>
                                <td className="px-3 py-4 text-center">
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 justify-center items-center">
                                        {article.status !== 'approved' && (
                                            <button
                                                onClick={() => handleApprove(article._id)}
                                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs w-full md:w-auto"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {article.status !== 'declined' && (
                                            <button
                                                onClick={() => handleOpenDecline(article)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs w-full md:w-auto"
                                            >
                                                Decline
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleMakePremium(article._id)}
                                            className={`px-3 py-1 ${article.isPremium ? 'bg-gray-500 hover:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded text-xs w-full md:w-auto`}
                                        >
                                            <span className="flex items-center gap-1 text-sm font-medium">
                                                {article.isPremium ? (
                                                    <>
                                                        <XCircle className="text-white w-4 h-4" />
                                                        Premium
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="text-white w-4 h-4" />
                                                        Premium
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs w-full md:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-1 py-0 rounded-md text-sm font-medium border ${page === i + 1
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Decline Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-blue-100 dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-lg">
                        <Dialog.Title className="text-xl font-bold mb-4 dark:text-white">Decline Article</Dialog.Title>
                        <textarea
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 rounded-md mb-4 text-gray-900 dark:text-white"
                            placeholder="Reason for decline"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleDeclineSubmit} className="px-3 py-1 rounded-md bg-blue-600 text-white">
                                Submit
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="px-3 py-1 rounded-md bg-red-400 text-white">
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default AllArticles;
