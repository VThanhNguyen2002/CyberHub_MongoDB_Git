import { Routes, Route } from 'react-router-dom';
import React from 'react';
import FetchDataPage from './components/Product';
import HomePage from './pages/HomePage'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
