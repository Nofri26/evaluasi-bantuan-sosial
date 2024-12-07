import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import Table from '@/Pages/Master/MAssistanceDistributionReports/Components/Table';
import ModalReject from '@/Pages/Master/MAssistanceDistributionReports/Components/Modal/Reject.jsx';
import { useTableData } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useTableData';
import { useModal } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useModal';

const Verification = () => {
    const { programs, regions, user } = usePage().props;
    const {
        data,
        loading,
        totalRecords,
        currentPage,
        perPage,
        searchQuery,
        orderColumn,
        orderDirection,
        handleSearch,
        handleSort,
        handlePageChange,
        refreshData,
    } = useTableData('/api/assistance-distribution-reports');

    const { isOpen: isModalOpen, modalData, openModal, closeModal } = useModal();

    const handleSaveReport = (data) => {
        console.log('Saving report:', data);
        refreshData();
        closeModal();
    };

    const handleEditReport = (reportData) => {
        openModal(reportData);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Validasi Laporan Penyaluran Bantuan</h2>}>
            <Head title="Validasi Laporan Penyaluran Bantuan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-end mb-4">
                                <TextInput
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    className="px-4 py-1 border border-gray-800 rounded-md"
                                    isFocused={true}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <ModalReject
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                onSave={handleSaveReport}
                                programs={programs}
                                regions={regions}
                                formData={modalData}
                            />
                            <Table
                                user={user}
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
                                onDeleteSuccess={refreshData}
                                onEdit={handleEditReport}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Verification;
