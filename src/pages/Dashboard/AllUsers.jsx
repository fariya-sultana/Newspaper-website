import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserRole from '../../hooks/useUserRole';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { role, roleLoading } = useUserRole();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users'],
        enabled: role === 'admin' && !roleLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        },
    });

    if (roleLoading || isLoading) return <Loading />;

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

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
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
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{idx + 1}</td>
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
                                        <span className="font-semibold text-green-600">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
        </div>
    );
};

export default AllUsers;
