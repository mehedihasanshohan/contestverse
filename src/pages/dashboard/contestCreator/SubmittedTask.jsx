import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";

const SubmittedTasks = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const submissionModalRef = useRef();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // 1. Load submissions of this contest
  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/contest/${contestId}`);
      return res.data;
    },
  });

  // 2. Declare winner
  const handleDeclareWinner = (submissionId) => {
    Swal.fire({
      title: "Declare Winner?",
      text: "Only one winner is allowed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/submissions/declare-winner/${submissionId}`)
          .then(() => {
            Swal.fire("Success!", "Winner declared", "success");
            refetch();
          })
          .catch((err) => {
            Swal.fire(
              "Error",
              err.response?.data?.message || "Something went wrong",
              "error"
            );
          });
      }
    });
  };

  const openSubmissionLinkModal = (sub) => {
    setSelectedSubmission(sub);
    submissionModalRef.current.showModal();
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">
        Submitted Tasks
      </h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Submission</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((sub, index) => (
            <tr key={sub._id}>
              <td>{index + 1}</td>
              <td>{sub.userName}</td>
              <td>{sub.userEmail}</td>
              <td>
                <button
                  onClick={() => openSubmissionLinkModal(sub)}
                  className="btn"
                >
                  View
                </button>
              </td>
              <td>
                {sub.status === "winner" ? (
                  <span className="badge badge-success">Winner 🏆</span>
                ) : (
                  <button
                    onClick={() => handleDeclareWinner(sub._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Declare Winner
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* modal */}
      <dialog
        ref={submissionModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {selectedSubmission?.contestName}
          </h3>
          <p>Submission:</p>
          <p className="py-4">{selectedSubmission?.submissionText}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SubmittedTasks;
