import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PopularContestCard from "../Home/PopularContestCard";
import { useSearchParams } from "react-router";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
const searchType = searchParams.get("type");

  // TAB State
  const [activeTab, setActiveTab] = useState("all");

  // Fetch approved contests only
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-approved-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data.filter(item => item.approvalStatus === "approved");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  // FILTERING BASED ON TYPE
  // const filteredContests =
  //   activeTab === "all"
  //     ? contests
  //     : contests.filter(item => item.type === activeTab);
const filteredContests =
  searchType
    ? contests.filter(item =>
        item.type.toLowerCase().includes(searchType.toLowerCase())
      )
    : activeTab === "all"
    ? contests
    : contests.filter(item => item.type === activeTab);

  const tabs = ["all", "Gaming review", "Design contest", "Article writing", "Business idea", "Photography contest"];

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">All Contests</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border transition
              ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white"}
            `}
          >
            {tab === "all"
              ? "All"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <PopularContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No contests available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllContests;
