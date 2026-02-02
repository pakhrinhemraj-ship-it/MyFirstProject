import React from 'react'
import { Link } from "react-router-dom";

export default function NavbarBeforeLogin() {
  return (
    <div>
        <div className="flex justify-between fixed w-full h-[60px] bg-[#77777726] ">
                <img src="src/assets/logo.png" alt="logo"
                  className="h-[50px] max-w-[184.86px] mt-1" />
                  <div>
                    <ul className='flex gap-[60px] font-medium w-full justify-center items-center mt-4 pr-[33rem] text-[16px]'>
                      <Link to="/"> <li className='cursor-pointer'> Home </li></Link>
                      <Link to="/features"> <li className='cursor-pointer'>Features</li></Link>
                      <Link to="/pricing"> <li className='cursor-pointer'>Pricing</li></Link>
                      <Link to="/contact"> <li className='cursor-pointer'>Contact</li></Link>
                    </ul>
                    </div>
        
                  <Link to="/loginaccount"><button className="text-[16px] text-[#ffffff]  bg-[#7D66BD] w-[116px] h-[40px] fixed right-[20px] top-[10px] rounded-[7px]"  >
                   Login
                </button></Link>
              </div>

    </div>
  )
}
