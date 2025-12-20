import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";

const ApproveCreator = () => {
  const axiosSecure = useAxiosSecure();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { refetch, data: contests = [] } = useQuery({
    queryKey: ["contests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // pagination logic
  const totalPages = Math.ceil(contests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = contests.slice(startIndex, startIndex + itemsPerPage);

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            {currentItems.map((contest, index) => (
              <tr key={contest._id}>
                <th>{startIndex + index + 1}</th>
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
                    className="btn text-red-500 ml-2 mr-2"
                  >
                    <ImCancelCircle></ImCancelCircle>
                  </button>
                  <button
                    onClick={() => handleContestDelete(contest)}
                    className="btn text-red-500"
                  >
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Controls --- */}
      {contests.length > itemsPerPage && (
        <div className="flex justify-center my-8">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`join-item btn ${currentPage === pageNum ? 'btn-active btn-primary' : ''}`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveCreator;

