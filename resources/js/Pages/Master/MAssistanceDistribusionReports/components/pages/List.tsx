import React, { useEffect, useState } from 'react';
import {
    AssistanceDistributionReport,
    getAllAssistanceDistributionReports,
} from '@/Pages/Master/MAssistanceDistribusionReports/api';
import { Link } from 'react-router-dom';

const List: React.FC = () => {
    const [reports, setReports] = useState<AssistanceDistributionReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getAllAssistanceDistributionReports();
                setReports(data);
            } catch (error) {
                console.error('Error fetching reports', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Assistance Distribution Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Program ID</th>
                        <th>Region ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.program_id}</td>
                            <td>{report.region_id}</td>
                            <td>{new Date(report.date).toLocaleDateString()}</td>
                            <td>{report.status}</td>
                            <td>
                                <Link to={`/assistance-distribution-reports/edit/${report.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
