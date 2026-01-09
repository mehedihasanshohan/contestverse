// "use client";
// import { motion } from "framer-motion";

// export function TextAnimate({
//   children,
//   animation = "fadeIn",
//   by = "word",
//   as: Component = "p",
//   className = ""
// }) {
//   const variants = {
//     fadeIn: {
//       hidden: { opacity: 0 },
//       visible: { opacity: 1, transition: { duration: 0.5 } },
//     },
//     slideUp: {
//       hidden: { opacity: 0, y: 20 },
//       visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     },
//   };

//   const segments = by === "line"
//     ? children.split("\n")
//     : by === "word"
//     ? children.split(" ")
//     : children.split("");

//   return (
//     <Component className={className}>
//       <motion.span
//         initial="hidden"
//         whileInView="visible" // এই লাইনটি আপনার সমস্যার সমাধান করবে
//         viewport={{ once: false, amount: 0.3 }} // যতবার ভিউপোর্টে আসবে ততবার এনিমেট হবে
//         variants={{
//           visible: { transition: { staggerChildren: 0.05 } },
//         }}
//       >
//         {segments.map((segment, index) => (
//           <motion.span
//             key={index}
//             variants={variants[animation]}
//             style={{ display: "inline-block", whiteSpace: "pre" }}
//           >
//             {segment}{by === "word" && index !== segments.length - 1 ? " " : ""}
//             {by === "line" && <br />}
//           </motion.span>
//         ))}
//       </motion.span>
//     </Component>
//   );
// }

"use client";
import { motion } from "framer-motion";

export function TextAnimate({
  children,
  animation = "fadeIn", // ডিফল্ট এনিমেশন
  variants, // ডেমো ফাইল থেকে পাঠানো কাস্টম ভেরিয়েন্ট
  by = "word",
  as: Component = "p",
  className = ""
}) {
  // এনিমেশন লাইব্রেরি
  const baseVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
    blurInUp: { // আপনার নেভিবারে যেটা ব্যবহার করেছেন
      hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    }
  };

  // যদি বাইরে থেকে ডেমো ভেরিয়েন্ট পাঠানো হয় তবে সেটা ইউজ হবে, নাহলে বেস ভেরিয়েন্ট
  const finalVariants = variants || baseVariants[animation];

  const segments = by === "line"
    ? children.split("\n")
    : by === "word"
    ? String(children).split(" ") // শিশুদের স্ট্রিং হিসেবে নিশ্চিত করা
    : String(children).split("");

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        animate="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {segments.map((segment, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={finalVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {segment}{by === "word" && index !== segments.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}