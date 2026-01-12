import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyParticipatedContests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: payments = [], isLoading, refetch } = useQuery({
    queryKey: ["my-participated-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-participated-contests");
      return res.data;
    },
  });

  const handleSubmission = async (data) => {
    if (!selectedContest) return;

    try {
      await axiosSecure.post("/submissions", {
        contestId: selectedContest.contestId,
        contestName: selectedContest.contestName,
        submissionText: data.taskLink,
      });

      Swal.fire("Submitted!", "Your task has been submitted.", "success");
      setSelectedContest(null);
      reset();
      refetch();
    } catch (err) {
      Swal.fire(
        "Failed!",
        err.response?.data?.message || "Submission failed",
        "error"
      );
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-base-content bg-base-200">
      <h2 className="text-xl font-medium text-center mt-6 mb-6">
        My Participated Contests: {payments.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Payment Status</th>
              <th>Paid At</th>
              <th>Tracking ID</th>
              <th>Upcoming Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>{pay.contestName}</td>
                <td className="text-green-600 font-semibold">{pay.paymentStatus}</td>
                <td>{new Date(pay.paidAt).toLocaleDateString()}</td>
                <td className="text-sm">{pay.trackingId}</td>
                <td>{new Date(pay.deadline).toLocaleDateString()}</td>
                <td>
                  {pay.isSubmitted ? (
                    <span className="badge badge-success">Submitted</span>
                  ) : new Date(pay.deadline) > new Date() ? (
                    <button
                      onClick={() => setSelectedContest(pay)}
                      className="bg-teal-400 text-white px-3 py-1 rounded-xl hover:bg-teal-600 transition cursor-pointer"
                    >
                      Submit
                    </button>
                  ) : (
                    <span className="text-red-500 font-semibold">Contest Ended</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render modal */}
      {selectedContest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-md p-6">
            <h3 className="font-bold text-lg text-center">
              Submit Task - {selectedContest.contestName}
            </h3>

            <form onSubmit={handleSubmit(handleSubmission)} className="mt-4">
              <textarea
                {...register("taskLink", { required: true })}
                className="w-full h-[120px] mt-2 mb-4 border-2 border-teal-600 rounded-md p-2 resize-none"
                placeholder="Paste your task link or description here"
              />
              <button
                type="submit"
                className="bg-teal-400 text-white px-3 py-1 rounded-xl w-full hover:bg-teal-600 transition cursor-pointer"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setSelectedContest(null)}
              className="btn btn-outline w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParticipatedContests;
