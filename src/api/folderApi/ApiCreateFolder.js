import axios from 'axios';
import base_url from '../../urls';

const ApiCreateFolder = axios.create({
    baseURL: `${base_url}/api/folder/createfolder`, // Replace with your backend API URL
});

// Add a request interceptor to include the token in each request
ApiCreateFolder.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            config.headers['Authorization'] =`${userId}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default ApiCreateFolder;