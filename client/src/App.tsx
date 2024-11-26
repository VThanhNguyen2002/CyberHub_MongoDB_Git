import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashBoard from './pages/AdminDashBoard';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
