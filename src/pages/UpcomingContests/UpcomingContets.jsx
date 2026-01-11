import React, { useState, useEffect } from "react";
import { Trophy, BellRing, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import Subtitle from "../../components/Subtitle";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "../../components/Title";

const UpcomingContests = () => {
  const [remindedIds, setRemindedIds] = useState([]);

  const upcomingData = [
    {
      id: "1",
      title: "Logo Design Sprint",
      type: "Image Design",
      targetDate: new Date("2026-02-20T10:00:00").getTime(),
      prize: "$500",
    },
    {
      id: "2",
      title: "Next-Gen AI Article",
      type: "Article Writing",
      targetDate: new Date("2026-02-15T15:30:00").getTime(),
      prize: "$300",
    },
    {
      id: "3",
      title: "Cyberpunk Review",
      type: "Gaming",
      targetDate: new Date("2026-02-12T12:00:00").getTime(),
      prize: "$1000",
    },
    {
      id: "4",
      title: "React Performance",
      type: "Tech Blog",
      targetDate: new Date("2026-02-25T09:00:00").getTime(),
      prize: "$450",
    },
  ];

  const handleReminder = (id, title) => {
    setRemindedIds((prev) => [...prev, id]);

    Swal.fire({
      title: "Reminder Planned!",
      text: `We'll notify you when ${title} begins.`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <section className="py-20 bg-base-200 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Title>
              Upcoming <span className="text-cyan-500">Drops</span>
            </Title>
            <Subtitle>Get ready for the next wave of creativity.</Subtitle>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingData.map((contest) => (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <ContestCard
                key={contest.id}
                contest={contest}
                isPlanned={remindedIds.includes(contest.id)}
                onReminder={() => handleReminder(contest.id, contest.title)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContestCard = ({ contest, onReminder, isPlanned }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = contest.targetDate - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [contest.targetDate]);

  return (
    <div
      className={`group p-6 rounded-md border transition-all duration-300 ${
        isPlanned ? "bg-base-300/30" : "bg-base-200  border-base-300"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold px-2 py-1 bg-primary/10
        text-primary rounded uppercase tracking-widest">
          {contest.type}
        </span>
        {!isPlanned && (
          <div className="w-2 h-2 rounded-full bg-error animate-ping"></div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-1 truncate">{contest.title}</h3>
      <p className="text-success font-semibold text-sm mt-2 mb-4 flex items-center gap-1">
        <Trophy size={14} /> Prize: {contest.prize}
      </p>

      {/* Mini Timer */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 gap-1 text-center mb-6 bg-base-100 p-2
       rounded-lg border border-base-300"
      >
        {timeLeft ? (
          Object.entries(timeLeft).map(([label, val]) => (
            <div key={label}>
              <p className="text-lg font-mono font-bold leading-none">{val}</p>
              <p className="text-[8px] uppercase">{label}</p>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-xs font-bold text-primary">LIVE NOW</p>
        )}
      </div>

      <button
        onClick={onReminder}
        disabled={isPlanned}
        className={`w-full btn py-3 rounded-md border bg-base-300 hover:bg-base-100 text-base-content
          font-bold flex items-center justify-center gap-2 transition-all
          ${
            isPlanned
              ? "bg-success/10 text-success cursor-not-allowed border border-success/20"
              : "bg-base-300 hover:scale-102  cursor-pointer "
          }`}
      >
        {isPlanned ? (
          <>
            <CheckCircle2 size={18} />
            Planned
          </>
        ) : (
          <>
            <BellRing size={18} />
            Remind Me
          </>
        )}
      </button>
    </div>
  );
};

export default UpcomingContests;
