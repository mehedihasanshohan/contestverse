import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveCreator = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: contests = [] } = useQuery({
    queryKey: ["contests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const updateCreatorStatus = (contest, status) => {
    const updateInfo = { status: status, email: contest.contestCreatorEmail };
    axiosSecure.patch(`/creators/${contest._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Creator status is set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApproval = (contest) => {
    updateCreatorStatus(contest, "approved");
  };

  const handleRejection = (contest) => {
    updateCreatorStatus(contest, "rejected");
  };

  const handleDelete = (contest) => {
    console.log(contest._id);
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">
        ALL Contests: {contests.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Contest Name</th>
              <th>Price</th>
              <th>Prize</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Accept / Reject / Delete</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.name}</td>
                <td>{contest.price}</td>
                <td>{contest.prize}</td>
                <td>{contest.type}</td>
                <td>{contest.deadline}</td>
                <td>
                  <p
                    className={`${
                      contest.status === "approved"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {contest.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(contest)}
                    className="btn text-teal-600 "
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleRejection(contest)}
                    className="btn text-red-600 ml-2 mr-2"
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button
                    onClick={() => handleDelete(contest)}
                    className="btn text-red-400"
                  >
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveCreator;
