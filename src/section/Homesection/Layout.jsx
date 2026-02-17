import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AddTeamMember from "../Form/AddTeamMember";


export default function Layout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Header/>
      { <Sidebar />}
      <main>
        <Outlet />
        
  
      </main>
      
    </>
  );
}

