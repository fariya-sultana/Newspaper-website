import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';
import useAxios from '../hooks/useAxios';
import Select from 'react-select';
import { Helmet } from 'react-helmet-async';

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

const AllArticle = () => {
    const axios = useAxios();
    const { isPremium } = useAuth();

    const [searchText, setSearchText] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axios.get('/api/publishers');
            return res.data;
        },
    });

    const { data: articles = [], refetch } = useQuery({
        queryKey: ['public-articles', searchText, selectedPublisher, selectedTags],
        queryFn: async () => {
            const tagQuery = selectedTags.join(',');
            const res = await axios.get(
                `/articles?search=${searchText}&publisher=${selectedPublisher}&tags=${tagQuery}`
            );
            return res.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [searchText, selectedPublisher, selectedTags, refetch]);

    return (
        <div className="max-w-11/12 mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
            <Helmet>
                <title> NewsPress | All Articles </title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-8">Explore All Articles</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 items-center justify-center">
                {/* Title Search */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 rounded-md border w-full md:w-1/4
                    bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />

                {/* Publisher Filter */}
                <select
                    onChange={(e) => setSelectedPublisher(e.target.value)}
                    className="px-4 py-2 rounded-md border w-full md:w-1/4
                    bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="">All Publishers</option>
                    {publishers.map(pub => (
                        <option key={pub._id} value={pub.name}>{pub.name}</option>
                    ))}
                </select>

                {/* Tags Filter */}
                <div className="w-full md:w-1/4">
                    <Select
                        isMulti
                        options={tagOptions}
                        value={tagOptions.filter(tag => selectedTags.includes(tag.value))}
                        onChange={(selected) => setSelectedTags(selected.map(t => t.value))}
                        classNamePrefix="react-select"
                        placeholder="Filter by tags..."
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                backgroundColor: 'var(--tw-bg-opacity, 1)',
                                background: 'var(--tw-bg-opacity, 1)',
                                color: 'inherit',
                                borderColor: 'rgb(55 65 81)', // dark:border-gray-700
                                boxShadow: state.isFocused ? '0 0 0 1px rgb(147 197 253)' : 'none',
                            }),
                            menu: base => ({
                                ...base,
                                backgroundColor: '#1f2937', // dark:bg-gray-800
                                color: '#f9fafb', // text-white
                            }),
                            multiValue: base => ({
                                ...base,
                                backgroundColor: '#374151', // default tag bg
                                borderRadius: '4px',
                            }),
                            multiValueLabel: base => ({
                                ...base,
                                color: 'white',
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                color: 'white',
                                ':hover': {
                                    backgroundColor: '#3b82f6', // blue-500
                                    color: '#ffffff',
                                },
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? '#3b82f6' : '#1f2937', // blue-500 on hover
                                color: state.isFocused ? '#ffffff' : '#f9fafb',
                                cursor: 'pointer',
                            }),
                            singleValue: base => ({
                                ...base,
                                color: 'white',
                            }),
                        }}

                    />
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => {
                    const isLocked = article.isPremium && !isPremium;

                    return (
                        <div
                            key={article._id}
                            className={`rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 flex flex-col group
    ${article.isPremium
                                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:shadow-[0_8px_30px_rgba(139,92,246,0.5)] hover:ring-1 hover:ring-purple-400 hover:ring-offset-1 hover:ring-offset-purple-200'
                                    : 'hover:ring-1 hover:ring-offset-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] hover:ring-blue-400 hover:border-blue-500'
                                } hover:scale-[1.01] cursor-pointer`}
                        >

                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold line-clamp-2 min-h-[56px]">
                                    {article.title}
                                </h3>
                                <p className="text-sm opacity-80 mb-1">Publisher: {article.publisher}</p>
                                <p className="line-clamp-3 text-sm flex-grow">{article.description}</p>

                                <Link to={`/articles/${article._id}`} className="mt-auto pt-4">
                                    <button
                                        disabled={isLocked}
                                        className={`w-full text-sm py-2 px-4 rounded-lg font-semibold transition
                                        ${isLocked
                                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                                : article.isPremium
                                                    ? 'bg-white text-purple-800 hover:bg-gray-100'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        {isLocked ? 'Subscribe to Read' : 'View Details'}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {articles.length === 0 && (
                <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
                    No articles found.
                </div>
            )}
        </div>
    );
};

export default AllArticle;
