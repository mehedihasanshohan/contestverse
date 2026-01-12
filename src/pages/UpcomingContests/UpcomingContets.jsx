import React, { useState, useEffect } from "react";
import { Trophy, BellRing, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import Subtitle from "../../components/Subtitle";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "../../components/Title";
import CountUp from "react-countup";

const UpcomingContests = () => {
  const [remindedIds, setRemindedIds] = useState([]);

  const upcomingData = [
    {
      id: "1",
      title: "Logo Design Sprint",
      type: "Image Design",
      targetDate: new Date("2026-02-20T10:00:00").getTime(),
      prize: "500",
      prefix: "$",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Next-Gen AI Article",
      type: "Article Writing",
      targetDate: new Date("2026-02-15T15:30:00").getTime(),
      prize: "300",
      prefix: "$",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Cyberpunk Review",
      type: "Gaming",
      targetDate: new Date("2026-02-12T12:00:00").getTime(),
      prize: "900",
      prefix: "$",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "React Performance",
      type: "Tech Blog",
      targetDate: new Date("2026-02-25T09:00:00").getTime(),
      prize: "450",
      prefix: "$",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop",
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
    <section className="max-w-7xl mx-auto px-6 py-20 bg-base-200 pb-24">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcomingData.map((contest) => (
          <motion.div
            key={contest.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <ContestCard
              contest={contest}
              isPlanned={remindedIds.includes(contest.id)}
              onReminder={() => handleReminder(contest.id, contest.title)}
            />
          </motion.div>
        ))}
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
      className={`group rounded-md overflow-hidden border transition-all duration-300 p-4 ${
        isPlanned
          ? "bg-base-300/30 shadow-none"
          : "bg-base-200 border-base-300 shadow-md hover:shadow-cyan-500/10"
      }`}
    >
      {/* Image Header */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={contest.image}
          alt={contest.title}
          className="w-full h-full object-cover rounded-md
          transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 bg-cyan-500 rounded uppercase tracking-widest">
          {contest.type}
        </span>
        {!isPlanned && (
          <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-error animate-ping"></div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 truncate">{contest.title}</h3>
        <p className="text-amber-500 font-semibold text-sm mb-4 flex items-center gap-1">
          <Trophy size={14} /> Prize:
          {contest.prefix && <span>{contest.prefix}</span>}
          <CountUp
            end={contest.prize}
            duration={5}
            enableScrollSpy={true}
            scrollSpyOnce={false}
          />
        </p>

        {/* Mini Timer */}
        <div className="grid grid-cols-4 gap-1 text-center mb-6 bg-base-100 p-2 rounded-lg border border-base-300">
          {timeLeft ? (
            Object.entries(timeLeft).map(([label, val]) => (
              <div key={label}>
                <p className="text-base font-mono font-bold leading-none">
                  {val}
                </p>
                <p className="text-[7px] uppercase opacity-60">{label}</p>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-xs font-bold text-primary animate-pulse uppercase">
              LIVE NOW
            </p>
          )}
        </div>

        <button
          onClick={onReminder}
          disabled={isPlanned}
          className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
            ${
              isPlanned
                ? "bg-success/10 text-success cursor-not-allowed border border-success/20"
                : "btn  cursor-pointer"
            }`}
        >
          {isPlanned ? (
            <>
              <CheckCircle2 size={18} /> Planned
            </>
          ) : (
            <>
              <BellRing size={18} /> Remind Me
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UpcomingContests;
