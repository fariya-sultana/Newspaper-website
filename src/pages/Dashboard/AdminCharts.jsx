import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Helmet } from 'react-helmet-async';

const AdminCharts = () => {
    const isDark = useDarkMode();
    const textColor = isDark ? "#fff" : "#333";
    const containerBg = isDark ? "#1f2937" : "#fff";
    const chartBg = isDark ? "#1f2937" : "#ffffff"; // Use same as container for consistency
    const axios = useAxiosSecure();
    const [pubData, setPubData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/articles/publication-stats');

                if (!res.data || res.data.length === 0) {
                    console.log("No publication data available");
                    setPubData([['Publication', 'Articles']]);
                    return;
                }

                const chart = [['Publication', 'Articles']];
                res.data.forEach(p => {
                    if (p.publication && typeof p.count === 'number') {
                        chart.push([p.publication, p.count]);
                    }
                });

                setPubData(chart);
            } catch (e) {
                console.error("Pie fetch error:", e?.response?.data || e.message);
                setPubData([['Publication', 'Articles']]);
            }
        })();
    }, [axios]);

    const pieOpts = {
        title: "Articles by Publisher",
        backgroundColor: chartBg,
        pieHole: 0.4,
        titleTextStyle: { color: textColor },
        legend: { textStyle: { color: textColor } },
        pieSliceTextStyle: { color: isDark ? "#fff" : "#000" },
        chartArea: {
            backgroundColor: chartBg,
            left: 20,
            top: 60,
            width: '100%',
            height: '80%'
        }
    };

    const barData = [['Year', 'Sales', 'Expenses'], ['2019', 1000, 400], ['2020', 1170, 460], ['2021', 660, 1120], ['2022', 1030, 540]];
    const barOpts = {
        title: "Sales vs Expenses",
        backgroundColor: chartBg,
        titleTextStyle: { color: textColor },
        legend: { position: 'bottom', textStyle: { color: textColor } },
        hAxis: {
            textStyle: { color: textColor },
            titleTextStyle: { color: textColor },
            gridlines: { color: isDark ? "#4b5563" : "#e5e7eb" }
        },
        vAxis: {
            textStyle: { color: textColor },
            gridlines: { color: isDark ? "#4b5563" : "#e5e7eb" }
        },
        chartArea: {
            backgroundColor: chartBg,
            left: 60,
            top: 60,
            width: '80%',
            height: '70%'
        }
    };

    const lineData = [['Month', 'Visitors'], ['Jan', 300], ['Feb', 600], ['Mar', 800], ['Apr', 700], ['May', 1000]];
    const lineOpts = {
        title: "Monthly Visitors",
        backgroundColor: chartBg,
        titleTextStyle: { color: textColor },
        legend: { position: 'bottom', textStyle: { color: textColor } },
        hAxis: {
            textStyle: { color: textColor },
            gridlines: { color: isDark ? "#4b5563" : "#e5e7eb" }
        },
        vAxis: {
            textStyle: { color: textColor },
            gridlines: { color: isDark ? "#4b5563" : "#e5e7eb" }
        },
        chartArea: {
            backgroundColor: chartBg,
            left: 60,
            top: 60,
            width: '80%',
            height: '70%'
        },
        curveType: 'function',
        lineWidth: 2,
        pointSize: 5
    };

    return (
        <div className="p-6 lg:p-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            <Helmet><title>NewsPress Dashboard – Charts</title></Helmet>

            <div className="chart-container" style={{ backgroundColor: containerBg, borderRadius: 8, padding: '1rem' }}>
                <h3 className="mb-2 font-semibold text-lg text-center text-indigo-600">📊 Publication Distribution</h3>
                {pubData.length > 1 ? (
                    <div style={{ backgroundColor: chartBg, borderRadius: 4 }}>
                        <Chart chartType="PieChart" data={pubData} options={pieOpts} width="100%" height="280px" />
                    </div>
                ) : <p className="text-center text-gray-500">Loading...</p>}
            </div>

            <div className="chart-container" style={{ backgroundColor: containerBg, borderRadius: 8, padding: '1rem' }}>
                <h3 className="mb-2 font-semibold text-lg text-center text-indigo-600">📈 Sales vs Expenses</h3>
                <div style={{ backgroundColor: chartBg, borderRadius: 4 }}>
                    <Chart chartType="BarChart" data={barData} options={barOpts} width="100%" height="280px" />
                </div>
            </div>

            <div className="chart-container md:col-span-2" style={{ backgroundColor: containerBg, borderRadius: 8, padding: '1rem' }}>
                <h3 className="mb-2 font-semibold text-lg text-center text-indigo-600">📈 Monthly Visitors</h3>
                <div style={{ backgroundColor: chartBg, borderRadius: 4 }}>
                    <Chart chartType="LineChart" data={lineData} options={lineOpts} width="100%" height="300px" />
                </div>
            </div>
        </div>
    );
};

export default AdminCharts;