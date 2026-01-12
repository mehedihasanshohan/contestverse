import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: winners = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/leaderboard');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 text-3xl">Loading Rankings...</div>;

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 text-base-content bg-base-200 min-h-screen">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Hall of Fame</h2>
                <p className="opacity-80 italic">Celebrating our top contest winners</p>
            </div>

            <div className="overflow-x-auto bg-base-100 shadow-sm rounded-md">
                <table className="table w-full">
                    {/* head */}
                    <thead className="text-lg">
                        <tr>
                            <th className="rounded-tl-2xl">Rank</th>
                            <th>User</th>
                            <th>Wins</th>
                            <th className="rounded-tr-2xl">Badge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => (
                            <tr key={winner._id} className="transition-colors">
                                <td className="font-bold text-xl">
                                    #{index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="font-bold text-lg">{winner.userName}</div>
                                            <div className="text-sm opacity-50">{winner._id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-black text-2xl">
                                    {winner.totalWins}
                                </td>
                                <td>
                                    {index === 0 && <span className="badge badge-warning p-3 font-bold">🥇 Gold</span>}
                                    {index === 1 && <span className="badge badge-secondary p-3 font-bold">🥈 Silver</span>}
                                    {index === 2 && <span className="badge badge-accent p-3 font-bold">🥉 Bronze</span>}
                                    {index > 2 && <span className="badge badge-ghost">Challenger</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {winners.length === 0 && (
                    <p className="text-center py-10 font-semibold">No winners declared yet!</p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;