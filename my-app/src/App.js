import React, { useState } from 'react';
import { fetchItems, fetchStockByItemNumbers } from './apiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [organizedResults, setOrganizedResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState('7310710271212');

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(page, pageSize, filter);
      console.log('Fetched items:', data);
      setItems(Array.isArray(data.results) ? data.results : []);
      setLoading(false);
      if (data.results.length > 0) {
        const itemNumbers = data.results.map(item => item.itemNumber.trim());
        getStockData(itemNumbers);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError(error);
      setLoading(false);
    }
  };

  const getStockData = async (itemNumbers) => {
    setLoading(true);
    setError(null);
    try {
      const stockData = await fetchStockByItemNumbers(itemNumbers);
      console.log('Fetched stock data:', stockData);
      const organized = organizeData(stockData);
      setOrganizedResults(organized);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error.response || error.message || error);
      setError(error);
      setLoading(false);
    }
  };

  const organizeData = (data) => {
    const organized = {};
    data.forEach(item => {
      const branch = item.branchName || 'Unknown Branch';
      const rowKey = item.extraField8 || 'N/A';
      const colKey = item.extraField9 || 'N/A';
      if (!organized[branch]) {
        organized[branch] = {};
      }
      if (!organized[branch][rowKey]) {
        organized[branch][rowKey] = {};
      }
      organized[branch][rowKey][colKey] = item.quantity;
    });
    return organized;
  };

  const handleSearch = () => {
    getItems();
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header filter={filter} setFilter={setFilter} onSearch={handleSearch} />
        <div className="dashboard">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <>
              <Dashboard items={items} organizedResults={organizedResults} />
            </>
          )}
          <div>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
