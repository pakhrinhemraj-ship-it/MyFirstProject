import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Team() {
  const [members, setMembers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setMembers(storedMembers);
  }, []);

  return (
    <>
    <div className="pt-[60px] h-screen w-screen overflow-hidden">
       <div className="flex h-full">
        <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[18%] p-4 h-full bg-gray-50">
          {/* Sidebar */}
        </div>

   <div className="w-full md:w-[82%] px-4 overflow-y-auto">
    <div className="p-6 mt-[129px]">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        {currentUser?.role === "admin" && (
        <Link to="/addteammember" ><button className="h-[3rem] w-[10rem] text-[#6E54B5] px-4 py-2 border border-[#6E54B5] rounded-[10px]">
            Invite Admin
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {members.length === 0 ? (
          <p>No team members yet.</p>
        ) : (
          members.map((member, idx) => (
            <div key={idx} className="border p-4 h-[281.26px] w-[254.98px] shadow">
              <div className="flex justify-center">
              <img src={member.image} alt="API image" className=" rounded-full h-[107.05px] w-[107.05px] m-2"/>
             </div>
              <div className="text-center mt-2">
              <h3 className="font-bold text-[16px]">{member.firstname} {member.lastname}</h3>
              <p className="font-semibold text-[14px]">{member.position}</p>
              <p className="font-medium text-[14px]">{member.email}</p>
              <p className="font-semibold text-[14px]">{member.phone}</p>
              <p className="font-semibold text-[14px]">{member.gender}</p>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}
