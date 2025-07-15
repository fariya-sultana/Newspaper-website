import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { auth } from '../services/firebase';
import { Helmet } from 'react-helmet-async';

const MyProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [previewPhoto, setPreviewPhoto] = useState(user?.photoURL);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            photo: null,
        },
    });

    const watchPhoto = watch('photo');

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
            let photoURL = user?.photoURL;
            if (formData.photo?.[0]) {
                photoURL = await handleImageUpload(formData.photo[0]);
            }

            const updatedProfile = {
                name: formData.name,
                photoURL,
            };

            await axiosSecure.put(`/users/update`, updatedProfile);
            await updateUserProfile({
                displayName: updatedProfile.name,
                photoURL: updatedProfile.photoURL,
            });

            await auth.currentUser.reload();
            setPreviewPhoto(auth.currentUser.photoURL); // 🧠 fixes stale preview

            Swal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Profile update error:', error);
            Swal.fire('Error', 'Profile update failed.', 'error');
        }
    };


    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Helmet>
                <title> NewsPress | My Profile Page </title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 space-y-4"
            >
                {/* Profile Photo */}
                <div className="flex flex-col items-center relative">
                    <div className="relative w-40 h-40">
                        <img
                            src={previewPhoto || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                        >
                            <Pencil size={20} className="text-indigo-600 dark:text-white" />
                        </button>
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

                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email (readonly) */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-xl"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default MyProfilePage;
