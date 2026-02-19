import React from "react";
import logo from "../../assets/logo.png";
import icon1 from "../../assets/p7.png";
import icon2 from "../../assets/p8.png";

export default function NavbarAfterLogin() {
  return (
    <div>
      <div className="flex justify-between fixed w-full h-[82px] bg-[#FFFFFF] border z-50">

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          className="h-[52.5px] max-w-[184.86px] mt-4 pl-[23px]"
        />

        {/* Right Icons */}
        <div>
          <ul className="flex gap-[33px] font-medium w-full mt-6 pr-[28px] text-[16px] items-center">
            
            <img
              src={icon1}
              alt="icon1"
              className="h-[33.33px] w-[33.33px]"
            />

            <img
              src={icon2}
              alt="icon2"
              className="h-[33.33px] w-[33.33px]"
            />

          </ul>
        </div>

      </div>
    </div>
  );
}
