import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Public API ব্যবহার করা ভালো
import PopularContestCard from "../Home/PopularContestCard";
import Title from "../../components/Title";

const AllContests = () => {
  const axiosPublic = useAxiosPublic();

  // States for Filter, Search, Sort & Pagination
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Tabs for Categories
  const tabs = ["all", "Gaming review", "Design contest", "Article writing", "Business idea", "Photography contest"];

  // Fetch data using React Query
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-approved-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data.filter(item => item.approvalStatus === "approved");
    },
  });

  if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner text-success loading-lg"></span></div>;

  // --- Filtering Logic (Requirement: At least 2 fields)
  let filtered = contests.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.type === category;
    return matchesSearch && matchesCategory; // Field 1: Name/Search, Field 2: Category
  });

  // --- Sorting Logic ---
  if (sort === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContests = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto py-1w px-6 bg-base-200  pb-24">
      <Title>Explore All Contests</Title>

      {/* Search and Sort Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center
      mb-10 bg-base-100 p-6 rounded-md shadow-sm">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by contest name..."
            className="input input-bordered w-full shadow-inner"
            onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="select select-bordered w-full md:w-48"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Tabs (Category Filter) */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {setCategory(tab); setCurrentPage(1);}}
            className={`px-5 py-2 rounded-full border-2 transition-all font-medium
              ${category === tab ? "bg-emerald-600 shadow-md hover:bg-emerald-800 cursor-pointer" : "cursor-pointer hover:bg-base-100"}
            `}
          >
            {tab === "all" ? "All Categories" : tab}
          </button>
        ))}
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedContests.length > 0 ? (
          paginatedContests.map((contest) => (
            <PopularContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
             <p className="text-2xl text-gray-400">No contests found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16 gap-2">
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => {
                setCurrentPage(number + 1);
                window.scrollTo({top: 200, behavior: 'smooth'});
              }}
              className={`btn btn-md ${currentPage === number + 1 ? "btn-primary" : "btn-outline"}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContests;