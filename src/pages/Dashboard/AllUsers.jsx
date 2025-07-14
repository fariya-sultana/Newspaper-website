import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserRole from '../../hooks/useUserRole';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useUserRole();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['all-users', page],
        enabled: role === 'admin' && !roleLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/users?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const users = userData?.users || [];
    const totalPages = Math.ceil((userData?.total || 0) / limit);

    const handleMakeAdmin = async (userId) => {
        try {
            await axiosSecure.put(`/admin/users/${userId}/make-admin`);
            toast.success('User promoted to admin!');
            queryClient.invalidateQueries(['all-users']);
        } catch (error) {
            console.error(error);
            toast.error('Failed to promote user to admin');
        }
    };

    if (roleLoading || isLoading) return <Loading />;

    return (
        <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded">
                <table className="min-w-full border border-gray-300 dark:border-gray-700 text-left">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Profile</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-2 border">{(page - 1) * limit + idx + 1}</td>
                                <td className="px-4 py-2 border">
                                    <img
                                        src={user.photo || '/default-profile.png'}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{user.name || 'No name'}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border capitalize">
                                    {user.role === 'admin' ? (
                                        <span className="font-semibold text-green-600 dark:text-green-400">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Make Admin
                                        </button>
                                    )}
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
        </div>
    );
};

export default AllUsers;
