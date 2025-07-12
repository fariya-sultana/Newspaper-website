import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const imageHostKey = import.meta.env.VITE_IMAGE_PROFILE_KEY;
const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const AddPublishers = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const imageFile = data.publisherLogo[0];

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const imgbbRes = await fetch(imageUploadUrl, {
                method: 'POST',
                body: formData
            });

            const imgResult = await imgbbRes.json();
            if (!imgResult.success) throw new Error('Image upload failed');

            const logoUrl = imgResult.data.url;

            const publisherData = {
                name: data.publisherName,
                logo: logoUrl
            };

            await axiosSecure.post('/admin/publishers', publisherData);
            toast.success('Publisher added!');
            reset();
        } catch (err) {
            console.error(err);
            toast.error('Failed to add publisher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
                Add New Publisher
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Publisher Name
                    </label>
                    <input
                        type="text"
                        {...register('publisherName', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="e.g., The Guardian"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Publisher Logo
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('publisherLogo', { required: true })}
                        className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-1 file:px-2 file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Add Publisher'}
                </button>
            </form>
        </div>
    );
};

export default AddPublishers;
