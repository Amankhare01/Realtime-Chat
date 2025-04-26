import { Camera } from "lucide-react";
import { Useauthstore } from "../store/Useauthstore";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = Useauthstore();
  const [selectimage, setSelectimage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleimageupdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectimage(URL.createObjectURL(file)); // Show preview before upload

    const formData = new FormData();
    formData.append("profilepic", file);

    await updateProfile(formData); // Send FormData
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center relative">
        {/* Back button inside the profile card */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-50 bg-white px-4 py-2 rounded-md shadow-md border border-gray-300 text-gray-800 hover:bg-gray-200 transition text-sm font-medium"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <h2 className="text-gray-600">Your Profile Information</h2>

        <div className="relative mt-6">
          <img
            src={selectimage || authUser.profilepic || "./default.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border border-gray-300"
          />
          <button
            className="absolute bottom-2 right-25 bg-white p-2 rounded-full shadow-md border border-gray-300"
            onClick={() => fileInputRef.current.click()}
            disabled={isUpdatingProfile}
          >
            <Camera className="w-6 h-6 text-gray-600" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleimageupdate}
          />
        </div>

        <p className="mt-4 text-lg font-medium text-gray-800">
          {authUser?.fullName || "User fullName"}
        </p>
        <p className="mt-1 text-md text-gray-600">{authUser?.email || "User Email"}</p>
        <p className="mt-2 text-sm text-gray-500">
          User ID: <span className="font-semibold">{authUser?._id || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
