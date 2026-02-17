import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTeamMember() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    role: "user",
  });

  // ✅ Redirect non-admins immediately
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      alert("You do not have permission to access this page!");
      navigate("/team"); // <-- redirect to team page
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser || currentUser.role !== "admin") {
      alert("You are not allowed to add a team member.");
      return;
    }

    // Validation
    for (let key in form) {
      if (form[key].trim() === "") {
        alert(`Please fill the ${key} field`);
        return;
      }
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(form.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Only store in teamMembers
    const existingMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    const isExist = existingMembers.find((m) => m.email === form.email);
    if (isExist) {
      alert("This email already exists in team members!");
      return;
    }

    existingMembers.push(form);
    localStorage.setItem("teamMembers", JSON.stringify(existingMembers));

    alert("Team Member Added Successfully ✅");

    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      position: "",
      gender: "",
      role: "user",
    });

    navigate("/team");
  };

  return (
    <div className="pt-[60px] h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[18%] p-4 h-full bg-gray-50">
          {/* Sidebar */}
        </div>
      <div className="w-full md:w-[82%] px-4 overflow-y-auto">
      <h2 className="font-semibold text-[24px] mt-6 pl-4">Add Team Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <div className="flex justify-center items-center mt-[40px]">
            <img
              src="src/assets/p15.png"
              alt=""
              className="h-[137.53px] w-[137.53px]"
            />
          </div>
          <p className="text-[14px] text-center text-[#6E54B5] cursor-pointer font-semibold">Upload Photo</p>
        </div>

            {/* Firstname & Lastname */}
            <div className="flex gap-4 p-[10px] justify-center">
              <div>
                <label>Firstname</label><br />
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Firstname"
                  className="pl-4 border rounded-[15px] h-[50px] w-[460px]"
                />
              </div>

              <div>
                <label>Lastname</label><br />
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Lastname"
                  className="pl-4 border rounded-[15px] h-[50px] w-[460px]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-4 p-[10px] justify-center">
              <div>
                <label>Email</label><br />
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="pl-4 border rounded-[15px] h-[50px] w-[460px]"
                />
              </div>

              <div>
                <label>Phonenumber</label><br />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9800000001"
                  className="pl-4 border rounded-[15px] h-[50px] w-[460px]"
                />
              </div>
            </div>

            {/* Position & Gender */}
            <div className="flex gap-4 p-[10px] justify-center">
              <div>
                <label>Position</label><br />
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-[460px] rounded-[15px] border px-4 py-3"
                >
                  <option value="">-- Select Position --</option>

    {/* Top Management */}
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

              <div>
                <label>Gender</label><br />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-[460px] rounded-[15px] border px-4 py-3"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-[30px] mb-6 flex justify-end pr-10">
              <button
                type="submit"
                className="rounded-[15px] h-[50px] w-[190px] bg-[#6E54B5] font-medium text-white"
              >
                Add Member
              </button>
            </div>
          </form>
      </div>
      </div>
    </div>
  );
}
