// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-white/5 p-12 md:p-20 rounded-[40px] text-center shadow-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6"
          >
            Limited Slots Available
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
            READY TO <span className="text-primary italic">DOMINATE</span> <br />
            THE NEXT CONTEST?
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join 5,000+ creators and participants already winning big.
            Stop watching from the sidelines and enter the arena today.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, -1, 0],
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-primary text-black font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(var(--p),0.4)] transition-all hover:shadow-primary/60"
            >
              GET STARTED NOW
            </motion.button>

            <button className="px-12 py-5 border-2 border-white/10 text-white font-bold text-xl rounded-2xl hover:bg-white/5 transition-colors">
              VIEW SCHEDULE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;