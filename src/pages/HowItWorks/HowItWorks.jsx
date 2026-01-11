// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Title from "../../components/Title";

const winner = "/assets/prize.png";
const compete = "/assets/quiz.png";
const register = "/assets/verify.png";

const HowItWorks = () => {
  const steps = [
    {
      title: "Register",
      icon: register,
      desc: "Join our global community of creators. Create your professional profile, verify your identity, and unlock access to high-stakes creative challenges across various categories.",
      tags: ["Quick Signup", "Profile Setup", "Identity Verification"],
    },
    {
      title: "Compete",
      icon: compete,
      desc: "Browse through active contests, pay the secure entry fee, and showcase your skills. Follow detailed instructions and submit your best work before the live countdown ends.",
      tags: ["Secure Payment", "Task Submission", "Live Countdown"],
    },
    {
      title: "Win",
      icon: winner,
      desc: "Get reviewed by industry experts or creators. If your work stands out, you'll be declared the champion, bag the grand prize money, and earn your place on the leaderboard.",
      tags: ["Expert Review", "Instant Payout", "Winner Badge"],
    },
  ];

  return (
    <section className="py-20 bg-base-200 text-base-content pt-16 pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title>
            How It <span className="text-cyan-600">Works</span>
          </Title>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 3, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
              className="relative group p-10 rounded-3xl bg-base-100 shadow-xl
              border border-base-300 transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cyan-500/5 opacity-0
              group-hover:opacity-100 blur-3xl transition-opacity rounded-full"
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Image Icon */}
                <div
                  className="mb-8 transform group-hover:scale-110
                group-hover:-rotate-6 transition-transform duration-500 inline-block"
                >
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-24 h-24 object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-2xl font-black mb-4 italic uppercase tracking-tighter
                 text-base-content"
                >
                  {step.title}
                </h3>

                <p className="opacity-75 text-base leading-relaxed mb-8 grow">
                  {step.desc}
                </p>

                {/* Feature Tags to add weight */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {step.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase font-bold px-3 py-1
                       bg-cyan-500/10 text-cyan-600 rounded-full border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-6 -right-4 w-16 h-16
                 bg-cyan-600 text-white flex items-center justify-center
                 font-black text-2xl rounded-2xl rotate-12 group-hover:rotate-0
                  transition-all duration-500 shadow-lg border-4 border-base-100">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
