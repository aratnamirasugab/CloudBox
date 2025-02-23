import axios from "axios";
import { create } from "zustand";

type User = {
    id: string;
    email: string;
    token: string;
}

type AuthState = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,

    login: async (email, password) => {
        const { data } = await axios.post('/api/login', { email, password });
        set({ user: data});
        localStorage.setItem("user", JSON.stringify(data));
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