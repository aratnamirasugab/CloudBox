import { useNavigate } from "react-router-dom";
import useAuthStore, { User } from "../store/auth";
import FileManager from "../components/FileManager";

const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    
    const handleLogout = () => {
      logout();
      navigate("/login");
    };

    // const userString: string | null = localStorage.getItem("user");
    // if (!userString) {
    //   handleLogout();
    //   return;
    // }
    // const user: User = JSON.parse(userString);
    
    return (
      <div className="p-5">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
  
        {/* File & Folder Manager */}
        <FileManager token={"someToken"} />
      </div>
    );
}

export default Dashboard;