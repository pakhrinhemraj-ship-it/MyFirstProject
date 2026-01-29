import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Homesection/Header";

export default function LoginPage1() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // stop refresh

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // get users array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find user by email
    const foundUser = users.find((user) => user.email === email);

    // check email
    if (!foundUser) {
      setError("User not found. Please sign up.");
      return;
    }

    // check password
    if (foundUser.password !== password) {
      setError("Incorrect password. Try again.");
      return;
    }

    // login success
    localStorage.setItem( "loggedInUser", JSON.stringify(foundUser));

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <div className="flex justify-between mb-1">
                <span className="text-sm opacity-70">
                  Password
                </span>
                <span className="text-xs opacity-70 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              <input
                type={showPassword ? "text" : "password"}
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

            {error && (
              <p className="text-xs text-red-600 mb-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-[2.5rem] bg-[#6E54B5] text-white rounded-md hover:bg-[#5b45a0]"
            >
              Login
            </button>
            
          </form>

          <p className="text-sm text-center mt-6">
            <span className="opacity-70">
              Don’t have an account?
            </span>{" "}
            <Link
              to="/signup2"
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
