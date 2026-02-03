import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./section/Homesection/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./section/Homesection/Header";
import Features from "./section/Homesection/Features";
import Pricing from "./section/Homesection/Pricing";
import Contact from "./section/Homesection/Contact";
import Team from "./section/Homesection/Team";
import LoginAccount from "./section/Form/LoginAccount";
import CreateAccount from "./section/Form/CreateAccount";

export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route element={<Layout />}>
          
          
          <Route path="/" element={<Header />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="loginaccount" element={<LoginAccount />} />
          <Route path="createaccount" element={<CreateAccount />} />

          {/* Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="team" element={<Team />} />
          </Route>
        </Route>

        {/* Fallback page */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
