import axios from 'axios';
import base_url from '../../urls';

const ApiUploadPic = axios.create({
    baseURL: `${base_url}/api/upload`, // Replace with your backend API URL
});

// Add a request interceptor to include the token in each request
ApiUploadPic.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiUploadPic;