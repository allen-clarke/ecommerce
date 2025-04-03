import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import userPhotoValidation from "../validations/userProfileValidation";
import axios from "axios";
const ProfileSettings = () => {
  const {
    user,
    editingField,
    setEditingField,
    handleUpdateName,
    handleUpdatePhotoURL,
    handleUpdateEmail,
    handleUpdatePassword,
    message,
    setMessage,
  } = useAuth();

  const [profile, setProfile] = useState({
    fullName: user?.displayName || "Not set",
    email: user?.email || "Not set",
    password: user?.password || "Not set",
  });
  const [profilePhoto, setProfilePhoto] = useState({
    photo: "",
  });
  const [inputFields] = useState([
    { label: "Full name", type: "text", key: "fullName" },
    { label: "Email address", type: "email", key: "email" },
    { label: "Password", type: "password", key: "password" },
  ]);

  const handleChange = (e) => {
    setProfile({ ...profile, [editingField]: e.target.value });
  };
  const handleUpdatePhoto = () => {
    const { success, error, data } =
      userPhotoValidation.safeParse(profilePhoto);
    if (!success) return setMessage(error.format().photo._errors[0]);

    const actaulPhoto = new FormData();
    actaulPhoto.append("image", data.photo);

    axios
      .post("http://localhost:5000/api/users/update-profile-pic", actaulPhoto, {
        headers: { uid: user.uid },
      })
      .then((res) => {
        handleUpdatePhotoURL(res.data.toString());
        setMessage("Profile photo updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error uploading photo");
      });
  };

  return (
    <div className="h-screen mx-auto p-6 md:px-32 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
      <p className="text-sm text-gray-500">
        These informations will be used to get your orders delivered to you. Be
        careful of how you set them.
      </p>

      <div className="mt-4 space-y-4">
        {message && (
          <p className="text-sm font-medium text-gray-700">{message}</p>
        )}
        <div>
          <label
            htmlFor="profile-photo"
            className="text-sm font-medium  text-gray-800"
          >
            Profile Photo
          </label>
          <div className="flex flex-row items-center">
            <input
              type="file"
              id="profile-photo"
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              onChange={(e) => {
                setProfilePhoto({ photo: e.target.files[0] });
              }}
            />
            <button
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 ml-4"
              onClick={handleUpdatePhoto}
            >
              Update
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            PNG, JPG, WEBP, and JPEG are Allowed.
          </p>
        </div>
        {inputFields.map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-3">
            <div>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
              {editingField === item.key ? (
                <input
                  type={item.type}
                  value={profile[item.key]}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full text-sm"
                />
              ) : (
                <p className="text-sm text-gray-900">{profile[item.key]}</p>
              )}
            </div>
            {editingField === item.key ? (
              <button
                onClick={() => {
                  item.key === "fullName" && handleUpdateName(profile.fullName);
                  item.key === "email" && handleUpdateEmail(profile.email);
                  item.key === "password" &&
                    handleUpdatePassword(profile.password);
                }}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingField(item.key)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;
