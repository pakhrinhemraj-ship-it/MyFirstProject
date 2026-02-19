import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setMembers(storedMembers);
  }, []);

  return (
   <div className="pt-[82px] h-screen w-screen overflow-hidden">
       <div className="flex h-full">
        <div className="sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[180px] 
            max-w-[350px] p-4 h-full bg-white shadow ">
          {/* Sidebar */}
        </div>

      {/* Main Content */}
     
        {/* Team List */}
       <div className="w-full md:w-[82%] px-4 overflow-y-auto">
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
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-start z-30 overflow-auto"
            onClick={() => setSelectedMember(null)}
          >
            <div className="pl-[837px]">
            <div className="h-[953px] bg-[#fff] w-[532px] border mt-[99px] border-[#0000001A]
              rounded shadow-lg p-6 relative z-50"
              onClick={(e) => e.stopPropagation()}>
              
              {/* Profile Header */}
              <div className="flex gap-8 p-2 pl-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedMember.image || "/default-profile.png"}
                  alt="Profile"
                  className="rounded-full h-[100px] w-[100px]"
                />
                <div>
                  <h2 className="text-[22px] font-bold text-[#202224]">
                    {selectedMember.firstname} {selectedMember.lastname}
                  </h2>
                  <p className="text-[16px] font-semibold text-[#6E54B5]">• Free Plan</p>
                </div>
              </div>

              {(currentUser?.role === "admin" || currentUser?.email === selectedMember.email) && (
                <Link to={`/edit/${selectedMember.email}`}>
                  <div className="mt-6">
                  <button className="bg-[#EAE2FF] text-[#6E54B5] px-4 py-2 rounded-lg text-sm hover:bg-purple-100 mb-4">
                    Edit Profile
                  </button>
                  </div>
                </Link>
              )}
            </div>
              <div className="border-t border-gray-300 my-4"></div>

              {/* Profile Details */}
              <div className="space-y-2 text-[14px] text-[#202224]">
                <p>
                  <strong className="font-bold">Email:</strong> {selectedMember.email}
                </p>
                <p>
                  <strong className="font-bold">Phone Number:</strong> {selectedMember.phone || "-"}
                </p>
                <p>
                  <strong className="font-bold">Position:</strong> {selectedMember.position}
                </p>
                <p>
                  <strong className="font-bold">Gender:</strong> {selectedMember.gender || "-"}
                </p>
                <p>
                  <strong className="font-bold">Status:</strong> {selectedMember.status || "Active"}
                </p>
                <p>
                  <strong className="font-bold">Courses:</strong> {selectedMember.courses || "-"}
                </p>
                <p>
                  <strong className="font-bold">Added On:</strong> {selectedMember.addedOn || "-"}
                </p>
              </div>
            </div>
            </div>
          </div>
        )}
     </div>
    </div>
    </div>
  );
}
