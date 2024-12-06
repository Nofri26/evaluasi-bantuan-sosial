import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@/Pages/Master/MAssistanceDistributionReports/Components/Table.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import TextInput from '@/Components/TextInput.jsx';
import ModalForm from '@/Pages/Master/MAssistanceDistributionReports/Components/Modal/Form.jsx';

const Index = () => {
    const { programs, regions } = usePage().props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [draw, setDraw] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [urlPage, setUrlPage] = useState('/api/assistance-distribution-reports');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderColumn, setOrderColumn] = useState(0);
    const [orderDirection, setOrderDirection] = useState('asc');
    const perPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState(null);

    const fetchData = async (url = urlPage, page = currentPage, search = searchQuery, column = orderColumn, direction = orderDirection) => {
        setLoading(true);
        try {
            const response = await axios.get(urlPage, {
                params: {
                    draw: draw,
                    length: perPage,
                    start: (page - 1) * perPage,
                    search: { value: search },
                    order: [
                        {
                            column: column,
                            dir: direction,
                        },
                    ],
                },
            });
            setData(response.data.data.data.data);
            setTotalRecords(response.data.data.recordsTotal);
            setLoading(false);
            setDraw(draw + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery, orderColumn, orderDirection, programs, regions]);

    const handleDeleteSuccess = () => {
        fetchData();
    };

    const handleEditSuccess = () => {
        fetchData(); // Memuat ulang data setelah berhasil mengedit
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSort = (column, direction) => {
        setOrderColumn(column);
        setOrderDirection(direction);
    };

    const handlePageChange = (page) => {
        setUrlPage('/api/assistance-distribution-reports?page=' + page);
        setCurrentPage(page);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSaveReport = (data) => {
        console.log('Saving report:', data);
        setModalData(data);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Laporan Penyaluran Bantuan</h2>}>
            <Head title="Laporan Penyaluran Bantuan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between mb-4">
                                <PrimaryButton className="flex gap-2 px-4" onClick={toggleModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Buat Laporan
                                </PrimaryButton>
                                <TextInput
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    className="px-4 py-1 border border-gray-800 rounded-md"
                                    isFocused={true}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <ModalForm
                                isOpen={isModalOpen}
                                onClose={() => {
                                    setIsModalOpen(false);
                                    setFormData(null); // Reset data setelah modal ditutup
                                }}
                                onSave={(updatedData) => {
                                    handleEditSuccess(); // Refresh data
                                    setIsModalOpen(false); // Tutup modal
                                }}
                                programs={programs}
                                regions={regions}
                                formData={formData} // Parsing data edit ke modal
                            />
                            <Table
                                data={data}
                                loading={loading}
                                totalRecords={totalRecords}
                                currentPage={currentPage}
                                perPage={perPage}
                                searchQuery={searchQuery}
                                orderColumn={orderColumn}
                                orderDirection={orderDirection}
                                onSort={handleSort}
                                onPageChange={handlePageChange}
                                onDeleteSuccess={handleDeleteSuccess}
                                onEdit={(dataToEdit) => {
                                    setModalData(dataToEdit);
                                    setIsModalOpen(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
