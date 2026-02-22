import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
 const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setMembers(storedMembers);
  }, []);

  return (
   <div className="pt-[82px] h-screen w-screen overflow-hidden">
       <div className="flex h-full">
        <div className="sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[130px] 
            max-w-[350px] p-4 h-full bg-white shadow ">
          {/* Sidebar */}
        </div>
     
        {/* Team List */}
       <div className="w-full md:w-[82%] px-4 overflow-y-auto">
           <button
          onClick={() => navigate("/")}
          className="absolute pl-6 text-gray-600 text-[2.5rem] font-bold 
                     hover:text-blue-600 transition mt-[70px]" >
          ← 
        </button>
         <div className="p-6 mt-[100px]"> 
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[24px] font-bold">Team</h2>
            {currentUser?.role === "admin" && (
              <Link to="/addteammember">
                <button className="h-[3rem] w-[10rem] text-[#6E54B5] border border-[#6E54B5] rounded-[10px] hover:bg-purple-50">
                  Invite Admin
                </button>
              </Link>
            )}
          </div>

          {members.length === 0 ? (
            <p className="text-gray-500">No team members yet.</p>
          ) : (
              <div className="flex flex-wrap gap-4">
                {members.map((member, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedMember(member)}
                    className="border p-4 h-[281.26px] w-[254.98px] rounded-lg shadow cursor-pointer flex flex-col items-center hover:bg-purple-50 bg-white"
                  >
                    <img
                      src={member.image || "/default-profile.png"}
                      alt="Profile"
                      className="rounded-full h-[80px] w-[80px] mb-2"
                    />
                    <div className="text-center mt-4 space-y-2">
                      <h3 className="font-bold text-[16px] text-[#202224]">
                        {member.firstname} {member.lastname}
                      </h3>
                      <p className="font-semibold text-[14px] text-[#202224]">
                        {member.position}
                      </p>
                      <p className="font-medium text-[14px] text-[#202224]">
                        {member.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

          )}
        </div>

        {/* Modal Overlay: inside main content only */}
        {selectedMember && (
  <div className="fixed inset-0 bg-black/40 flex justify-center  items-start sm:items-center z-50 overflow-y-auto p-4"
    onClick={() => setSelectedMember(null)} >
    <div
      className="max-w-[532px] sm:w-[90%] md:w-[75%] 
        lg:w-[60%] xl:w-[45%] 2xl:w-[35%] bg-white 
        rounded-2xl shadow-2xl p-6 
        relative mt-10 sm:mt-0 h-full max-h-[953px] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}>
      
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        
        <div className="flex items-center gap-4">
          <img
            src={selectedMember.image || "/default-profile.png"}
            alt="Profile"
            className="rounded-full h-20 w-20 sm:h-24 sm:w-24 object-cover"
          />
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#202224]">
              {selectedMember.firstname} {selectedMember.lastname}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#6E54B5]">
              • Free Plan
            </p>
          </div>
        </div>

        {(currentUser?.role === "admin" ||
          currentUser?.email === selectedMember.email) && (
          <Link to={`/edit/${selectedMember.email}`}>
            <button className="bg-[#EAE2FF] text-[#6E54B5] px-4 py-2 rounded-lg text-sm hover:bg-purple-100 transition">
              Edit Profile
            </button>
          </Link>
        )}
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-[#202224]">
        <p>
          <strong>Email:</strong> {selectedMember.email}
        </p>
        <p>
          <strong>Phone:</strong> {selectedMember.phone || "-"}
        </p>
        <p>
          <strong>Position:</strong> {selectedMember.position}
        </p>
        <p>
          <strong>Gender:</strong> {selectedMember.gender || "-"}
        </p>
       
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedMember(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
      >
        ✕
      </button>
    </div>
  </div>
)}
     </div>
    </div>
    </div>
  );
}
