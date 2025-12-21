
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

