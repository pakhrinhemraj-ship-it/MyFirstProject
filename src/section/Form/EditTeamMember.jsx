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

    toast.success("Team Member Updated Successfully ✅");
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
            <div className="sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-[18%] 2xl:w-[16%] min-w-[130px] max-w-[350px] p-4 h-full bg-white shadow"></div>
            <div className="w-full md:w-[75%] lg:w-[82%] px-4 md:px-8 overflow-y-auto">
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
                      {/* Other options remain same */}
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