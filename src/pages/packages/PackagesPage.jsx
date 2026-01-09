import React, { useState } from "react";
import Swal from "sweetalert2";
import Title from "./../../components/Title";
import Subtitle from "../../components/Subtitle";
import { Check} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LuPackageOpen } from "react-icons/lu";

const Badge = ({ children, className = "" }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${className}`}>
    {children}
  </span>
);

const PackageCard = ({ pkg, onSelect, isSelected }) => {
  const isPro = pkg.name === "Pro";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      data-aos="fade-up"
      className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 flex flex-col justify-between
        ${isSelected ? "border-cyan-500 shadow-2xl bg-base-100" : "border-base-300 bg-base-100/50"}
        ${isPro ? "scale-105 z-10 border-cyan-600/50 shadow-xl" : ""}`}
    >
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
          Most Popular
        </div>
      )}

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${isPro ? "bg-cyan-600 text-white" : "bg-base-200 text-cyan-600"}`}>
            {pkg.icon}
          </div>
          <Badge className={isPro ? "border-cyan-600 text-cyan-600" : "border-base-content/20 text-base-content/50"}>
            {pkg.tier}
          </Badge>
        </div>

        <h3 className="font-title text-2xl font-black mb-1">{pkg.name}</h3>
        <p className="font-body text-sm text-base-content/60 mb-6">{pkg.subtitle}</p>

        <div className="mb-8">
          <span className="text-4xl font-black font-title">${pkg.price}</span>
          <span className="text-base-content/50 font-medium">/month</span>
        </div>

        <ul className="space-y-4 mb-8">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-body font-medium">
              <Check size={18} className="text-cyan-600 shrink-0" />
              <span className="text-base-content/80">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className={`w-full py-4 rounded-xl font-title font-bold transition-all
          ${isSelected
            ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
            : "bg-base-300 hover:bg-cyan-600"}`}
      >
        {isSelected ? "Plan Selected" : "Choose Plan"}
      </button>
    </motion.div>
  );
};

const PackagesPage = () => {
  const packages = [
    {
      name: "Starter",
      subtitle: "Ideal for individual creators starting their journey.",
      price: 9,
      tier: "Basic",
      icon: <LuPackageOpen size={24}></LuPackageOpen>,
      features: ["Post 3 contests/month", "Standard visibility", "Basic analytics", "Community support"],
    },
    {
      name: "Pro",
      subtitle: "The powerhouse for growing brands and experts.",
      price: 29,
      tier: "Premium",
      icon: <LuPackageOpen size={24}></LuPackageOpen>,
      features: ["Post 15 contests/month", "Featured placement", "Priority support", "Advanced analytics"],
    },
    {
      name: "Unlimited",
      subtitle: "For high-volume agencies and power players.",
      price: 99,
      tier: "Enterprise",
      icon: <LuPackageOpen size={24}></LuPackageOpen>,
      features: ["Unlimited contests", "White-label branding", "Dedicated manager", "API access"],
    },
  ];

  const [selected, setSelected] = useState(null);

  const handleCheckout = () => {
    Swal.fire({
      title: `<span class="font-title">Confirm Subscription</span>`,
      html: `<p class="font-body text-sm">You are subscribing to the <b>${selected.name}</b> plan for $${selected.price}/mo.</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891b2",
      confirmButtonText: "Confirm & Pay",
      background: document.documentElement.classList.contains("dark") ? "#1f1f23" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fafafa" : "#0a0a0a",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your plan has been activated.", "success");
        setSelected(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <Title>Scale Your <span className="text-cyan-600">Potential</span></Title>
          <Subtitle>
            Transparent pricing designed for creators of all sizes.
            <br className="hidden md:block" /> No hidden fees, just pure creativity.
          </Subtitle>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((p) => (
            <PackageCard
              key={p.name}
              pkg={p}
              onSelect={setSelected}
              isSelected={selected?.name === p.name}
            />
          ))}
        </div>

        {/* Selected Summary Sticky Bottom or Aside */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={selected ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          className="max-w-3xl mx-auto bg-base-100 border border-cyan-600/30 p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-600/10 rounded-xl text-cyan-600">
              {selected?.icon}
            </div>
            <div>
              <h4 className="font-title font-medium text-md leading-none">Selected: {selected?.name}</h4>
              <p className="font-body text-xs text-base-content/50 mt-1">Billed monthly. Cancel anytime.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-2xl font-black font-title">${selected?.price}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Total Amount</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn bg-cyan-600 hover:bg-cyan-700 border-none text-white px-8 rounded-xl font-title font-bold"
            >
              Checkout Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackagesPage;