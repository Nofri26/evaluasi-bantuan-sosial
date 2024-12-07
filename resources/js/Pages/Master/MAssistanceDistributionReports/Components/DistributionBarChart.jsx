import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DistributionBarChart = ({ data }) => {
    const chartData = data.map((region) => ({
        name: region.region.name,
        total_recipients: region.total_recipients,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_recipients" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DistributionBarChart;
