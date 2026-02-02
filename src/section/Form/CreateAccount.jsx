import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import NavbarBeforeLogin from "../Homesection/NavbarBeforeLogin";
import Header from "../Homesection/Header";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    return <Navigate to="/team" replace />;
  }

  const handlerSignup = (e) => {
    e.preventDefault();

  
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

 
    const users = JSON.parse(localStorage.getItem("users")) || [];


    const isUserExist = users.find((user) => user.email === email);

    if (isUserExist) {
      setError("User already exists with this email");
      return;
    }

    
    const newUser = {
      name,
      email,
      password,
    };

   
    users.push(newUser);


    localStorage.setItem("users", JSON.stringify(users));

    
    navigate("/login");
  };

  return (
    <div>
     <Header />

      <section className="min-h-screen flex items-center justify-center bg-[#CACACA] px-4">
        <img
          src="src/assets/p2.png"
          alt=""
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
         
            <div>
              <label className="text-sm text-[#4D4D4D]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

         
            <div>
              <label className="text-sm text-[#4D4D4D]">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>

         
            <div className="relative">
              <label className="text-sm text-[#4D4D4D]">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

           
            <div className="flex items-center gap-2">
              <input type="checkbox" required />
              <label className="text-sm text-[#4D4D4D]">
                I accept terms and conditions
              </label>
            </div>

          
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
              className="text-[#7D66BD] font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
