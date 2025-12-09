import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { GiConfirmed } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

const MyContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["myContests", user?.email],
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

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">All of my contests: {contests.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Details/Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{contest.name}</td>
                <td>{contest.price}</td>
                <td>{contest.type}</td>
                <td>
                  {
                    contest.paymentStatus === "paid" ?
                    <span className="text-green-400">Paid</span>:
                    <Link to={`/dashboard/payment/${contest._id}`}>
                      <button className="btn btn-info btn-small text-black">Pay</button>
                    </Link>
                  }
                </td>
                <td>{contest.approvalStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-green-400">
                    <FaMagnifyingGlass></FaMagnifyingGlass>
                  </button>
                  <button className="btn btn-square hover:bg-orange-400 mx-2">
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    onClick={() => handleContestDelete(contest._id)}
                    className="btn btn-square hover:bg-red-400"
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

export default MyContests;