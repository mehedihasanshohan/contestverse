import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FiEdit } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Title";

const MyContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user.email}`);
      return res.data;
    },
  });

  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your contest request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg-base-200">
      <Title>All of my contests: {contests.length}</Title>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{contest.name}</td>
                <td>{contest.price}</td>
                <td>{contest.type}</td>
                <td>{contest.approvalStatus}</td>
                <td className="flex gap-2">
                  {contest.approvalStatus === "pending" && (
                    <>
                      <Link to={`/dashboard/edit-contest/${contest._id}`}>
                        <button className="btn btn-sm btn-warning">
                          <FiEdit />
                        </button>
                      </Link>

                      <button
                        onClick={() => handleContestDelete(contest._id)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTrashCan />
                      </button>
                    </>
                  )}

                  {contest.approvalStatus === "approved" && (
                    <>
                      <Link to={`/dashboard/submissions/${contest._id}`}>
                        <button className="btn btn-sm bg-cyan-600">
                          Submissions
                        </button>
                      </Link>
                    </>
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

export default MyContests;
