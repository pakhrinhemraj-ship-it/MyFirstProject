import React from 'react'
import { Link } from "react-router-dom";
import TailwindDropdown from '../Form/box';

export default function Sidebar() {
  return (
    <div>
              <div className="flex justify-between fixed w-full h-[82px] bg-[#FFFFFF] border z-50 ">
                <img src="src/assets/logo.png" alt="logo"
                  className="h-[50px] max-w-[184.86px] mt-4"/>

                  <div>
                    <ul className='flex gap-[33px] font-medium w-full mt-6 pr-[28px] text-[16px]'>
                       <img src="src/assets/p7.png" alt="" className="h-[33.33px] w-[33.33px]"/>
                        <img src="src/assets/p8.png" alt="" className="h-[33.33px] w-[33.33px]"/>
                    </ul>
                    </div>
        
              </div>
              


              <div>
               <ul className='fixed h-[100%] w-[18%] border'>

                <div className='pt-[125px] pl-[40px] ' >
                <li className='flex gap-4'> <img src="src/assets/p4.png" alt="" className='h-[16px] w-[27px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'> <TailwindDropdown/> </span></li>
                </div>
                    
               
               <footer className="h-[120px] w-[100%] mt-[329px] border">
                <div className=" pt-[13%] pl-[40px] space-y-6 ">
                <li className='flex gap-4'> <img src="src/assets/p6.png" alt="" className='h-[18px] w-[18px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'>Settings</span>
                </li>
                <li className='flex gap-4'> <img src="src/assets/p5.png" alt="" className='h-[18px] w-[18px]'/>
               <Link to="/signup1"> <span className='text-[14px] font-semibold cursor-pointer'>Logout</span></Link>
                </li>
                </div>
            </footer>
            </ul>
            </div>
        </div>
        
  )
}
