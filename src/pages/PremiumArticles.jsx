import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; 
import Loading from '../components/Loading';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles = [], isLoading, isError } = useQuery({
        queryKey: ['premium-articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles/premium');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 mt-10">Failed to load premium articles.</div>;

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white px-4 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center tracking-wide"> Exclusive Premium Articles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className="bg-white border border-gray-200 dark:bg-gray-900/60 dark:border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition hover:shadow-purple-500/30"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Publisher: {article.publisher}</p>
                            <p className="text-gray-700 dark:text-gray-300 flex-grow line-clamp-3">{article.description}</p>

                            <div className="mt-4">
                                <Link
                                    to={`/articles/${article._id}`}
                                    className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all"
                                >
                                    Read Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumArticles;
