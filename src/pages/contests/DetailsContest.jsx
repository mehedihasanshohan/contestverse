import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useRole from './../../hooks/useRole';

const DetailsContest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();
  const [isEnded, setIsEnded] = useState(false);

  const [countdown, setCountdown] = useState("");

  const {
    data: contest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest-details/${id}`);
      return res.data;
    },
  });

  // Countdown Logic
  useEffect(() => {
    if (!contest?.deadline) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(contest.deadline);
      const diff = end - now;

      if (diff <= 0) {
        setCountdown("Contest Ended");
        setIsEnded(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m`);
      setIsEnded(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      contestName: contest.name,
      // userEmail: contest.creatorEmail,
      // userName: contest.creatorName
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  // Loading UI
  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // Error UI
  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load contest details.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl p-8 rounded-xl">
      <img
        src={contest?.image}
        alt={contest?.name}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h2 className="text-4xl font-bold mt-6">{contest.name}</h2>

      <p className="text-lg text-gray-700 mt-3">{contest.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-4 border rounded-xl">
          <p className="text-xl font-semibold">
            Participants:{" "}
            <span className="text-blue-600">{contest.participants}</span>
          </p>

          <p className="text-xl font-semibold mt-2">
            Entry Price: <span className="text-blue-600">${contest.price}</span>
          </p>

          <p className="text-xl font-semibold mt-2">
            Prize Money:{" "}
            <span className="text-green-600">${contest.prize}</span>
          </p>

          <p className="text-xl font-semibold mt-2">
            Type: <span className="capitalize">{contest.type}</span>
          </p>

          <p className="text-xl font-semibold mt-2">
            Deadline:{" "}
            <span className={isEnded ? "text-red-600" : "text-red-500"}>
              {countdown}
            </span>
          </p>
        </div>

        <div className="p-4 border rounded-xl">
          <h3 className="text-xl font-bold">Task Instruction</h3>
          <p className="text-gray-700 mt-3">{contest.instruction}</p>
        </div>
      </div>

      <div className="mt-10">
        {!user && (
          <Link to="/login">
            <button className="btn btn-outline w-full">
              Login to Participate
            </button>
          </Link>
        )}

        {user && isEnded && (
          <button className="btn btn-disabled w-full">Contest Ended</button>
        )}

        {user && !isEnded && role !== 'creator'  && (
          <button onClick={handlePayment} className="btn btn-primary w-full">
            Register & Pay
          </button>
        )}


      </div>
    </div>
  );
};

export default DetailsContest;
