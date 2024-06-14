import React, { useEffect, useState } from 'react';
import { fetchItems } from './apiService';
import Header from './components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState('IBF88025');

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(page, pageSize, filter);
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
      // Extrahera värdet av extraFieldId: 7 från första raden och gör en ny sökning
      if (data.length > 0 && data[0].extraFields) {
        const extraField7 = data[0].extraFields.find(field => field.extraFieldId === 7);
        if (extraField7) {
          getRelatedItems(extraField7.value);
        }
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getRelatedItems = async (value) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(page, pageSize, value); // Använd värdet från extraFieldId 7 för att göra en ny sökning
      setRelatedItems(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [page, pageSize]);

  return (
    <div className="App">
      <Header />
      <Filter filter={filter} setFilter={setFilter} onSearch={getItems} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <Table items={items} />
          {relatedItems.length > 0 && (
            <div>
              <h2>Related Items</h2>
              <Table items={relatedItems} />
            </div>
          )}
        </>
      )}
      <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;