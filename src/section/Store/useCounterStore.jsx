import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,

  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
