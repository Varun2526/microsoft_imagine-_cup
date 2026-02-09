import axios from 'axios';
import type { RegisterConsentResponse, VerifyImageResponse, ConsentRecord } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

export const registerConsent = async (
    file: File,
    policy: string,
    notes?: string
): Promise<RegisterConsentResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('policy', policy);
    if (notes) formData.append('notes', notes);

    const response = await api.post<RegisterConsentResponse>(
        '/register-consent',
        formData
        // ❌ DO NOT set Content-Type manually
    );
    return response.data;
};

export const verifyImage = async (file: File): Promise<VerifyImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<VerifyImageResponse>(
        '/verify-image',
        formData
    );
    return response.data;
};

export const getRegistry = async (): Promise<ConsentRecord[]> => {
    const response = await api.get<ConsentRecord[]>('/registry');
    return response.data;
};

export default api;
