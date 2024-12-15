import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api/stores',
});

// Interceptor to add authorization header
api.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API methods for store-related operations
export const storeApi = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Fetch all orders for the store
  getStoreOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  getStoreAggregators: async () => {
    try {
      const response = await api.get('/aggregators');
      return response.data.aggregators;
    } catch (error) {
      console.error('Error fetching aggregators:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  

};