// import banner from '/banner6.png'

// export default function Banner({ onSearch }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = e.target.search.value;
//     onSearch?.(query);
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${banner})`,
//         filter: 'brightness(1.15) contrast(1.2)',

//       }}
//       className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
//     >
//       {/* Overlay */}
//       <div className="absolute"></div>

//       {/* Content */}
//       <div className="relative z-10 mb-48 text-center px-4 max-w-2xl">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-300 drop-shadow-lg mb-4">
//           Discover Creative Contests
//         </h1>
//         <p className="text-gray-300 font-medium mb-8 text-lg">
//           Find design, writing, business & gaming contests and participate now!
//         </p>

//         {/* Search Bar */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex items-center bg-gray-500 dark:bg-neutral-800 rounded-full overflow-hidden shadow-lg"
//         >
//           <input
//             type="text"
//             name="search"
//             placeholder="Search contest by category..."
//             className="flex-1 px-5 py-3 bg-transparent outline-none text-neutral-900 dark:text-white"
//           />
//           <button
//             type="submit"
//             className="px-6 py-3 bg-orange-500 hover:bg-blue-700 text-white font-medium transition-colors"
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import banner from "/banner6.png";
import { useNavigate } from "react-router";

export default function Banner() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (!query) return;

    navigate(`/all-contests?type=${encodeURIComponent(query)}`);
  };

  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mb-40">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl mb-4">
          Discover Creative Contests
        </h1>

        <p className="text-gray-200 text-lg mb-8">
          Design, Writing, Gaming, Photography & Business idea contests await you
        </p>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white/90 dark:bg-neutral-900 rounded-full overflow-hidden shadow-xl"
        >
          <input
            type="text"
            name="search"
            placeholder="Search by contest category (Photography contest...)"
            className="flex-1 px-5 py-3 bg-transparent outline-none text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

