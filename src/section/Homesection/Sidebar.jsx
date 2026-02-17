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


  
 const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <div>
            <div>
               <ul className=' h-[100%] w-[18%] border fixed'>
                <div className=' pl-[40px] pt-[125px] relative'>

                    <li className='flex gap-8 '> <img src="src/assets/p9.png" alt="" className='h-[25px] w-[27px]'/><span className='cursor-pointer font-semibold text-[14px]'>Courses</span></li><br />
                    <li className='flex gap-8 '> <img src="src/assets/p10.png" alt="" className='h-[20px] w-[27px]'/><span className='cursor-pointer font-semibold text-[14px]'>Student</span></li><br />
                    <li className='flex gap-8 '> <img src="src/assets/p11.png" alt="" className='h-[25px] w-[27px]'/><span className='cursor-pointer font-semibold text-[14px]'>Inbox</span></li><br />
                    <li className='flex gap-8 '> <img src="src/assets/p12.png" alt="" className='h-[22px] w-[27px]'/><span className='cursor-pointer font-semibold text-[14px]'>Analytics</span></li><br />
                <li className='flex gap-8 '> <img src="src/assets/p4.png" alt="" className='h-[16px] w-[27px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'><TailwindDropdown/> </span></li><br />
                 <li className='flex gap-8'> <img src="src/assets/p13.png" alt="" className='h-[22px] w-[27px]'/><span className='cursor-pointer font-semibold text-[14px]'>Support</span></li>
                </div>
                     </ul>


               <footer className="h-[150px] w-[18%] mt-[902px] border fixed">
                <div className=" mt-10 pl-[40px] space-y-6 ">
                <li className='flex gap-4'> <img src="src/assets/p6.png" alt="" className='h-[18px] w-[18px]'/>
                <span className='text-[14px] font-semibold cursor-pointer'>Settings</span>
                </li>
                <li className='flex gap-4'> <img src="src/assets/p5.png" alt="" className='h-[18px] w-[18px]'/>
               <span className='text-[14px] font-semibold cursor-pointer' onClick={handleLogout}>Logout</span>
                </li>
                </div>
            </footer>
           
            </div>
            
        </div>
        
  )
}
