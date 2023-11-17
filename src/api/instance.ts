import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;
