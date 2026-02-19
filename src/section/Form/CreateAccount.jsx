import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavbarBeforeLogin from "../Homesection/NavbarBeforeLogin";
import Header from "../Homesection/Header";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    return <Navigate to="/team" replace />;
  }

  const handlerSignup = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const isUserExist = users.find((user) => user.email === email);
    if (isUserExist) {
      setError("User already exists with this email");
      return;
    }

    // Create new user object
    const newUser = {
      name,
      email,
      password,
      role, // save role
    };

    // Save new user to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Optionally, log the user in immediately
    // localStorage.setItem("isLoggedIn", "true");
    // localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    // Navigate to login page
    navigate("/loginaccount");
  };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-[#CACACA] px-4">
        <img
          src="src/assets/p2.png"
          alt="decorative"
          className="hidden lg:block h-[220px] w-[230px] absolute right-0 bottom-0"
        />

        <div className="bg-white relative p-6 sm:p-8 rounded-lg mt-12 w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold">Create an Account</p>
            <p className="text-sm text-[#333] mt-2">
              Create an account to continue
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handlerSignup}>
            {/* Username */}
            <div>
              <label className="text-sm text-[#4D4D4D]">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#4D4D4D]">Email Address</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-[#4D4D4D]">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* Role selection */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-md">
                <option value="">--Select Role--</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input type="checkbox" required />
              <label className="text-sm text-[#4D4D4D]">
                I accept terms and conditions
              </label>
            </div>

            {/* Error message */}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#7d65bc] text-white rounded-md w-full h-[2.5rem] hover:bg-[#6a55a8] transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/loginaccount"
              className="text-[#7D66BD] font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
