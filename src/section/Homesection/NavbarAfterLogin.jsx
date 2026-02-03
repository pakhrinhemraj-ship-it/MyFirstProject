import React from 'react'


export default function NavbarAfterLogin() {
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

    </div>
  )
}
