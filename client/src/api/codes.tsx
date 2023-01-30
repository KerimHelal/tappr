import axios from 'axios';
import { FormValues } from '../types';

export const fetchCodes = async (page: number) => {
    try {
        const result = await axios.get(`/codes?page=${page}`);
        return result.data
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const generateCodes = async (payload: FormValues) => {
    try {
        const result = await axios.post(`/codes`, payload);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteCodes = async () => {
    try {
        const result = await axios.delete(`/codes`);
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}