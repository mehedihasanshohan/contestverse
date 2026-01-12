import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CountUp from "react-countup";

const PopularContestCard = ({ contest }) => {
  const { user } = useContext(AuthContext);
  const { _id, name, image, participants, description } = contest;

  const handleDetails = () => {
    if (!user) {
      return "/login";
    }
    return `/contest-details/${contest._id}`;
  };

  return (
    <div className="rounded-md shadow-sm mt-4 p-4 hover:shadow-xl transition border border-base-100">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />

      <h2 className="text-lg font-semibold mt-4">{name}</h2>

      <p className="opacity-80 text-sm mt-2">{description.slice(0, 35)}...</p>

      <p className="font-medium text-md opacity-80 mt-2">
        Participants:{" "}
        <span className="font-bold">
          <CountUp
            end={participants}
            duration={5}
            enableScrollSpy={true}
            scrollSpyOnce={false}
          />
        </span>
      </p>
      <p className="font-medium text-md opacity-80 mt-2">Price:
        <span className="font-bold"> $
          <CountUp
            end={contest.price}
            duration={4}
            enableScrollSpy={true}
            scrollSpyOnce={false}
          />
        </span>
      </p>

      <Link to={handleDetails()}>
        <button className="btn bg-base-300 hover:bg-base-100 text-base-content w-full mt-3">Details</button>
      </Link>
    </div>
  );
};

export default PopularContestCard;
