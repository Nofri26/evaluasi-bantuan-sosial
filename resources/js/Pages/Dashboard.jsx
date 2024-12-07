'use client';

import { Head } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

export default function Dashboard({ total_reports, recipients_per_program, distribution_per_region }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Monitoring" />
            <div className="p-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Total Laporan</h2>
                        <p className="text-sm text-gray-500 mb-4">Jumlah laporan yang telah disubmit</p>
                        <p className="text-4xl font-bold">{total_reports}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Jumlah Penerima Bantuan</h2>
                        <p className="text-sm text-gray-500 mb-4">Berdasarkan program</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Program</th>
                                        <th className="text-right font-semibold">Jumlah Penerima</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipients_per_program.map((program) => (
                                        <tr key={program.program_id}>
                                            <td className="py-2">{program.program.name}</td>
                                            <td className="text-right py-2">{program.total_recipients.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-3">
                        <h2 className="text-xl font-semibold mb-2">Grafik Penyaluran per Wilayah</h2>
                        <p className="text-sm text-gray-500 mb-4">Jumlah penerima bantuan berdasarkan wilayah</p>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={distribution_per_region}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="region.name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="total_recipients" fill="#3B82F6" name="Jumlah Penerima" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
