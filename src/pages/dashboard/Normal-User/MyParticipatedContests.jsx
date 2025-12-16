import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const MyParticipatedContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-participated-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-participated-contests");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-medium text-center mt-6 mb-2 text-amber-700">
        My Participated Contests: {payments.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Payment Status</th>
              <th>Paid At</th>
              <th>Tracking ID</th>
              <th>Upcoming DeadLine</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>{pay.contestName}</td>
                <td className="text-green-600 font-semibold">
                  {pay.paymentStatus}
                </td>
                <td>
                  {new Date(pay.paidAt).toLocaleDateString()}
                </td>
                <td className="text-sm">{pay.trackingId}</td>
                <td>{pay.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipatedContests;
