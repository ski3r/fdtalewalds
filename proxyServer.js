const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3001;
const API_URL = 'https://sellus.fdt.se/17839/api';
const API_KEY = 's-641-fH1xghgssXA3DyrM';  // Ersätt med din faktiska API-nyckel

app.use(cors());
app.use(express.json());

app.get('/api/items/full', async (req, res) => {
  try {
    const { page, pageSize, filter } = req.query;
    const itemsApiUrl = `${API_URL}/items/full`;

    console.log('Proxy server: Sending request to:', itemsApiUrl);
    console.log('Query params:', { page, pageSize, filter });

    const response = await axios.get(itemsApiUrl, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        page: page,
        pageSize: pageSize,
        filter: filter
      }
    });

    console.log('Proxy server: Received response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy server: Error occurred:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
      res.status(500).send('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      res.status(500).send(error.message);
    }
  }
});

app.get('/api/stocks/by-item-numbers', async (req, res) => {
  try {
    const itemNumbers = req.query.itemNumbers.split(',');
    const stocksApiUrl = `${API_URL}/stocks/by-item-numbers`;

    console.log('Proxy server: Sending request to:', stocksApiUrl);
    console.log('Query params:', { itemNumbers: itemNumbers.join(',') });

    const response = await axios.get(stocksApiUrl, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        itemNumbers: itemNumbers.join(',')
      }
    });

    console.log('Proxy server: Received response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy server: Error occurred:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
      res.status(500).send('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      res.status(500).send(error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
