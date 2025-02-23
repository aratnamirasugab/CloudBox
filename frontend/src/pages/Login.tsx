import { useState } from "react"
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid login credentials: " + error);
        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    )
}

export default Login;