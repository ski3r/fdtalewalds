import axios from 'axios';

const API_URL = 'http://localhost:3001/api/items/full';

export const fetchItems = async (page = 1, pageSize = 20, filter = 'IBF88025') => {
  try {
    console.log('Client: Sending request to proxy:', API_URL);
    const response = await axios.get(API_URL, {
      params: {
        page: page,
        pageSize: pageSize,
        filter: filter
      }
    });
    console.log('Client: Received response from proxy:', response.data);
    return response.data.results;  // Returnerar endast resultaten
  } catch (error) {
    console.error('Client: Error occurred:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};