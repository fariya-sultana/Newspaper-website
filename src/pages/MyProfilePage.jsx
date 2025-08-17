import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, User, Mail, Phone, MapPin, X, Camera } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { auth } from '../services/firebase';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userProfile, setUserProfile] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(user?.photoURL);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const watchPhoto = watch('photo');

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosSecure.get('/users/profile');
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserProfile();
        }
    }, [user, axiosSecure]);

    // Reset form when modal opens
    useEffect(() => {
        if (isEditModalOpen && userProfile) {
            reset({
                name: userProfile.name || user?.displayName || '',
                phoneNumber: userProfile.phoneNumber || '',
                address: userProfile.address || '',
                photo: null,
            });
            setPreviewPhoto(userProfile.photoURL || user?.photoURL);
        }
    }, [isEditModalOpen, userProfile, user, reset]);

    // Handle photo preview
    useEffect(() => {
        if (watchPhoto && watchPhoto[0]) {
            const file = watchPhoto[0];
            const url = URL.createObjectURL(file);
            setPreviewPhoto(url);
        }
    }, [watchPhoto]);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_PROFILE_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await res.json();
        return data?.data?.url;
    };

    const onSubmit = async (formData) => {
        try {
            let photoURL = userProfile?.photoURL || user?.photoURL;

            if (formData.photo?.[0]) {
                photoURL = await handleImageUpload(formData.photo[0]);
            }

            const updatedProfile = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                photoURL,
            };

            // Update in database
            await axiosSecure.put('/users/update', updatedProfile);

            // Update Firebase Auth profile
            await updateUserProfile({
                displayName: updatedProfile.name,
                photoURL: updatedProfile.photoURL,
            });

            await auth.currentUser.reload();

            // Update local state
            setUserProfile({ ...userProfile, ...updatedProfile });
            setIsEditModalOpen(false);

            Swal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Profile update error:', error);
            Swal.fire('Error', 'Profile update failed.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Helmet>
                <title>NewsPress | My Profile</title>
            </Helmet>

            {/* Profile Header */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute inset-0  bg-opacity-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img
                            src={userProfile?.photoURL || user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                            <User className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {userProfile?.name || user?.displayName || 'User'}
                        </h1>
                        <p className="text-indigo-100 text-lg mb-4">Welcome back!</p>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-50 backdrop-blur-sm px-6 py-3 rounded-full font-medium transition duration-300 text-blue-600"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Personal Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {userProfile?.name || user?.displayName || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {userProfile?.phoneNumber || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {userProfile?.address || 'Not provided'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            {/* Profile Photo */}
                            <div className="flex flex-col items-center">
                                <div className="relative group">
                                    <img
                                        src={previewPhoto || 'https://via.placeholder.com/150'}
                                        alt="Profile Preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
                                        >
                                            <Camera className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('photo')}
                                    className="hidden"
                                    ref={(e) => {
                                        register('photo').ref(e);
                                        fileInputRef.current = e;
                                    }}
                                />
                                <p className="text-sm text-gray-500 mt-2">Click to change profile photo</p>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phoneNumber')}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Email (readonly) */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <textarea
                                    {...register('address')}
                                    rows={3}
                                    placeholder="Enter your full address"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Modal Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfilePage;