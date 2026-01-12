import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Title from "../../../components/Title";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();

  const image_hosting_key = import.meta.env.VITE_image_host;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, watch } = useForm();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["myProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data;
    },
  });

  const { data: stats = { participatedCount: 0, wonCount: 0 } } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const chartData = [
    { name: "Contests Won", value: stats.wonCount },
    { name: "Not Won Yet", value: stats.participatedCount - stats.wonCount },
  ];
  const COLORS = ["#4ADE80", "#F87171"];

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

      const res = await axiosSecure.patch("/users/profile", updateData);

      if (res.data.modifiedCount > 0) {
        await updateUserProfile({
          displayName: data.name,
          photoURL: newPhotoURL,
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
    <div className="max-w-7xl mx-auto py-12 px-6  bg-base-200 text-base-content">
      <Title>User Dashboards</Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-6">
        <div className="bg-base-100 shadow-sm p-8 rounded-md border border-base-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl text-center font-bold mb-6 flex items-center gap-2">
              Edit Profile
            </h3>

            <div className="flex justify-center mb-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={profile?.photoURL || user?.photoURL}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-base-content opacity-80 font-semibold mb-2">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-base-content opacity-80 font-semibold mb-2">
                    Update Photo
                  </span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-base-content opacity-80 font-semibold mb-2">
                    Bio
                  </span>
                </label>
                <textarea
                  {...register("bio")}
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Briefly describe yourself..."
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-base-content opacity-80 font-semibold mb-2">
                    Email
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.email}
                  disabled
                  className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="btn bg-base-300 w-full mt-4 hover:shadow-sm transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="bg-base-100 shadow-sm p-8 rounded-sm border border-base-100 flex flex-col items-center justify-center min-h-[500px]">
          <h3 className="text-xl font-bold mb-6 text-center flex items-center gap-2">
            Winning Statistics
          </h3>

          {stats.participatedCount > 0 ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={0}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-base-300 p-4 rounded-xl text-center border border-base-100">
                  <p className="text-xs uppercase tracking-wider font-bold mb-1">
                    Won
                  </p>
                  <p className="text-2xl font-black">{stats.wonCount}</p>
                </div>
                <div className="bg-base-300 p-4 rounded-xl text-center border border-base-100">
                  <p className="text-xs uppercase tracking-wider font-bold mb-1">
                    Participated
                  </p>
                  <p className="text-2xl font-black">
                    {stats.participatedCount}
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full">
                <p className="text-center font-bold">
                  Overall Win Rate:
                  <span className="ml-2 text-xl">
                    {((stats.wonCount / stats.participatedCount) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                </p>
                <progress
                  className="progress w-full mt-2 h-3"
                  value={(stats.wonCount / stats.participatedCount) * 100}
                  max="100"
                ></progress>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 opacity-60 h-full">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                📉
              </div>
              <p className="text-gray-500 italic font-medium">
                No participation data to visualize yet.
              </p>
              <button className="btn btn-sm btn-outline btn-primary">
                Participate Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
