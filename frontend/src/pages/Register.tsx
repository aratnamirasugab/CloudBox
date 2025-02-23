import { useState } from "react";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await register(email, password);
            navigate("/login");
        } catch (error) {
            alert("Unable to register " + error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <p>Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    )
}

export default Register;