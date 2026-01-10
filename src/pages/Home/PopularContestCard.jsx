import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
    <div className="rounded-md shadow-lg mt-4 p-4 hover:shadow-xl transition border border-base-300">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />

      <h2 className="text-md font-semibold">{name}</h2>

      <p className="opacity-80 italic text-sm">
        {description.slice(0, 35)}...
      </p>

      <p className="font-medium text-sm opacity-70 mt-2">
        Participants: <span className="font-bold">{participants}</span>
      </p>

      <Link to={handleDetails()}>
        <button className="btn text-base-content w-full mt-3">Details</button>
      </Link>
    </div>
  );
};

export default PopularContestCard;
