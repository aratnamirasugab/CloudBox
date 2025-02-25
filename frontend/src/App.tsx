import './App.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import useAuthStore from "./store/auth";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route path='/login' element={user ? <Navigate to="/dashboard" /> : <Login /> } />
      <Route path='/register' element={user ? <Navigate to="/dashboard" /> : <Register/> } />
      {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
      <Route path='/dashboard' element={<Dashboard />}  />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
