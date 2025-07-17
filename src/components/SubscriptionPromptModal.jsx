import { useNavigate } from 'react-router';

const SubscriptionPromptModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-900 text-white rounded-xl p-6 max-w-md w-full shadow-lg">
                <h2 className="text-2xl font-bold mb-3">Enjoy Premium Features!</h2>
                <p className="mb-4 text-gray-300">
                    Upgrade to a premium subscription to unlock unlimited articles, insights, and exclusive stories.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
                    >
                        Not Now
                    </button>
                    <button
                        onClick={() => navigate('/subscription')}
                        className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition"
                    >
                        Go Premium
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPromptModal;
