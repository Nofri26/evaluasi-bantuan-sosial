import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export type ReportStatus = 'pending' | 'approve' | 'reject';

export interface AssistanceDistributionReport {
    id: number;
    program_id: number;
    region_id: number;
    date: Date;
    attachment?: string;
    description?: string;
    status: ReportStatus;
}

export const getAllAssistanceDistributionReports = async (): Promise<AssistanceDistributionReport[]> => {
    const response = await axios.get('/assistance-distribution-reports');

    return response.data.data.map((report: any) => ({
        ...report,
        date: new Date(report.date),
    }));
};

export const getByIdAssistanceDistributionReport = async (id: number): Promise<AssistanceDistributionReport[]> => {
    const response = await axios.get(`/assistance-distribution-reports/${id}`);

    return response.data.data.map((report: any) => ({
        ...report,
        date: new Date(report.date),
    }));
};

export const createAssistanceDistributionReport = async (data: FormData): Promise<AssistanceDistributionReport> => {
    const response = await axios.post('/assistance-distribution-reports', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return {
        ...response.data.data,
        date: new Date(response.data.data.date),
    };
};

export const updateAssistanceDistributionReport = async (
    id: number,
    data: FormData
): Promise<AssistanceDistributionReport> => {
    const response = await axios.put(`/assistance-distribution-reports/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return {
        ...response.data.data,
        date: new Date(response.data.data.date),
    };
};

export const deleteAssistanceDistributionReport = async (id: number): Promise<void> => {
    await axios.delete(`/assistance-distribution-reports/${id}`);
};

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);
