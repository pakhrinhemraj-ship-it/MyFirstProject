import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TailwindDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Our Team");

  const options = ["Team", "", ""];

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between">
        {selected}
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div >
          {options.map((option, index) => (
            <Link to={`/${option}`} key={index}>
            <button
              key={index}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 "
            >
           {option}
            </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
