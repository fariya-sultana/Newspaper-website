import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { FcGoogle } from 'react-icons/fc';

const LogIn = () => {
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxios();

    const from = location.state?.from || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const result = await signIn(email, password);
            const user = result.user;
            const res = await axios.post('/jwt', { email: user.email });
            localStorage.setItem('access-token', res.data.token);
            toast.success('Login successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    const handleGoogle = async () => {
        try {
            const result = await signInWithGoogle();
            const res = await axios.post('/jwt', { email: result.user.email });
            localStorage.setItem('access-token', res.data.token);
            toast.success('Signed in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error)
            toast.error('Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Newspaper</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", { required: true })}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                    </div>

                    <p className='mt-1'><small>New to this website? <Link state={{ from }} className='border-b' to={'/register'}>Register</Link></small></p>

                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-200 w-full">Login</button>
                </form>

                <div className="divider text-center my-2">or</div>

                <button
                    onClick={handleGoogle}
                    className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded flex items-center justify-center gap-2 transition duration-200"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LogIn;
