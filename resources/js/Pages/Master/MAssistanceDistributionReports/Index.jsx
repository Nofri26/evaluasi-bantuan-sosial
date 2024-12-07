import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Table from '@/Pages/Master/MAssistanceDistributionReports/Components/Table';
import ModalForm from '@/Pages/Master/MAssistanceDistributionReports/Components/Modal/Form';
import { useTableData } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useTableData';
import { useModal } from '@/Pages/Master/MAssistanceDistributionReports/Hooks/useModal';

const Index = () => {
    const { programs, regions, user } = usePage().props;
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [perPageOptions] = useState([10, 25, 50, 100]);
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
        setSelectedProgram(program);
        refreshData({ program: program ? program.id : null, region: selectedRegion ? selectedRegion.id : null });
    };

    const handleRegionFilter = (region) => {
        setSelectedRegion(region);
        refreshData({ program: selectedProgram ? selectedProgram.id : null, region: region ? region.id : null });
    };

    const Dropdown = ({ options, value, onChange, placeholder }) => (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {value ? value.name : placeholder}
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    {options.map((option) => (
                        <Menu.Item key={option.id}>
                            {({ active }) => (
                                <button
                                    onClick={() => onChange(option)}
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                                >
                                    {option.name}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Menu>
    );

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
                                        value={selectedProgram}
                                        onChange={handleProgramFilter}
                                        placeholder="Filter Program"
                                    />

                                    <Dropdown
                                        options={Array.isArray(regions) ? regions : []}
                                        value={selectedRegion}
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
