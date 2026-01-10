import { Link } from "react-router";
import PopularContestCard from "./PopularContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title";

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
    <div className="max-w-7xl mx-auto pt-8 py-12 px-6 bg-base-200">
      <Title>Popular Contests</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
