import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["/payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">Payment History. Total pay: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Contest Name</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {
              payments.map((payment, index) => <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.contestName}</td>
              <td>{payment.amount}</td>
              <td>{payment.transactionId}</td>
            </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;