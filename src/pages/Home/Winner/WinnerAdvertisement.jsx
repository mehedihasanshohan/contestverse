import { Link } from "react-router";
import CountUp from "react-countup";
import { Trophy, Star, DollarSign, ArrowRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "./../../../components/Title";
import Subtitle from "./../../../components/Subtitle";

const WinnerAdvertisement = () => {
  const winners = [
    {
      name: "Hamza Rahman",
      contest: "GTA-5 Gaming Contest",
      prize: "900",
      prefix: "$",
      img: "https://i.ibb.co.com/prLfHpCM/received-2073722346231746.jpg",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Mehedi Hassan",
      contest: "Logo Design Contest",
      prize: "500",
      prefix: "$",
      img: "https://i.ibb.co.com/RTH96Jbd/IMG-20210123-132734-1.jpg",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Abu Hurayra",
      contest: "Article Writing Contest",
      prize: "800",
      prefix: "$",
      img: "https://i.ibb.co.com/jkrxF69H/received-2050816975188950.jpg",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="bg-base-200 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Title>
            Our Pride <span className="text-cyan-600">Winners</span>
          </Title>
          <Subtitle>
            Celebrating the brilliant minds who conquered our challenges this
            month
          </Subtitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-2xl md:text-3xl font-title text-base-content">
              Success Stories <br />
              <span className="text-xl md:text-2xl opacity-70">
                Starts Right Here!
              </span>
            </h2>
            <p className="mt-6 text-lg font-body text-base-content/70 leading-relaxed">
              Every month thousands of creative users participate, compete, and
              win exciting prizes. Your talent deserves a stage, and we provide
              exactly that.
            </p>

            {/* Premium Stats Grid */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Winners",
                  val: "120",
                  suffix: "+",
                  icon: <Trophy size={16} />,
                },
                {
                  label: "Prize Given",
                  val: "25",
                  suffix: "k+",
                  prefix: "$",
                  icon: <DollarSign size={16} />,
                },
                {
                  label: "User Rating",
                  val: "4.9",
                  suffix: "★",
                  icon: <Star size={16} />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-base-100 border border-base-300 p-4 rounded-md shadow-xl"
                >
                  <div className="text-cyan-600 mb-1">{stat.icon}</div>
                  <h3 className="text-2xl font-title font-black text-base-content">
                    <CountUp
                      end={stat.val}
                      duration={8}
                      enableScrollSpy={true}
                      scrollSpyOnce={false}
                    />
                    {stat.suffix && <span>{stat.suffix}</span>}

                    {/* {stat.val} */}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/all-contests">
              <button className="group btn btn-lg mt-10 bg-cyan-600 hover:bg-cyan-700 border-none text-white rounded-2xl px-8 font-title shadow-lg shadow-cyan-600/20">
                Participate Now{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full"></div>

            {winners.map((winner, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 20 }}
                data-aos="fade-left"
                data-aos-delay={index * 200}
                className="group bg-base-100 rounded-3xl p-1 shadow-2xl border border-base-300/50"
              >
                <div className="bg-base-100 rounded-[1.4rem] p-5 flex items-center gap-6">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-linear-to-tr ${winner.color}
                      rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity`}
                    ></div>
                    <img
                      src={winner.img}
                      alt={winner.name}
                      className="relative w-20 h-20 rounded-full object-cover border-2 border-base-200"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 bg-linear-to-tr ${winner.color}
                       p-1.5 rounded-full text-white shadow-lg`}
                    >
                      <Trophy size={12} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-title font-bold text-base-content">
                      {winner.name}
                    </h4>
                    <p className="text-base-content/60 text-sm font-body">
                      {winner.contest}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-md font-black px-3 py-1 rounded-full bg-linear-to-r ${winner.color} text-white`}
                      >
                        {winner.prefix && <span>{winner.prefix}</span>}
                        <CountUp
                          end={winner.prize}
                          duration={5}
                          enableScrollSpy={true}
                          scrollSpyOnce={false}
                        />
                        {/* {winner.prize} Prize */}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity mr-4">
                    <ArrowRight className="text-cyan-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
