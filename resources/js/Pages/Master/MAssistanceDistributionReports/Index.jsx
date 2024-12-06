import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const Index = () => {
    const { assistanceDistributionReports } = usePage().props;
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Laporan Penyaluran Bantuan</h2>}>
            <Head title="Laporan Penyaluran Bantuan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Assistance Distribution Reports</h1>
                            <ul>
                                {assistanceDistributionReports.data.map((report) => (
                                    <li key={report.id}>
                                        {report.name} - {report.program.name} - {report.region.name}
                                    </li>
                                ))}
                            </ul>
                            {/* Pagination */}
                            <div>
                                <button
                                    disabled={!assistanceDistributionReports.prev_page_url}
                                    onClick={() => (window.location.href = assistanceDistributionReports.prev_page_url)}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={!assistanceDistributionReports.next_page_url}
                                    onClick={() => (window.location.href = assistanceDistributionReports.next_page_url)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
