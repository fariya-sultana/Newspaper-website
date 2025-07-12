// src/pages/AddArticle.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';

const AddArticle = () => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();

    // Load publishers
    const { data: publishers = [], isLoading, isError } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axios.get('/api/publishers');
            return res.data;
        }
    });

    if (isLoading) return <Loading></Loading>
    if (isError) return <p>Error loading publishers.</p>;

    const tagOptions = [
        { value: 'politics', label: 'Politics' },
        { value: 'tech', label: 'Tech' },
        { value: 'business', label: 'Business' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'aI', label: 'AI' },
        { value: 'health', label: 'Health' },
        { value: 'Global warming', label: 'Global warming' },
        { value: 'environment', label: 'Environment' },
        { value: 'climate', label: 'Climate' },
    ];

    const handleImageUpload = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_PROFILE_KEY}`,
            formData
        );
        return res.data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            const imageUrl = await handleImageUpload(data.image[0]);

            const article = {
                title: data.title,
                image: imageUrl,
                publisher: data.publisher,
                tags: data.tags.map(tag => tag.value),
                description: data.description
            };

            const res = await axiosSecure.post('/addArticles', article)

            if (res.data.insertedId) {
                Swal.fire('Success', 'Article submitted for review!', 'success');
                reset();
                setValue("tags", []);
            }
        } catch (error) {
            const msg =
                error.response?.data?.message || 'Something went wrong';
            Swal.fire('Error', msg, 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-center mb-6">📝 Add New Article</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-2xl p-6 border"
            >
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        {...register('title', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Article title"
                    />
                    {errors.title && <p className="text-sm text-red-500">Title is required</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.image && <p className="text-sm text-red-500">Image is required</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Publisher</label>
                    <select
                        {...register('publisher', { required: true })}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select publisher</option>
                        {publishers.map(pub => (
                            <option key={pub._id} value={pub.name}>{pub.name}</option>
                        ))}
                    </select>
                    {errors.publisher && <p className="text-sm text-red-500">Required</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Tags</label>
                    <Controller
                        name="tags"
                        defaultValue={[]}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} isMulti options={tagOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        )}
                    />
                    {errors.tags && <p className="text-sm text-red-500">Select tags</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="w-full border px-3 py-2 rounded h-28"
                    />
                    {errors.description && <p className="text-sm text-red-500">Description is required</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Submit Article
                </button>
            </form>
        </div>
    );
};

export default AddArticle;
