import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Textarea } from '@headlessui/react';
import axios from 'axios';

const ModalForm = ({ isOpen, onClose, onSave, programs, regions, formData = null }) => {
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [selectedKabupaten, setSelectedKabupaten] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [date, setDate] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (formData) {
            // Only set the form data if the formData.id is different
            setSelectedProgram(formData.program_id || '');
            setSelectedProvinsi(formData.region.parent.parent.name || '');
            setSelectedKabupaten(formData.region.parent.name || '');
            setSelectedKecamatan(formData.redion_id || '');
            setDate(formData.date || '');
            setDescription(formData.description || '');
<<<<<<< HEAD
            console.log(formData);
        } else {
            // Reset fields for creating
=======
            console.log('Edit');
        } else if (!formData) {
            // Reset fields for creating new report
>>>>>>> 6160ce7 (show modal edit fail)
            setSelectedProgram('');
            setSelectedProvinsi('');
            setSelectedKabupaten('');
            setSelectedKecamatan('');
            setDate('');
            setDescription('');
            setAttachment(null);
            console.log('Reset');
        }
    }, [formData, selectedProgram]);

    console.log(
        'Program: ' +
            selectedProgram +
            ', Provinsi: ' +
            selectedProvinsi +
            ', Kabupaten: ' +
            selectedKabupaten +
            ', Kecamatan: ' +
            selectedKecamatan +
            ', Tanggal: '
    );
    if (!isOpen) return null;

    const provinsiOptions = regions.provinsi || [];
    const kabupatenOptions = selectedProvinsi ? regions.kabupaten.filter((kabupaten) => kabupaten.parent_id === Number(selectedProvinsi)) : [];
    const kecamatanOptions = selectedKabupaten ? regions.kecamatan.filter((kecamatan) => kecamatan.parent_id === Number(selectedKabupaten)) : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Form data for sending to API
        const formDataToSend = new FormData();
        formDataToSend.append('program_id', selectedProgram);
        formDataToSend.append('region_id', selectedKecamatan);
        formDataToSend.append('date', date);
        if (attachment) formDataToSend.append('attachment', attachment);
        formDataToSend.append('description', description);

        try {
            let response;
            if (formData && formData.id) {
                // If formData is provided, update the record
                response = await axios.put(`/api/assistance-distribution-reports/${formData.id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                // Otherwise, create a new record
                response = await axios.post('/api/assistance-distribution-reports', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            onSave(response.data);
            onClose();
        } catch (err) {
            setError('Failed to save report. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">{formData ? 'Edit Report' : 'Create Report'}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="program" className="block mb-2">
                                Program <span className="text-red-600">*</span>
                            </InputLabel>
                            <select
                                id="program"
                                name="program_id"
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Program</option>
                                {programs.map((program) => (
                                    <option key={program.id} value={program.id}>
                                        {program.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <InputLabel htmlFor="date" className="block mb-2">
                                Tanggal <span className="text-red-600">*</span>
                            </InputLabel>
                            <TextInput
                                id="date"
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <InputLabel htmlFor="provinsi" className="block mb-2">
                                Provinsi <span className="text-red-600">*</span>
                            </InputLabel>
                            <select
                                id="provinsi"
                                value={selectedProvinsi}
                                onChange={(e) => {
                                    setSelectedProvinsi(e.target.value);
                                    setSelectedKabupaten('');
                                    setSelectedKecamatan('');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Provinsi</option>
                                {provinsiOptions.map((provinsi) => (
                                    <option key={provinsi.id} value={provinsi.id}>
                                        {provinsi.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="kabupaten" className="block mb-2">
                                Kabupaten <span className="text-red-600">*</span>
                            </InputLabel>
                            <select
                                id="kabupaten"
                                value={selectedKabupaten}
                                onChange={(e) => {
                                    setSelectedKabupaten(e.target.value);
                                    setSelectedKecamatan('');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!selectedProvinsi}
                            >
                                <option value="">Select Kabupaten</option>
                                {kabupatenOptions.map((kabupaten) => (
                                    <option key={kabupaten.id} value={kabupaten.id}>
                                        {kabupaten.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="kecamatan" className="block mb-2">
                                Kecamatan <span className="text-red-600">*</span>
                            </InputLabel>
                            <select
                                id="kecamatan"
                                name="region_id"
                                value={selectedKecamatan}
                                onChange={(e) => setSelectedKecamatan(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!selectedKabupaten}
                            >
                                <option value="">Select Kecamatan</option>
                                {kecamatanOptions.map((kecamatan) => (
                                    <option key={kecamatan.id} value={kecamatan.id}>
                                        {kecamatan.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="attachment" className="block mb-2">
                            Gambar
                        </InputLabel>
                        <TextInput
                            id="attachment"
                            name="attachment"
                            type="file"
                            onChange={(e) => setAttachment(e.target.files[0])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" className="block mb-2">
                            Deskripsi
                        </InputLabel>
                        <Textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>
                    {/* Error Message */}
                    {error && <div className="text-red-600">{error}</div>}
                    <div className="flex justify-end space-x-4 mt-8">
                        <DangerButton onClick={onClose} className="px-6 py-2">
                            Cancel
                        </DangerButton>
                        <PrimaryButton type="submit" className="px-6 py-2" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
