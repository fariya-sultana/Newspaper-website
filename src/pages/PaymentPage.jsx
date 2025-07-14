import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const PaymentPage = () => {
    const {
        state: { clientSecret, duration },
    } = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { refreshPremiumStatus } = useAuth();

    const [processing, setProcessing] = useState(false);

    const prices = {
        1: 1.99,
        5: 7.99,
        10: 12.99,
        30: 19.99,
    };

    const planLabels = {
        1: '1 Minute',
        5: '5 Days',
        10: '10 Days',
        30: '30 Days',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        const cardEl = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardEl },
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            try {
                await axiosSecure.patch('/users/subscribe', { duration });
                await refreshPremiumStatus();

                toast.success('🎉 Subscription activated! Enjoy premium content.');
                navigate('/');
            } catch (err) {
                toast.error('Subscription activated, but something went wrong.');
                console.error(err);
            }
        }

        setProcessing(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 px-6 py-12 transition-colors duration-500">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col gap-6 border border-indigo-200 dark:border-purple-700">
                <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-purple-400 text-center drop-shadow-lg">
                 Complete Your Payment
                </h2>

                <div className="text-center text-gray-600 dark:text-gray-300 s flex gap-3 items-center justify-center">
                    <p className="text-lg font-medium">
                        Plan: <span className="text-indigo-700 dark:text-purple-400">{planLabels[duration]}</span>
                    </p>
                    <p className="text-xl font-extrabold text-indigo-900 dark:text-purple-200">
                        ${prices[duration].toFixed(2)}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="p-3 bg-indigo-50 dark:bg-gray-700 rounded-xl shadow-inner border border-indigo-300 dark:border-purple-600 transition-colors duration-300">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '18px',
                                        color: '#4c51bf',
                                        '::placeholder': { color: '#a0aec0' },
                                        fontWeight: '500',
                                    },
                                    invalid: {
                                        color: '#f56565',
                                    },
                                },
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className={`py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-transform duration-200 shadow-lg ${processing ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                    >
                        {processing ? 'Processing…' : `Pay $${prices[duration]} Now`}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 select-none">
                    🔒 Your payment is secure and encrypted with Stripe.
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
