import React, { useState } from 'react'
import { Link } from "react-router-dom";

export default function NavbarBeforeLogin() {
   const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
        <div className="flex justify-between fixed w-full h-[60px] bg-[#77777726] pl-4">
          
          <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

                <img src="src/assets/logo.png" alt="logo"
                  className="h-[50px] max-w-[184.86px] mt-1" />
                 
        {/* Menu (Desktop) */}
            <div className="hidden md:flex pr-[700px] gap-[60px]">
              <ul className="flex gap-8 font-medium text-[16px] items-center">
                <Link to="/"><li className="cursor-pointer hover:text-[#7D66BD] transition-colors">Home</li></Link>
                <Link to="/features"><li className="cursor-pointer hover:text-[#7D66BD] transition-colors">Features</li></Link>
                <Link to="/pricing"><li className="cursor-pointer hover:text-[#7D66BD] transition-colors">Pricing</li></Link>
                <Link to="/contact"><li className="cursor-pointer hover:text-[#7D66BD] transition-colors">Contact</li></Link>
              </ul>
            </div>
        
            <Link to="/loginaccount"><button className="text-[16px] text-[#ffffff]  bg-[#7D66BD] w-[116px] h-[40px] fixed right-[20px] top-[10px] rounded-[7px]"  >
              Login
          </button></Link>

          <div>
          <ul className='hidden let-[-500px]'>
          <Link to="/"> <li className='cursor-pointer'> Home </li></Link>
                <Link to="/features"> <li className='cursor-pointer'>Features</li></Link>
                <Link to="/pricing"> <li className='cursor-pointer'>Pricing</li></Link>
                <Link to="/contact"> <li className='cursor-pointer'>Contact</li></Link>
              </ul>
              </div>
        </div>

    </div>
  )
}
