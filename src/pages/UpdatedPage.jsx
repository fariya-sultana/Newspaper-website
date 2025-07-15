import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';

const UpdatedPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axios = useAxios();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors }
    } = useForm();

    const tagOptions = [
        { value: 'politics', label: 'Politics' },
        { value: 'tech', label: 'Tech' },
        { value: 'business', label: 'Business' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'ai', label: 'AI' },
        { value: 'health', label: 'Health' },
        { value: 'Global warming', label: 'Global warming' },
        { value: 'environment', label: 'Environment' },
        { value: 'climate', label: 'Climate' }
    ];

    const isDarkMode = document.documentElement.classList.contains('dark');

    // Fetch article
    const { data: article, isLoading: loadingArticle } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        },
        enabled: !!id
    });

    // Fetch publishers
    const { data: publishers = [], isLoading: loadingPublishers } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axios.get('/api/publishers');
            return res.data;
        }
    });

    useEffect(() => {
        if (article) {
            setValue('title', article.title);
            setValue('description', article.description);
            setValue('publisher', article.publisher);
            setValue('tags', article.tags.map((tag) => ({ label: tag, value: tag })));
        }
    }, [article, setValue]);

    const handleImageUpload = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_PROFILE_KEY}`,
            formData
        );
        return res.data.data.url;
    };

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            return await axiosSecure.put(`/articles/${id}`, updatedData);
        },
        onSuccess: () => {
            Swal.fire('Success', 'Article updated successfully!', 'success');
            navigate('/my-articles');
        },
        onError: (err) => {
            const msg = err.response?.data?.message || 'Update failed';
            Swal.fire('Error', msg, 'error');
        }
    });

    const onSubmit = async (data) => {
        let imageUrl = article.image;

        if (data.image?.[0]) {
            imageUrl = await handleImageUpload(data.image[0]);
        }

        const updatedData = {
            title: data.title,
            description: data.description,
            image: imageUrl,
            publisher: data.publisher,
            tags: data.tags.map((tag) => tag.value)
        };

        mutation.mutate(updatedData);
    };

    if (loadingArticle || loadingPublishers) return <Loading />;

    return (
        <section className="min-h-screen px-4 py-12 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-3xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-xl rounded-3xl p-10 space-y-8 transition-all">
                <h2 className="text-4xl font-bold text-center drop-shadow-lg">Update Article</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">Title is required</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Replace Image (optional)</label>
                        <input
                            type="file"
                            {...register('image')}
                            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Publisher */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Publisher</label>
                        <select
                            {...register('publisher', { required: true })}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white 
                            focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="">Select publisher</option>
                            {publishers.map((pub) => (
                                <option key={pub._id} value={pub.name}>
                                    {pub.name}
                                </option>
                            ))}
                        </select>
                        {errors.publisher && <p className="text-sm text-red-500 mt-1">Publisher is required</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                        <Controller
                            name="tags"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={tagOptions}
                                    classNamePrefix="react-select"
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                                            color: isDarkMode ? '#ffffff' : '#000000',
                                            borderColor: state.isFocused ? '#6366f1' : isDarkMode ? '#374151' : '#d1d5db',
                                            boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
                                            '&:hover': { borderColor: '#6366f1' }
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                                            zIndex: 100,
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused
                                                ? '#3b82f6'
                                                : isDarkMode ? '#1f2937' : '#ffffff',
                                            color: state.isFocused
                                                ? '#ffffff'
                                                : isDarkMode ? '#ffffff' : '#000000',
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#6366f1',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: '#ffffff',
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: '#ffffff',
                                            ':hover': {
                                                backgroundColor: '#4f46e5',
                                                color: '#ffffff',
                                            },
                                        }),
                                    }}
                                />
                            )}
                        />
                        {errors.tags && <p className="text-sm text-red-500 mt-1">Select at least one tag</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            {...register('description', { required: true })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Write a short article summary..."
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">Description is required</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-xl"
                    >
                        Update Article
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdatedPage;
