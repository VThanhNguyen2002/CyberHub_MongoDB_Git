import { Routes, Route } from 'react-router-dom';
import React from 'react';
import FetchDataPage from './pages/FetchDataPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/fetch-data" element={<FetchDataPage />} />
      </Routes>
    </div>
  );
}

export default App;
