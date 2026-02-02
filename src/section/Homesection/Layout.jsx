import Header from "./Header";
import NavbarAfterLogin from "./NavbarAfterLogin";
import NavbarBeforeLogin from "./NavbarBeforeLogin";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      
    </>
  );
}

