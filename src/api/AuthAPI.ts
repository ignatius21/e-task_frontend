import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { UserRegistrationForm } from '../types';

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = '/auth/create-account';
    const {data} = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
}
