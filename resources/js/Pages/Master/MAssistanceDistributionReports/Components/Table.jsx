import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import Dropdown from '@/Components/Dropdown.jsx';
import axios from 'axios';

const Table = ({ data, loading, totalRecords, currentPage, perPage, orderColumn, orderDirection, onSort, onPageChange, onDeleteSuccess, onEdit }) => {
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
                alert('Record deleted successfully.');
            } catch (error) {
                console.error('Error deleting record:', error);
                alert('Failed to delete the record. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort(0)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Program {orderColumn === 0 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort(1)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Kecamatan {orderColumn === 1 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort(2)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Kabupaten {orderColumn === 2 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort(3)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Provinsi {orderColumn === 3 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort(4)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Tanggal {orderColumn === 4 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort(5)} className="px-4 py-2 border cursor-pointer text-md text-gray-600">
                                Status {orderColumn === 5 && (orderDirection === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2 border cursor-pointer text-md text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border text-center text-sm text-gray-600">{item.program.name}</td>
                                    <td className="px-4 py-2 border text-center text-sm text-gray-600">{item.region.name}</td>
                                    <td className="px-4 py-2 border text-center text-sm text-gray-600">
                                        {item.region.parent ? item.region.parent.name : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 border text-center text-sm text-gray-600">
                                        {item.region.parent && item.region.parent.parent ? item.region.parent.parent.name : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 border text-center text-xs text-gray-600">{item.date}</td>
                                    <td className="px-4 py-2 border text-center text-sm text-gray-600">
                                        {item.status === 'pending' ? (
                                            <span className="px-4 py-1 rounded-md bg-gray-600 text-white text-xs">Pending</span>
                                        ) : (
                                            <span className="px-4 py-1 rounded-md bg-gray-400 text-white text-xs">Approved</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center text-xs text-gray-600">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        Action
                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link onClick={() => onEdit(item)} as="button">
                                                    Edit
                                                </Dropdown.Link>
                                                <Dropdown.Link onClick={() => handleDelete(item.id)} as="button">
                                                    Delete
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                        <PrimaryButton onClick={() => onEdit(item)} className="px-2 py-1 text-xs">
                                            Edit
                                        </PrimaryButton>
                                        <PrimaryButton onClick={() => handleDelete(item.id)} className="px-2 py-1 text-xs"></PrimaryButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="font-bold text-xs text-gray-400 whitespace-nowrap">
                    Showing {Math.min((currentPage - 1) * perPage + 1, totalRecords)} to {Math.min(currentPage * perPage, totalRecords)} of {totalRecords}{' '}
                    entries
                </div>
                <div className="flex items-center space-x-2">
                    <PrimaryButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 text-xs">
                        <ChevronLeftIcon className="h-4 w-4" />
                    </PrimaryButton>
                    {[...Array(totalPages).keys()].map((page) => (
                        <PrimaryButton
                            key={page + 1}
                            onClick={() => onPageChange(page + 1)}
                            className={`text-xs px-3 py-1 border rounded-md ${currentPage === page + 1 ? 'bg-gray-400 text-white' : ''}`}
                        >
                            {page + 1}
                        </PrimaryButton>
                    ))}
                    <PrimaryButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 text-xs">
                        <ChevronRightIcon className="h-4 w-4" />
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Table;
