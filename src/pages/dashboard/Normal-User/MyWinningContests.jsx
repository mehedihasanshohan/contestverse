

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from './../../../hooks/useAuth';
import { Trophy, Medal, Crown, Star, Quote } from "lucide-react";

const MyWinningContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winningContests = [], isLoading } = useQuery({
        queryKey: ['my-wins', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/my-wins/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl text-white">
                    <div>
                        <h2 className="text-4xl font-black flex items-center gap-3">
                            <Crown className="text-yellow-400 w-10 h-10" />
                            Hall of Fame
                        </h2>
                        <p className="text-gray-400 mt-2 uppercase tracking-widest text-sm font-bold">
                            Your Personal Victory Gallery
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-yellow-400">{winningContests.length}</p>
                            <p className="text-xs uppercase text-gray-400">Wins</p>
                        </div>
                        <div className="h-10 w-px bg-gray-700"></div>
                        <div className="bg-yellow-400/10 p-4 rounded-2xl">
                            <Trophy className="text-yellow-400 w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto">
                {winningContests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {winningContests.map((contest) => (
                            <div key={contest._id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                                {/* Card Header with Badge */}
                                <div className="relative h-24 bg-linear-to-br from-yellow-500 to-orange-600 p-6 flex items-start justify-between">
                                    <Star className="text-white/30 absolute -right-2 -top-2 w-20 h-20 rotate-12" />
                                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase">
                                        Champion
                                    </div>
                                    <Medal className="text-white w-8 h-8" />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                        {contest.contestName}
                                    </h3>

                                    <div className="relative mt-4 mb-6">
                                        <Quote className="text-gray-100 absolute -top-4 -left-2 w-10 h-10" />
                                        <p className="text-gray-600 italic text-sm line-clamp-3 relative z-10 pl-4 border-l-2 border-orange-200">
                                            {contest.submissionText}
                                        </p>
                                    </div>

                                    {/* Prize Section */}
                                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Prize Money</p>
                                            <p className="text-2xl font-black text-gray-800">
                                                ${contest.prize || '50000'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Status</p>
                                            <p className="text-xs font-bold text-green-600 flex items-center gap-1 justify-end">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                Released
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                                    <button className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest transition-all">
                                        Download Certificate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trophy className="text-gray-300 w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">No Trophies Yet</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                            The race is still on! Participate in more contests and claim your place in the Hall of Fame.
                        </p>
                        <button className="btn btn-warning mt-8 px-8 rounded-full font-bold shadow-lg shadow-yellow-200">
                            Browse Contests
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyWinningContests;