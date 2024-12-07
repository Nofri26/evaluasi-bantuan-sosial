import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Table from '@/Pages/Master/MAssistanceDistributionReports/Components/Table';
import ModalForm from '@/Pages/Master/MAssistanceDistributionReports/Components/Modal/Form';
import { useTableData } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useTableData';
import { useModal } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useModal';
import Dropdown from '@/Pages/Master/MAssistanceDistributionReports/Components/Dropdown.jsx';

const Index = () => {
    const { programs, regions, user } = usePage().props;

    const [filters, setFilters] = useState({ program: null, region: null });

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
        handleExport,
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

    const handleProgramFilter = (program) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            program: program,
        }));
        refreshData({ program: program ? program.id : null, region: filters.region ? filters.region.id : null });
    };

    const handleRegionFilter = (region) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            region: region,
        }));
        refreshData({ program: filters.program ? filters.program.id : null, region: region ? region.id : null });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Laporan Penyaluran Bantuan</h2>}>
            <Head title="Laporan Penyaluran Bantuan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-wrap items-center justify-between mb-4 space-y-2 sm:space-y-0">
                                <div className="flex flex-wrap items-center space-x-2">
                                    <PrimaryButton className="flex gap-2 px-4 py-2" onClick={() => openModal()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Buat Laporan
                                    </PrimaryButton>
                                    <PrimaryButton className="px-4 py-2" onClick={handleExport}>
                                        Export
                                    </PrimaryButton>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Dropdown
                                        options={Array.isArray(programs) ? programs : []}
                                        value={filters.program}
                                        onChange={handleProgramFilter}
                                        placeholder="Filter Program"
                                    />

                                    <Dropdown
                                        options={Array.isArray(regions) ? regions : []}
                                        value={filters.region}
                                        onChange={handleRegionFilter}
                                        placeholder="Filter Region"
                                    />
                                    <TextInput
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        className="px-4 py-1 border border-gray-300 rounded-md"
                                        isFocused={true}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <ModalForm
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
                                handleSearch={handleSearch}
                                onSort={handleSort}
                                handleProgramFilter={handleProgramFilter}
                                handleRegionFilter={handleRegionFilter}
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

export default Index;
