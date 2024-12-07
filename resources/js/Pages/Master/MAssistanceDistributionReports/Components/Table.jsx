import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import DangerButton from '@/Components/DangerButton.jsx';
import axios from 'axios';

function onVerification(report) {}

const Table = ({
    user,
    data,
    loading,
    totalRecords,
    currentPage,
    perPage,
    searchQuery,
    orderColumn,
    orderDirection,
    handleSearch,
    onSort,
    handleProgramFilter,
    handleRegionFilter,
    onPageChange,
    onDeleteSuccess,
    onEdit,
    onReject,
}) => {
    const totalPages = Math.ceil(totalRecords / perPage);
    const handleSort = (column) => {
        const direction = column === orderColumn && orderDirection === 'asc' ? 'desc' : 'asc';
        onSort(column, direction);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`/api/assistance-distribution-reports/${id}`);
                onDeleteSuccess();
            } catch (error) {
                console.error('Error deleting record:', error);
                alert('Failed to delete the record. Please try again.');
            }
        }
    };

    const handleApprove = async (id) => {
        if (confirm('Are you sure you want to approve this record?')) {
            try {
                await axios.put(`/api/assistance-distribution-reports/verification/${id}`);
                onDeleteSuccess();
            } catch (error) {
                console.error('Error validate record:', error);
                alert('Failed to validate the record. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return <div className="text-center py-4">No data available</div>;
    }
    const renderSortIcon = (column) => {
        if (orderColumn === column) {
            return orderDirection === 'asc' ? ' ▲' : ' ▼';
        }
        return null;
    };

    const renderTableHeader = (label, column) => (
        <th onClick={() => handleSort(column)} className="px-3 py-2 cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
            {renderSortIcon(column)}
        </th>
    );

    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            {renderTableHeader('Tanggal', 5)}
                            {renderTableHeader('Nama Program', 0)}
                            {renderTableHeader('Jumlah Penerima', 1)}
                            {renderTableHeader('Kecamatan', 2)}
                            {renderTableHeader('Kabupaten', 3)}
                            {renderTableHeader('Provinsi', 4)}
                            {renderTableHeader('Status', 6)}
                            <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{item.date}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 text-center">{item.program.name}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">{item.recipients_count}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.region.name}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{item.region.parent ? item.region.parent.name : 'N/A'}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {item.region.parent && item.region.parent.parent ? item.region.parent.parent.name : 'N/A'}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-center">
                                    <span
                                        className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-md ${
                                            item.status === 'pending'
                                                ? 'text-yellow-700 font-bold'
                                                : item.status === 'approve'
                                                  ? 'text-green-700 font-bold'
                                                  : 'text-red-700 font-bold'
                                        }`}
                                    >
                                        {item.status === 'pending' ? 'Pending' : item.status === 'approve' ? 'Disetujui' : 'Ditolak'}
                                    </span>
                                </td>

                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        {user.role === 'user' ? (
                                            <>
                                                <PrimaryButton onClick={() => onEdit(item)} className="px-2 py-1 text-xs" disabled={item.status !== 'pending'}>
                                                    Edit
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    onClick={() => handleDelete(item.id)}
                                                    className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700"
                                                    disabled={item.status !== 'pending'}
                                                >
                                                    Delete
                                                </PrimaryButton>
                                            </>
                                        ) : (
                                            <>
                                                <PrimaryButton
                                                    onClick={() => handleApprove(item.id)}
                                                    className="px-2 py-1 text-xs"
                                                    disabled={item.status !== 'pending'}
                                                >
                                                    Setujui
                                                </PrimaryButton>
                                                <DangerButton onClick={() => onEdit(item)} className="px-2 py-1 text-xs" disabled={item.status !== 'pending'}>
                                                    Tolak
                                                </DangerButton>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <PrimaryButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 text-xs">
                        Previous
                    </PrimaryButton>
                    <PrimaryButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 text-xs">
                        Next
                    </PrimaryButton>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{Math.min((currentPage - 1) * perPage + 1, totalRecords)}</span> to{' '}
                            <span className="font-medium">{Math.min(currentPage * perPage, totalRecords)}</span> of{' '}
                            <span className="font-medium">{totalRecords}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px gap-1" aria-label="Pagination">
                            <PrimaryButton
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PrimaryButton>
                            {[...Array(totalPages).keys()]
                                .filter((page) => {
                                    const pageIndex = page + 1;
                                    return pageIndex >= Math.max(1, currentPage - 2) && pageIndex <= Math.min(totalPages, currentPage + 2);
                                })
                                .map((page) => (
                                    <PrimaryButton
                                        key={page + 1}
                                        onClick={() => onPageChange(page + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            currentPage === page + 1 ? 'bg-gray-300' : ''
                                        }`}
                                    >
                                        {page + 1}
                                    </PrimaryButton>
                                ))}
                            <PrimaryButton
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PrimaryButton>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
