import { Link } from "react-router";

const WinnerAdvertisement = () => {
  return (
    <div className="bg-gray-100 py-16 mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">Our Pride Winner </h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SECTION */}
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">
            Celebrate Our Recent Winners! 🏆
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Every month thousands of creative users participate, compete,
            and win exciting prizes. You could be the next winner!
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-teal-600 text-white rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-sm opacity-80">Total Winners</p>
            </div>
            <div className="bg-teal-600 text-white rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-3xl font-bold">$25k+</h3>
              <p className="text-sm opacity-80">Prize Given</p>
            </div>
            <div className="bg-teal-600 text-white rounded-xl p-4 backdrop-blur-md">
              <h3 className="text-3xl font-bold">4.9★</h3>
              <p className="text-sm opacity-80">User Rating</p>
            </div>
          </div>

          <Link to="/all-contests">
            <button className="btn mt-8 bg-teal-600 text-white font-bold px-6">
              Participate Now
            </button>
          </Link>
        </div>

        {/* RIGHT SECTION (Recent Winners) */}
        <div className="grid grid-cols-1 gap-6">

          {/* Winner Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-lg flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/prLfHpCM/received-2073722346231746.jpg"
              alt="Winner"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-bold text-gray-800">Hamza Rahman</h4>
              <p className="text-gray-600 text-sm">Winner of GTA-5 Gaming Contest</p>
              <p className="text-blue-600 font-bold text-sm">$1000 Prize</p>
            </div>
          </div>

          {/* Winner Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-lg flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/RTH96Jbd/IMG-20210123-132734-1.jpg"
              alt="Winner"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-bold text-gray-800">Mehedi Hassan</h4>
              <p className="text-gray-600 text-sm">Winner of Logo Design Contest</p>
              <p className="text-blue-600 font-bold text-sm">$500 Prize</p>
            </div>
          </div>

          {/* Winner Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-lg flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/jkrxF69H/received-2050816975188950.jpg"
              alt="Winner"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-bold text-gray-800">Abu Hurayra</h4>
              <p className="text-gray-600 text-sm">Winner of Article Writing Contest</p>
              <p className="text-blue-600 font-bold text-sm">$800 Prize</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WinnerAdvertisement;
