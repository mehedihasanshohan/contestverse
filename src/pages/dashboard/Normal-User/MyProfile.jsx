import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();

  // ImgBB API Key (from env)
  const image_hosting_key = import.meta.env.VITE_image_host;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, watch } = useForm();

  // 1. Fetch current user data from DB
  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["myProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data;
    },
  });

  // 2. Set default values when data is loaded
  useEffect(() => {
    if (profile?._id) {
      reset({
        name: profile?.displayName || user?.displayName || "",
        bio: profile?.bio || "",
      });
    }
  }, [profile, reset, user]);

  const onSubmit = async (data) => {
    try {
      let newPhotoURL = profile?.photoURL || user?.photoURL;

      // 3. Check if user selected a NEW image file
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await axios.post(image_hosting_api, formData);
        if (res.data.success) {
          newPhotoURL = res.data.data.url;
        }
      }


      const updateData = {
        displayName: data.name,
        photoURL: newPhotoURL,
        bio: data.bio,
      };

      // 5. Update in MongoDB
      const res = await axiosSecure.patch("/users/profile", updateData);

      if (res.data.modifiedCount > 0) {
        await updateUserProfile({
            displayName: data.name,
            photoURL: newPhotoURL
        });

        refetch();
        Swal.fire("Updated!", "Profile updated successfully", "success");
      } else {
        Swal.fire("Info", "No changes made", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      {/* Show Current Image */}
      <div className="flex justify-center mb-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profile?.photoURL || user?.photoURL} alt="Profile" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Image Input (File) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Update Photo (Optional)</span>
          </label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />
        </div>

        {/* Bio Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            {...register("bio")}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        {/* Read-only Email */}
        <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="text" value={user?.email} disabled className="input input-bordered w-full bg-gray-100" />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyProfile;