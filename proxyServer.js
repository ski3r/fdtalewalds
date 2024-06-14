const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/items/full', async (req, res) => {
  try {
    const { page, pageSize, filter } = req.query;
    const API_URL = 'https://sellus.fdt.se/17839/api/items/full/';
    const API_KEY = 's-641-fH1xghgssXA3DyrM';  // Ersätt med din faktiska API-nyckel

    console.log('Proxy server: Sending request to:', API_URL);
    console.log('Query params:', { page, pageSize, filter });
    
    const response = await axios.get(API_URL, {
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

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
