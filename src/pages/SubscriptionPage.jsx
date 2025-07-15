import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const SubscriptionPage = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [duration, setDuration] = useState(1);

    const prices = {
        1: 1.99,
        5: 7.99,
        10: 12.99,
        30: 19.99,
    };

    const handleSubscribe = async () => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { price: prices[duration] });
            navigate('/payment', { state: { clientSecret: data.clientSecret, duration } });
        } catch (err) {
            console.error(err);
            toast.error('Failed to start payment session.');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Helmet>
                <title> NewsPress | Subscription Page </title>
            </Helmet>
            {/* Hero Banner */}
            <div className="text-center py-20 px-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white dark:text-white shadow-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlock Premium Access</h1>
                <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-4">
                    Enjoy unlimited premium content, expert insights, and AI-curated articles.
                </p>
            </div>

            {/* Subscription Card */}
            <div className="max-w-xl mx-auto -mt-20 p-8 bg-white dark:bg-white/10 dark:backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl text-center transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>

                <div className="relative mb-6">
                    <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full appearance-none bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium py-3 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value={1}>1 Minute – $1.99</option>
                        <option value={5}>5 Days – $7.99</option>
                        <option value={10}>10 Days – $12.99</option>
                        <option value={30}>30 Days – $19.99</option>
                    </select>
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        ▼
                    </div>
                </div>

                <button
                    onClick={handleSubscribe}
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md active:scale-95"
                >
                    Subscribe Now
                </button>
            </div>

            {/* Footer */}
            <p className="text-center mt-16 text-gray-600 dark:text-gray-400 text-sm">
                Secure payments powered by Stripe • Cancel anytime
            </p>
        </div>
    );
};

export default SubscriptionPage;
