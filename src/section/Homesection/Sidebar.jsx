import React from 'react'
import TailwindDropdown from '../Form/DropDown';
import useAuthStore from '../Store/useCounterStore';

export default function Sidebar() {
   const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/loginaccount";
    useAuthStore((state) => state.logout)
    
  };
 

  return (
    <div>
            <div>
               <ul className=' h-[100%] w-[18%] border fixed'>
                <div className=' pl-[40px] pt-[125px] relative'>
                <li className='flex gap-4 '> <img src="src/assets/p4.png" alt="" className='h-[16px] w-[27px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'> <TailwindDropdown/> </span></li>
                </div>
                    
               
               <footer className="h-[120px] w-[18%] mt-[329px] border fixed">
                <div className=" pt-[13%] pl-[40px] space-y-6 ">
                <li className='flex gap-4'> <img src="src/assets/p6.png" alt="" className='h-[18px] w-[18px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'>Settings</span>
                </li>
                <li className='flex gap-4'> <img src="src/assets/p5.png" alt="" className='h-[18px] w-[18px]'/>
               <span className='text-[14px] font-semibold cursor-pointer' onClick={handleLogout}>Logout</span>
                </li>
                </div>
            </footer>
            </ul>
            </div>
            
        </div>
        
  )
}
