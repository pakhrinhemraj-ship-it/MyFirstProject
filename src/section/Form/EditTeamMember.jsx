import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import OnlyTeamMemberEdit from "./OnlyTeamMemberEdit";

export default function EditTeamMember() {
  const navigate = useNavigate();
  const { email } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    role: "user",
    image: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Permission check
  useEffect(() => {
    if (!currentUser || !email) {
      toast.error("Access denied!");
      navigate("/team");
      return;
    }

    const adminCheck = currentUser.role === "admin";
    const ownProfileCheck = currentUser.email === email;

    setIsAdmin(adminCheck);
    setIsOwnProfile(ownProfileCheck);

    if (!adminCheck && !ownProfileCheck) {
      toast.error("You do not have permission to view this profile!");
      navigate("/team");
    } else {
      setIsAuthorized(true);
    }
  }, [currentUser, email, navigate]);

  // Load team member data
  useEffect(() => {
    if (!isAuthorized) return;
    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
    const member = members.find((m) => m.email === email);
    if (!member) {
      toast.error("Team member not found!");
      navigate("/team");
    } else {
      setForm(member);
    }
  }, [email, isAuthorized, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  for (let key in form) {
  const value = form[key];
  if (typeof value === "string" && value.trim() === "") {
    toast.warning(`Please fill the ${key} field`);
    return;
  }
}

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(form.phone)) {
      toast.warning("Phone number must be 10 digits");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      toast.warning("Please enter a valid email address");
      return;
    }

    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
    const index = members.findIndex((m) => m.email === email);
    if (index === -1) {
      toast.warning("Team member not found!");
      return;
    }

    // Check for duplicate email if changed
    if (
      email !== members[index].email &&
      members.some((m) => m.email === form.email)
    ) {
      toast.warning("This email already exists in team members!");
      return;
    }

    members[index] = form;
    localStorage.setItem("teamMembers", JSON.stringify(members));

    toast.success("Team Member Updated Successfully");
    navigate(`/team/profile/${form.email}`);
  };

  // Main Render
  if (!isAuthorized) return null; // wait for permission check

  return (
    <>
      {/* Conditional Render */}
      {isAdmin ? (
        // Admin sees full edit form
        <div className="pt-[82px] min-h-screen w-full bg-[#FFFFFF]">
          <div className="flex h-full">

            <div className="lg:w-[240px] xl:w-[240px] 2xl:w-[240px]  p-4 h-full bg-white">
            </div>
            
            <div className="lg:w-[82%] px-4 px-8 overflow-y-auto">
              <button
               onClick={() => navigate(`/team/profile/${email}`)}
                className="text-gray-600 text-3xl md:text-4xl font-bold hover:text-blue-600 transition mt-4 md:mt-6"
              >
                ←
              </button>
              <h2 className="font-semibold text-xl md:text-2xl mt-4 md:mt-6 mb-6">
                Edit Team Member
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="flex flex-col items-center">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="profile"
                      className="h-32 w-32 md:h-36 md:w-36 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="src/assets/p15.png"
                      alt=""
                      className="h-32 w-32 md:h-36 md:w-36 object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="upload-photo"
                  />
                  <label
                    htmlFor="upload-photo"
                    className="mt-2 text-sm md:text-base text-[#6E54B5] font-semibold cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>

                {/* Firstname & Lastname */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label>Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      value={form.firstname}
                      onChange={handleChange}
                      placeholder="Firstname"
                      className="w-full border rounded-xl h-12 px-4"
                    />
                  </div>
                  <div className="flex-1">
                    <label>Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      value={form.lastname}
                      onChange={handleChange}
                      placeholder="Lastname"
                      className="w-full border rounded-xl h-12 px-4"
                    />
                  </div>
                </div>

               

                {/* Position & Gender */}
                <div className="flex flex-col sm:flex-row gap-4">
                   <div className="flex-1">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9800000001"
                      className="w-full border rounded-xl h-12 px-4"
                    />
                  </div>
                  <div className="flex-1">
                    <label>Position</label>
                    <select
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      className="w-full border rounded-xl h-12 px-4"
                    >
                      <option value="">-- Select Position --</option>
                    <optgroup label="Top Management / Executive">
                        <option>Chief Executive Officer (CEO)</option>
                        <option>Chief Operating Officer (COO)</option>
                        <option>Chief Financial Officer (CFO)</option>
                        <option>Chief Technology Officer (CTO)</option>
                        <option>Chief Marketing Officer (CMO)</option>
                        <option>President</option>
                        <option>Vice President (VP)</option>
                      </optgroup>

                      {/* Middle Management */}
                      <optgroup label="Middle Management">
                        <option>General Manager (GM)</option>
                        <option>Operations Manager</option>
                        <option>Project Manager</option>
                        <option>HR Manager</option>
                        <option>Sales Manager</option>
                        <option>IT Manager</option>
                        <option>Team Lead</option>
                        <option>Team Supervisor</option>
                      </optgroup>

                      {/* Administrative */}
                      <optgroup label="Administrative & Support Staff">
                        <option>Executive Assistant</option>
                        <option>Personal Assistant</option>
                        <option>Office Administrator</option>
                        <option>Receptionist</option>
                        <option>Secretary</option>
                        <option>Data Entry Operator</option>
                        <option>Office Clerk</option>
                      </optgroup>

                      {/* Finance */}
                      <optgroup label="Finance / Accounting">
                        <option>Accountant</option>
                        <option>Finance Officer</option>
                        <option>Accounts Payable Officer</option>
                        <option>Accounts Receivable Officer</option>
                        <option>Payroll Specialist</option>
                        <option>Financial Analyst</option>
                      </optgroup>

                      {/* HR */}
                      <optgroup label="Human Resources (HR)">
                        <option>HR Manager</option>
                        <option>HR Executive</option>
                        <option>HR Officer</option>
                        <option>Recruitment Officer</option>
                        <option>Training & Development Officer</option>
                        <option>Employee Relations Specialist</option>
                      </optgroup>

                      {/* Sales */}
                      <optgroup label="Sales & Marketing">
                        <option>Sales Manager</option>
                        <option>Marketing Manager</option>
                        <option>Sales Executive</option>
                        <option>Marketing Executive</option>
                        <option>Business Development Manager</option>
                        <option>Social Media Manager</option>
                      </optgroup>

                      {/* IT */}
                      <optgroup label="IT / Technical">
                        <option>IT Manager</option>
                        <option>Network Administrator</option>
                        <option>System Administrator</option>
                        <option>Software Developer</option>
                        <option>Software Engineer</option>
                        <option>Technical Support</option>
                        <option>Helpdesk</option>
                        <option>Web Designer</option>
                        <option>Web Developer</option>
                      </optgroup>

                      {/* Operations */}
                      <optgroup label="Operations / Logistics">
                        <option>Operations Executive</option>
                        <option>Logistics Manager</option>
                        <option>Procurement Officer</option>
                        <option>Buyer</option>
                        <option>Inventory Manager</option>
                      </optgroup>

                      {/* Creative */}
                      <optgroup label="Creative / Design">
                        <option>Graphic Designer</option>
                        <option>Content Writer</option>
                        <option>Copywriter</option>
                        <option>Creative Director</option>
                        <option>UX/UI Designer</option>
                      </optgroup>

                      {/* Other */}
                      <optgroup label="Other Common Roles">
                        <option>Customer Service Representative</option>
                        <option>Call Center Executive</option>
                        <option>Legal Officer</option>
                        <option>Legal Advisor</option>
                        <option>Quality Assurance Officer</option>
                        <option>Quality Control Officer</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full border rounded-xl h-12 px-4"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center md:justify-end">
                  <button
                    type="submit"
                    className="bg-[#6E54B5] text-white font-medium rounded-xl h-12 w-44 hover:bg-[#593eb5] transition"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <OnlyTeamMemberEdit />
      )}
    </>
  );
}