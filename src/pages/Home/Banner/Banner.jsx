import banner from '/banner6.png'

export default function Banner({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    onSearch?.(query);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        filter: 'brightness(1.15) contrast(1.2)',
        
      }}
      className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute"></div>

      {/* Content */}
      <div className="relative z-10 mb-48 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 drop-shadow-lg mb-4">
          Discover Creative Contests
        </h1>
        <p className="text-gray-300 font-medium mb-8 text-lg">
          Find design, writing, business & gaming contests and participate now!
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-gray-500 dark:bg-neutral-800 rounded-full overflow-hidden shadow-lg"
        >
          <input
            type="text"
            name="search"
            placeholder="Search contest by category..."
            className="flex-1 px-5 py-3 bg-transparent outline-none text-neutral-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
