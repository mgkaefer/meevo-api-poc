import { getToken } from './apiClient.js';

const initApp = async () => {
  try {
    const tokenData = await getToken();
    console.log('Token Data:', tokenData);
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

initApp(); 