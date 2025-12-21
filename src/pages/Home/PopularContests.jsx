import { Link } from "react-router";
import PopularContestCard from "./PopularContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: popular = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/popular");
      return res.data;
    }
  });

  if (isLoading) return <span className="loading loading-infinity loading-xl min-h-screen"></span>
;


  return (
    <div className="max-w-7xl mx-auto pt-8 py-10 px-6 bg-slate-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Popular Contests</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popular.map((item) => (
          <PopularContestCard key={item._id} contest={item} ></PopularContestCard>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/all-contests" className="btn btn-outline">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;
