import React from "react";
import TailwindDropdown from "../Form/DropDown";
import useAuthStore from "../Store/useCounterStore";

// ✅ Import images correctly
import iconCourses from "../../assets/p9.png";
import iconStudent from "../../assets/p10.png";
import iconInbox from "../../assets/p11.png";
import iconAnalytics from "../../assets/p12.png";
import iconDropdown from "../../assets/p4.png";
import iconSupport from "../../assets/p13.png";
import iconSettings from "../../assets/p6.png";
import iconLogout from "../../assets/p5.png";

export default function Sidebar() {

  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    logout(); // ✅ Proper Zustand logout

    window.location.href = "/loginaccount";
  };

  if (!isLoggedIn) return null;

  return (
    <div>

      {/* Sidebar */}
      <ul className="h-full w-[18%] sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[180px] 
            max-w-[350px] border fixed bg-white">
        <div className="pl-[40px] mt-[125px] space-y-6">

          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
              <img src={iconCourses} alt="Courses"
                className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"/>
              <span className="cursor-pointer font-semibold text-[12px] sm:text-[13px] md:text-[14px]">
                Courses
              </span>
            </li>


          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconStudent} alt="Student" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="cursor-pointer font-semibold text-[14px]">Student</span>
          </li>

          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconInbox} alt="Inbox" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="cursor-pointer font-semibold text-[14px]">Inbox</span>
          </li>

          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconAnalytics} alt="Analytics" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="cursor-pointer font-semibold text-[14px]">Analytics</span>
          </li>

          <li className="flex gap-3 sm:gap-6 md:gap-8">
            <img src={iconDropdown} alt="Dropdown" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="text-[14px] font-semibold cursor-pointer">
              <TailwindDropdown />
            </span>
          </li>

          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconSupport} alt="Support" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="cursor-pointer font-semibold text-[14px]">Support</span>
          </li>

        </div>
      </ul>

      {/* Footer */}
      <footer className="h-[110px] sm:h-[110px] md:h-[130px] 
            lg:h-[150px]   sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[180px] 
            max-w-[350px] w-[18%] bottom-0  border fixed bg-white">
        
        <div className="mt-8 pl-[40px] space-y-6">
          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconSettings} alt="Settings" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span className="text-[14px] font-semibold cursor-pointer">Settings</span>
          </li>

          <li className="flex gap-3 sm:gap-6 md:gap-8 items-center">
            <img src={iconLogout} alt="Logout" 
            className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]" />
            <span
              className="text-[14px] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          </li>

        </div>
      </footer>

    </div>
  );
}
