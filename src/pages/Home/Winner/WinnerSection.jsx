import React from 'react';

const WinnerSection = () => {
    // Dummy Data for the Section
    const winnerData = {
        recentWinner: {
            name: "Akiba Begum",
            location: "Dhaka, Bangladesh",
            prize: "$5,000,000",
            quote: "Patience and belief can conquer any goal."
        },
        totalPrizeDistributed: "$100,000,000+",
        totalWinners: "2,500+"
    };

    return (
        <section className="py-16 bg-base-200"> {/* bg-base-200 for a light background contrast */}

            {/* 1. Hero/Header Section: The main motivational message */}
            <div className="hero bg-primary/10 rounded-xl max-w-6xl mx-auto mb-10 shadow-lg">
                <div className="hero-content text-center py-10">
                    <div className="max-w-md">
                        <h2 className="text-5xl font-extrabold text-primary">
                            Success Stories Start Here! 🏆
                        </h2>
                        <p className="py-6 text-lg text-neutral-content">
                            Why wait to make your dreams come true? You could be our next big winner!
                        </p>
                        <a href="/play" className="btn btn-primary btn-lg shadow-xl hover:scale-[1.05] transition-transform">
                            Play Now and Win! ✨
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Core Data Stats/Cards Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Recent Winner (Custom Card Look) */}
                <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-accent">
                    <figure className="px-10 pt-10">
                        {/* Placeholder for the Winner Image */}
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                                <img src="https://i.pravatar.cc/150?img=40" alt="Recent Winner Akiba" />
                            </div>
                        </div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h3 className="card-title text-2xl font-bold text-accent">
                            Congratulations, {winnerData.recentWinner.name}!
                        </h3>
                        <div className="badge badge-lg badge-success font-semibold mt-2">
                            Prize: {winnerData.recentWinner.prize}
                        </div>
                        <p className="text-sm italic mt-2">
                            {winnerData.recentWinner.location}
                        </p>
                        <blockquote className="text-neutral mt-4 italic border-l-4 border-base-300 pl-3">
                            "{winnerData.recentWinner.quote}"
                        </blockquote>
                    </div>
                </div>

                {/* Card 2: Total Prize Distributed (DaisyUI Stat Component) */}
                <div className="stats shadow-xl bg-base-100 p-6 flex flex-col justify-center items-center h-full">
                    <div className="stat text-center">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title font-medium text-lg">Total Prize Distributed</div>
                        <div className="stat-value text-4xl text-secondary">
                            {winnerData.totalPrizeDistributed}
                        </div>
                        <div className="stat-desc mt-2 text-sm">
                            Millions have already been paid out! Claim your share.
                        </div>
                    </div>
                </div>

                {/* Card 3: Total Winners (DaisyUI Stat Component) */}
                <div className="stats shadow-xl bg-base-100 p-6 flex flex-col justify-center items-center h-full">
                    <div className="stat text-center">
                        <div className="stat-figure text-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="stat-title font-medium text-lg">Our Winning Community</div>
                        <div className="stat-value text-4xl text-info">
                            {winnerData.totalWinners}
                        </div>
                        <div className="stat-desc mt-2 text-sm">
                            Users have fulfilled their dreams on our platform so far.
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default WinnerSection;