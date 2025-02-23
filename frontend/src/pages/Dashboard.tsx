import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";


const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to CloudBox</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    );
}

export default Dashboard;