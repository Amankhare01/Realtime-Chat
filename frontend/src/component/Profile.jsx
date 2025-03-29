import { Camera } from "lucide-react";
import { Useauthstore } from "../store/Useauthstore";
import { useState, useRef } from "react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = Useauthstore();
  const [selectimage, setSelectimage] = useState(null);
  const fileInputRef = useRef(null);

  const handleimageupdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectimage(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <h2 className="text-gray-600">Your Profile Information</h2>

        <div className="relative mt-6">
          <img
            src={selectimage || authUser.profilepic || "./default.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border border-gray-300"
          />
          <button
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-300"
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
        <p className="mt-4 text-lg font-medium text-gray-800">
          {authUser?.email || "User Email"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
