import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";

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
    const updateInfo = { status: status, email: contest.email };
    axiosSecure.patch(`/contests/${contest._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Contest status is set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleContestConfirm = (contest) => {
    updateCreatorStatus(contest, "approved");
  };

  const handleContestRejection = (contest) => {
    updateCreatorStatus(contest, "rejected");
  };

  const handleContestDelete = (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This contest will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${contest._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Contest has been deleted.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
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
              <th>Approved-Status</th>
              <th>Confirm / Reject / Delete</th>
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
                      contest.approvalStatus === "approved"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {contest.approvalStatus}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleContestConfirm(contest)}
                    className="btn text-teal-600 "
                  >
                    <GiConfirmed></GiConfirmed>
                  </button>
                  <button
                    onClick={() => handleContestRejection(contest)}
                    className="btn text-red-600 ml-2 mr-2"
                  >
                    <ImCancelCircle></ImCancelCircle>
                  </button>
                  <button
                    onClick={() => handleContestDelete(contest)}
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
