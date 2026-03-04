import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarBeforeLogin() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#77777726] backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">

        <div className="flex justify-between items-center h-[60px]">

          {/* Logo */}
          <img
            src="src/assets/logo.png"
            alt="logo"
            className="h-[45px] w-auto"
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12">
            <ul className="flex gap-6 lg:gap-8 text-[15px] lg:text-[16px] font-medium">
              <Link to="/"><li className="hover:text-[#7D66BD]">Home</li></Link>
              <Link to="/features"><li className="hover:text-[#7D66BD]">Features</li></Link>
              <Link to="/pricing"><li className="hover:text-[#7D66BD]">Pricing</li></Link>
              <Link to="/contact"><li className="hover:text-[#7D66BD]">Contact</li></Link>
            </ul>

            <Link to="/loginaccount">
              <button className="bg-[#7D66BD] text-white px-5 py-2 rounded-lg hover:bg-[#6a54a8] transition">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 p-4 text-[15px] font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-[#7D66BD]">Home</li>
            </Link>
            <Link to="/features" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-[#7D66BD]">Features</li>
            </Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-[#7D66BD]">Pricing</li>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <li className="hover:text-[#7D66BD]">Contact</li>
            </Link>

            <Link to="/loginaccount" onClick={() => setMenuOpen(false)}>
              <button className="bg-[#7D66BD] text-white py-2 rounded-lg hover:bg-[#6a54a8] transition">
                Login
              </button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}