import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const axios = useAxios();
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password } = data;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                'Password must be at least 6 characters, include an uppercase letter, a number, and a special character.'
            );
            return;
        }

        try {
            const result = await createUser(email, password);
            await updateUserProfile({ displayName: name, photoURL: profilePic });

            const user = result.user;

            const res = await axios.post('/jwt', {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            });

            localStorage.setItem('access-token', res.data.token);

            toast.success('Registration successful!');
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message || 'Registration failed.');
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_PROFILE_KEY}`;
            const res = await axios.post(imageUploadUrl, formData);

            setProfilePic(res.data.data.url);
        } catch (error) {
            toast.error('Image upload failed.');
            console.error(error);
        }
    };

    const handleGoogle = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const res = await axios.post('/jwt', {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
            });

            localStorage.setItem('access-token', res.data.token);

            toast.success('Signed in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Google sign-in failed.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <Helmet>
                <title> NewsPress | Register page </title>
            </Helmet>
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 mt-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            {...register('name', { required: true })}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">Name is required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', { required: true })}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">Email is required</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Photo</label>
                        <input
                            type="file"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', { required: true })}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link className="border-b text-blue-600 dark:text-blue-400" to={'/login'}>
                            Login
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-200"
                    >
                        Register
                    </button>
                </form>

                <div className="my-1 text-center text-gray-500 dark:text-gray-400">or</div>

                <button
                    onClick={handleGoogle}
                    className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 font-medium py-2 rounded flex items-center justify-center gap-2 transition duration-200"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
