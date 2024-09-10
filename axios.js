import { getConfig } from './config.js';

const { API_KEY } = getConfig();

export const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
});

api.defaults.headers.common['X-API-KEY'] = API_KEY;