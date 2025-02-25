import axios from "axios";
import { create } from "zustand";

export type User = {
    email: string;
    token: string;
}

type AuthState = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

type ResponseLogin = {
    success: boolean;
    statusCode: number;
    message: string;
    data: string
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,

    login: async (email, password) => {
        const response: ResponseLogin = await axios.post('/api/login', { email, password });
        const token = response.data;
        if (!token) {
            throw new Error('Internal Server Error');
        }

        localStorage.setItem("user", JSON.stringify({
            email: null,
            token: token
        }));
    },

    register: async (email, password) => {
        await axios.post('/api/register', {email, password});
    },

    logout() {
        set({ user: null });
        localStorage.removeItem("user");
    },

}))

export default useAuthStore;