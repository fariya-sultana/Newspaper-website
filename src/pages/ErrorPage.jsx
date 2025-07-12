import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-700 text-gray-900 dark:text-white flex flex-col justify-center items-center px-4 text-center">
      <div className="text-[10rem] font-extrabold tracking-wider animate-pulse text-blue-700 dark:text-blue-400">
        404
      </div>

      <div className="text-3xl md:text-4xl font-semibold mb-4">
        Page Not Found
      </div>

      <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-8 text-lg">
        The page you’re looking for doesn’t exist or might have been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-full font-semibold text-white shadow-lg"
      >
        Go to Homepage
      </Link>

      <div className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        Error Code: #404-NEWSPAPER
      </div>
    </div>
  );
};

export default ErrorPage;
