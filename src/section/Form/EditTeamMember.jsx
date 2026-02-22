import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTeamMember() {
   const [activeTab, setActiveTab] = useState("edit");
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

 useEffect(() => {
  if (!currentUser || !email) {
    toast.error("Access denied!");
    navigate("/team");
    return;
  }

  const isAdmin = currentUser.role === "admin";
  const isOwnProfile = currentUser.email === email;

  if (!isAdmin && !isOwnProfile) {
    toast.error("You do not have permission to edit this profile!");
    navigate("/team");
  }
}, [currentUser, email, navigate]);

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem("teamMembers")) || [];
    const member = members.find((m) => m.email === email);
    if (!member) {
     toast.error("Team member not found!");
      navigate("/team");
    } else {
      setForm(member);
    }
  }, [email, navigate]);

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
      if (form[key].trim() === "") {
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

    if (email !== members[index].email && members.some((m) => m.email === form.email)) {
      toast.success("This email already exists in team members!");
      return;
    }

    members[index] = form;
    localStorage.setItem("teamMembers", JSON.stringify(members));

   toast.success("Team Member Updated Successfully ✅");
    navigate("/team");
  };

  return (
    <>
    <div className="pt-[60px] min-h-screen w-full bg-gray-50 hidden">
      <div className="flex h-full">
        {/* Sidebar placeholder */}
         <div className="sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[130px] 
            max-w-[350px] p-4 h-full bg-white shadow">
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[75%] lg:w-[82%] px-4 md:px-8 overflow-y-auto">
         
          <button
            onClick={() => navigate("/team")}
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
              <div className="flex-1 ">
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

            {/* Email & Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full border rounded-xl h-12 px-4"
                />
              </div>
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
            </div>

            {/* Position & Gender */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Position</label>
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full border rounded-xl h-12 px-4"
                >
                  <option value="">-- Select Position --</option>
                  <option>Chief Executive Officer (CEO)</option>
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


{/* team member edit for personal */}
 <div className="pt-[60px] min-h-screen w-full bg-gray-50">
  <div className="flex flex-col md:flex-row h-full">
    
    {/* Sidebar */}
    <div className="sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[130px] max-w-[350px] p-4 h-full bg-white shadow">
      {/* Sidebar content here */}
    </div>

    {/* Main Content */}
    <div className="flex-1 px-4 md:px-8 overflow-y-auto">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/team")}
        className="text-gray-600 text-3xl md:text-4xl font-bold hover:text-blue-600 transition mt-4 md:mt-6"
      >
        ←
      </button>

      {/* Tabs */}
      <div className="border-b border-gray-200 mt-4">
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 font-semibold focus:outline-none -mb-px ${
                activeTab === "edit"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600 hover:border-purple-600"
              }`}
            >
              Edit Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`px-4 py-2 font-semibold focus:outline-none -mb-px ${
                activeTab === "preferences"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600 hover:border-purple-600"
              }`}>
              Preferences
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2 font-semibold focus:outline-none -mb-px ${
                activeTab === "security"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600 hover:border-purple-600"
              }`}
            >
              Security
            </button>
          </li>
        </ul>
      </div>

      {/* Edit Profile Section */}
      {activeTab === "edit" && (
        <section id="editProfile" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex gap-[10rem]">
              <div>
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
                  alt="default"
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
            </div>
             <div>
            {/* Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Your Name</label>
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
                <label>User Name</label>
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

            {/* Email & Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full border rounded-xl h-12 px-4"
                />
              </div>
              <div className="flex-1">
                <label>Password</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9800000001"
                  className="w-full border rounded-xl h-12 px-4"
                />
              </div>
            </div>

           
             <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Date of Birth</label>
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
                <label> Present Address</label>
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

              <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Permanent Address</label>
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
                <label>City</label>
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

                        <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label>Postal Code</label>
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
                <label>Country</label>
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
            

            {/* Submit */}
            <div className="flex justify-center md:justify-end">
              <button
                type="submit"
                className="bg-[#6E54B5] text-white font-medium rounded-xl h-12 w-44 hover:bg-[#593eb5] transition"
              >
                Update Profile
              </button>
            </div>
            </div>
            </div>
          </form>
        </section>
      )}

      {/* Preferences Section */}
      {activeTab === "preferences" && <section id="Preferences" className="mt-6">{/* Preferences content */}</section>}

      {/* Security Section */}
      {activeTab === "security" && <section id="Security" className="mt-6">{/* Security content */}</section>}

    </div>
  </div>
</div>
    </>
  );
}