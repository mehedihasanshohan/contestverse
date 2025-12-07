import { popularContests } from "../../data/popularContests";
import PopularContestCard from "./PopularContestCard";

const PopularContests = () => {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-5">Popular Contests</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularContests.map((item) => (
          <PopularContestCard key={item.id} contest={item} ></PopularContestCard>
        ))}
      </div>

      <div className="text-center mt-6">
        <a href="/all-contests" className="btn btn-outline">
          Show All
        </a>
      </div>
    </div>
  );
};

export default PopularContests;
