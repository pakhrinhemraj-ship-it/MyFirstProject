import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Sync state with localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Component for user before login
  const BeforeLogin = () => (
    <>
      <div>
        <ul className="flex gap-[60px] font-medium w-full justify-center items-center mt-4 pr-[33rem] text-[16px]">
          <Link to="/"> <li className="cursor-pointer">Home</li> </Link>
          <Link to="/features"> <li className="cursor-pointer">Features</li> </Link>
          <Link to="/pricing"> <li className="cursor-pointer">Pricing</li> </Link>
          <Link to="/contact"> <li className="cursor-pointer">Contact</li> </Link>
        </ul>
      </div>

      <Link to="/loginaccount">
        <button className="text-[16px] text-[#ffffff] bg-[#7D66BD] w-[116px] h-[40px] fixed right-[20px] top-[10px] rounded-[7px]">
          Login
        </button>
      </Link>
    </>
  );

  // Component for user after login
  const AfterLogin = () => (
    <>
      <div>
        <ul className="flex gap-[33px] font-medium w-full mt-6 pr-[28px] text-[16px]">
          <img src="src/assets/p7.png" alt="" className="h-[33.33px] w-[33.33px]" />
          <img src="src/assets/p8.png" alt="" className="h-[33.33px] w-[33.33px]" />
        </ul>
      </div>
    </>
  );

  return (
    <div className="flex justify-between fixed w-full h-[82px] bg-[#FFFFFF] border z-50">
      <img src="src/assets/logo.png" alt="logo" className="h-[50px] max-w-[184.86px] mt-4" />

      {/* Conditional rendering */}
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </div>
  );
}
