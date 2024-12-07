import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import { Textarea } from '@headlessui/react';
import axios from 'axios';

const ModalReject = ({ isOpen, onClose, onSave, formData }) => {
    const [returNote, setReturNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState(''); // State untuk validasi

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!returNote.trim()) {
            setValidationError('Keterangan Reject harus diisi.');
            return;
        }
        setValidationError(''); // Reset validasi jika valid

        setLoading(true);

        const formDataToSend = new FormData();
        try {
            let response;
            formDataToSend.append('return_note', returNote);
            formDataToSend.append('_method', 'PUT');
            response = await axios.post(`/api/assistance-distribution-reports/reject/${formData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
            <div className="bg-white p-8 rounded-lg w-full max-w-xl">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">{formData ? 'Reject Report' : 'Create Report'}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="returNote" className="block mb-2">
                            Keterangan Reject
                        </InputLabel>
                        <Textarea
                            id="returNote"
                            name="returNote"
                            value={returNote}
                            onChange={(e) => setReturNote(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                        {/* Validation Error */}
                        {validationError && <div className="text-red-600 mt-2 text-sm">{validationError}</div>}
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

export default ModalReject;
