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
 <ul className="fixed top-0 left-0 h-full w-[18%] sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] 
  min-w-[130px] max-w-[350px] border bg-white flex flex-col">

  <div className="mt-[125px] pl-4 sm:pl-6 space-y-6">

    {/* Courses */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconCourses}
        alt="Courses"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[12px] sm:text-[13px] md:text-[14px]">Courses</span>
    </li>

    {/* Student */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconStudent}
        alt="Student"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Student</span>
    </li>

    {/* Inbox */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconInbox}
        alt="Inbox"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Inbox</span>
    </li>

    {/* Analytics */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconAnalytics}
        alt="Analytics"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Analytics</span>
    </li>

    {/* Dropdown */}
    <li className="flex gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconDropdown}
        alt="Dropdown"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <TailwindDropdown />
    </li>

    {/* Support */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconSupport}
        alt="Support"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Support</span>
    </li>

  </div>
</ul>

{/* Footer */}
<footer className="fixed bottom-0 left-0 w-[18%] sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] 
  min-w-[130px] max-w-[350px] border bg-white flex flex-col justify-center">

  <ul className="pl-4 sm:pl-6 space-y-4">

    {/* Settings */}
    <li className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer">
      <img
        src={iconSettings}
        alt="Settings"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Settings</span>
    </li>

    {/* Logout */}
    <li
      className="flex items-center gap-3 sm:gap-6 md:gap-8 cursor-pointer"
      onClick={handleLogout}
    >
      <img
        src={iconLogout}
        alt="Logout"
        className="h-[18px] w-[20px] sm:h-[22px] sm:w-[24px] md:h-[25px] md:w-[27px]"
      />
      <span className="font-semibold text-[14px]">Logout</span>
    </li>

  </ul>
</footer>

    </div>
  );
}
