import { Link } from "react-router";
import forbiddenImg from '../assets/undraw-forbidden.png';

const Forbidden = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md text-center max-w-lg w-full border dark:border-gray-700">
                <img
                    src={forbiddenImg}
                    alt="Access Denied"
                    className="w-64 mx-auto my-6"
                />
                <h1 className="text-6xl font-bold text-red-500">403</h1>
                <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                    Access Forbidden
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    You don’t have permission to access this page or perform this action.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
