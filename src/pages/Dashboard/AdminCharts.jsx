import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useDarkMode } from "../../hooks/useDarkMode"; // adjust path as needed
import { Helmet } from 'react-helmet-async';

const AdminCharts = () => {
    const isDark = useDarkMode();

    const commonTextColor = isDark ? "#ffffff" : "#333333";
    const backgroundColor = isDark ? "#1f2937" : "#ffffff";
    const axiosSecure = useAxiosSecure();
    const [publicationData, setPublicationData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/articles/publication-stats'); // Adjust this endpoint to your actual one
                const grouped = res.data; // Assume: [{ publication: 'A', count: 2 }, { publication: 'B', count: 3 }, ...]

                const chartData = [['Publication', 'Articles']];
                grouped.forEach(pub => {
                    chartData.push([pub.publication, pub.count]);
                });

                setPublicationData(chartData);
            } catch (error) {
                console.error("Error fetching publication stats:", error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const pieOptions = {
        title: "Articles by Publication",
        backgroundColor,
        pieHole: 0.4,
        titleTextStyle: { color: commonTextColor },
        legend: { textStyle: { color: commonTextColor } },
    };

    const barOptions = {
        title: "Articles & Views",
        backgroundColor,
        titleTextStyle: { color: commonTextColor },
        legend: { position: "bottom", textStyle: { color: commonTextColor } },
        hAxis: {
            title: "Views",
            textStyle: { color: commonTextColor },
            titleTextStyle: { color: commonTextColor },
        },
        vAxis: {
            textStyle: { color: commonTextColor },
        },
    };

    const lineOptions = {
        title: "Monthly Subscription Growth",
        backgroundColor,
        titleTextStyle: { color: commonTextColor },
        legend: { position: "bottom", textStyle: { color: commonTextColor } },
        hAxis: {
            title: "Month",
            textStyle: { color: commonTextColor },
            titleTextStyle: { color: commonTextColor },
        },
        vAxis: {
            title: "Subscriptions",
            textStyle: { color: commonTextColor },
            titleTextStyle: { color: commonTextColor },
        },
    };

    const barData = [
        ['Year', 'Sales', 'Expenses'],
        ['2019', 1000, 400],
        ['2020', 1170, 460],
        ['2021', 660, 1120],
        ['2022', 1030, 540],
    ];

    const lineData = [
        ['Month', 'Visitors'],
        ['Jan', 300],
        ['Feb', 600],
        ['Mar', 800],
        ['Apr', 700],
        ['May', 1000],
    ];

    return (
        <div className="space-y-8 p-4">
            {/* Pie Chart - Publication Distribution */}
            <Helmet>
                <title> NewsPress | Dashboard | Charts</title>
            </Helmet>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Publication Distribution</h2>
                {publicationData.length > 1 ? (
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={publicationData}  // <-- fixed here
                        options={pieOptions}
                    />
                ) : (
                    <p>Loading pie chart...</p>
                )}
            </div>

            {/* Bar Chart - Static */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Sales vs Expenses</h2>
                <Chart
                    chartType="BarChart"  // changed to BarChart
                    width="100%"
                    height="300px"
                    data={barData}
                    options={barOptions}
                />
            </div>

            {/* Area Chart - Static */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Monthly Visitors</h2>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="300px"
                    data={lineData}  // fixed to use lineData
                    options={lineOptions}
                />
            </div>
        </div>
    );
};

export default AdminCharts;
