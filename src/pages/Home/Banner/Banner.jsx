// import banner from "/banner6.png";
import banner from "/assets/bann.jfif"
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
      className="relative max-w-7xl mx-auto h-[80vh] bg-cover bg-center flex items-center justify-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"></div>

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






// // import banner from "/banner6.png";
// import banner from "/assets/bann.jfif";
// import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import { Search, ChevronDown } from "lucide-react";

// export default function Banner() {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = e.target.search.value.trim();
//     if (!query) return;
//     navigate(`/all-contests?type=${encodeURIComponent(query)}`);
//   };

//   return (
//     <div className="relative text-base-content w-full h-[75vh] overflow-hidden flex items-center justify-center">
//       <motion.div
//         initial={{ scale: 1.1 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 1.5 }}
//         style={{ backgroundImage: `url(${banner})` }}
//         className="absolute inset-0 sm:h-[55vh] md:h-[65vh] w-full lg:h-[75vh] opacity-70 bg-no-repeat bg-contain bg-center"
//       />

//       <div className="relative z-10 text-center px-4 max-w-3xl">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter"
//         >
//           Discover Creative <span className="text-amber-500">Contests</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-lg md:text-xl mb-10 max-w-xl mx-auto font-medium"
//         >
//           Your gateway to design, writing, and gaming glory.
//         </motion.p>

//         <motion.form
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           onSubmit={handleSubmit}
//           className="flex items-center bg-base-300 rounded-md
//           overflow-hidden shadow-sm p-1.5 max-w-xl mx-auto border border-base-300"
//         >
//           <div className="pl-4">
//             <Search size={20} />
//           </div>
//           <input
//             type="text"
//             name="search"
//             placeholder="Search categories (e.g. Photography...)"
//             className="flex-1 px-4 py-3 bg-transparent outline-none placeholder:text-slate-500 font-medium"
//           />
//           <button
//             type="submit"
//             className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 font-bold text-base-300
//              rounded-md transition-all active:scale-95 shadow-sm"
//           >
//             Search
//           </button>
//         </motion.form>
//       </div>

//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-50"
//       >
//         <ChevronDown size={32} />
//       </motion.div>
//     </div>
//   );
// }
