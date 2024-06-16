import axios from 'axios';

const API_URL = 'http://localhost:3001/api/items/full';
const STOCK_API_URL = 'http://localhost:3001/api/stocks/by-item-numbers';

export const fetchItems = async (page = 1, pageSize = 20, filter = 'IBF88025') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: page,
        pageSize: pageSize,
        filter: filter
      }
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const fetchStockByItemNumbers = async (itemNumbers) => {
  try {
    const response = await axios.get(STOCK_API_URL, {
      params: {
        itemNumbers: itemNumbers.join(',')
      }
    });
    console.log('Stock API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
