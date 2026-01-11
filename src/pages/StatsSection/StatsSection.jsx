import CountUp from "react-countup";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "../../components/Title";

const StatsSection = () => {
  const stats = [
    {
      label: "Contests Created",
      value: 1200,
      suffix: "+",
      color: "text-blue-500",
    },
    {
      label: "Contests Completed",
      value: 950,
      suffix: "",
      color: "text-green-500",
    },
    {
      label: "Active Participants",
      value: 156,
      suffix: "K+",
      color: "text-purple-500",
    },
    {
      label: "Prize Pool",
      value: 50,
      suffix: "K+",
      prefix: "$",
      color: "text-amber-500",
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto pt-4 bg-base-200 overflow-hidden pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title>More Stats</Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-base-200 border-y-4 border-primary/20
          py-10 px-6 flex flex-wrap justify-around items-center gap-8
          md:rounded-full shadow-inner mt-12"
      >
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center  group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`text-4xl md:text-5xl font-black
                 ${stat.color} mb-2 flex items-center justify-center`}
            >
              {stat.prefix && <span>{stat.prefix}</span>}
              <CountUp
                end={stat.value}
                duration={3}
                enableScrollSpy={true}
                scrollSpyOnce={false}
              />
              {stat.suffix && <span>{stat.suffix}</span>}
            </motion.div>
            <p
              className="text-sm md:text-base font-bold uppercase tracking-widest
               opacity-60 group-hover:opacity-100 transition-opacity"
            >
              {stat.label}
            </p>

            {index !== stats.length - 1 && (
              <div
                className="hidden lg:block h-10 w-0.5 bg-gray-300 absolute
                 -right-4 top-1/2 -translate-y-1/2 opacity-30"
              />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
