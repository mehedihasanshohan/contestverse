import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-base-200 text-base-content w-full py-4 px-4 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center gap-4 text-[11px]
        md:text-sm font-bold uppercase tracking-widest"
      >
        <div className="flex items-center gap-1">
          <Sparkles size={14} className="animate-pulse text-amber-300" />
          <span>Big Drop: </span>
        </div>

        <p className="hidden md:block">
          New $1500 UI/UX Design Contest is now Live!
        </p>
        <p className="md:hidden">
          $1500 Contest Live Now!
        </p>

        <motion.a
          href="/all-contests"
          whileHover={{ x: 5 }}
          className="flex items-center gap-1 bg-white/20 px-3 py-0.5
          rounded-full hover:bg-white/30 transition-all border border-white/20"
        >
          Join Arena <ArrowRight size={12} />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;