import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

import Header from "../Homesection/Header";
import useAuthStore from "../Store/useCounterStore";


export default function LoginPage1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to="/team" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      setError("User not found. Please sign up.");
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password. Try again.");
      return;
    }

    // Save login state in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // Update Zustand state
    login(foundUser);

    // Optional: remember me logic (can store in localStorage if needed)
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    // Navigate to team page
    navigate("/team");
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-[#CACACA] px-4">
        <img
          src="src/assets/p2.png"
          alt=""
          className="hidden lg:block h-[220px] w-[230px] absolute right-0 bottom-0"
        />

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mt-10">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Login to Account
          </h2>

          <p className="text-sm text-gray-600 text-center mb-6">
            Please enter your email and password
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm opacity-70 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm opacity-70">Password</span>
                <span className="text-xs opacity-70 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm opacity-70">Remember Password</label>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs text-red-600 mb-3">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full h-[2.5rem] bg-[#6E54B5] text-white rounded-md hover:bg-[#5b45a0]"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            <span className="opacity-70">Don’t have an account?</span>{" "}
            <Link
              to="/createaccount"
              className="text-[#6E54B5] font-bold underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
