import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";



export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
     
      <Header/>

      <main>{children}</main>

      
    <Sidebar/>
  
    </div>
  );
}
