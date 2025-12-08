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
    <div className="rounded-xl shadow-lg bg-white p-4 hover:shadow-2xl transition border">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">{name}</h2>

      <p className="text-gray-600 text-sm">
        {description.slice(0, 60)}...
      </p>

      <p className="font-medium mt-2">
        Participants: <span className="font-bold">{participants}</span>
      </p>

      <Link to={handleDetails()}>
        <button className="btn btn-primary w-full mt-3">Details</button>
      </Link>
    </div>
  );
};

export default PopularContestCard;
