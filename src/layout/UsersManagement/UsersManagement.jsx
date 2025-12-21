import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {

    if (user.email === 'cr@gmail.com') {
      return Swal.fire({
        icon: "error",
        title: "This action is restricted to test the ui as creator!",
      });
    }
    if (user.email === 'w@gmail.com') {
      return Swal.fire({
        icon: "error",
        title: "This action is restricted to test the ui as creator!",
      });
    }

    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    if (user.email === currentUser?.email) {
      return Swal.fire({
        icon: "error",
        title: "You cannt remove yourself from admin",
      });
    }

    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed as an admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">
        Manage Users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                {/* Photo */}
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          user.photoURL ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt="user avatar"
                      />
                    </div>
                  </div>
                </td>

                {/* Name */}
                <td>{user.displayName}</td>

                {/* Email */}
                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-200"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-500"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
