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

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg min-h-screen"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load contest details.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 bg-base-200 py-12 pb-24 rounded-md">
      <div className="max-w-4xl mx-auto px-6 py-8 bg-base-100">
        <img
        src={contest?.image}
        alt={contest?.name}
        className="w-full h-80 object-cover rounded-md"
      />

      <h2 className="text-4xl font-bold mt-6">{contest.name}</h2>

      <p className="text-xl opacity-80 mt-3">{contest.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-4 border border-base-300 shadow-sm rounded-md">
          <p className="text-[16px] opacity-80 font-semibold">
            Participants:{" "}
            <span className="text-teal-700">{contest.participants}</span>
          </p>

          <p className="text-[16px] opacity-80 font-semibold mt-2">
            Entry Price: <span className="text-teal-700">${contest.price}</span>
          </p>

          <p className="text-[16px] opacity-80 font-semibold mt-2">
            Prize Money:{" "}
            <span className="text-teal-700">${contest.prize}</span>
          </p>

          <p className="text-[16px] opacity-80 font-semibold mt-2">
            Type: <span className="capitalize text-teal-700">{contest.type}</span>
          </p>

          <p className="text-[16px] opacity-80 font-semibold mt-2">
            Deadline:{" "}
            <span className={isEnded ? "text-red-600" : "text-red-500"}>
              {countdown}
            </span>
          </p>
        </div>

        <div className="p-4 border border-base-300 rounded-md shadow-sm">
          <h3 className="text-[16px] font-bold">Task Instruction</h3>
          <p className="mt-3 opacity-80">{contest.instruction}</p>
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

        {user && !isEnded && role == 'user'  && (
          <button onClick={handlePayment} className="btn btn-primary w-full">
            Register & Pay
          </button>
        )}


      </div>
      </div>
    </div>
  );
};

export default DetailsContest;
