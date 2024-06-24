import axios from 'axios';

const API_URL = 'http://localhost:7777/api'; // Ensure this matches your backend URL

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/getproduct`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
