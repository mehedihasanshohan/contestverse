import React, { useState } from "react";
import Swal from "sweetalert2";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800">
      {children}
    </span>
  );
}

function PackageCard({ pkg, onSelect }) {
  return (
    <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{pkg.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{pkg.subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${pkg.price}</div>
          <div className="text-sm text-gray-500">/ month</div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-800/80 inline-block" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <Badge>{pkg.tier}</Badge>
        <button
          onClick={() => onSelect(pkg)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Choose
        </button>
      </div>
    </div>
  );
}

const PackagesPage = () => {
  const packages = [
    {
      name: "Starter",
      subtitle: "Perfect for new creators",
      price: 9,
      tier: "Basic",
      features: ["Post 3 contests/month", "Basic analytics", "Community support"],
    },
    {
      name: "Pro",
      subtitle: "Most popular",
      price: 29,
      tier: "Popular",
      features: ["Post 15 contests/month", "Priority support", "Advanced analytics"],
    },
    {
      name: "Unlimited",
      subtitle: "For agencies & power users",
      price: 99,
      tier: "Enterprise",
      features: ["Unlimited contests", "Dedicated manager", "White-label options"],
    },
  ];

  const [selected, setSelected] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true); // initially disabled

  const handleCategoryChoise = () => {
    Swal.fire({
      title: "Thanks for choosing a plan",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });

    // After alert, make button disabled again
    setBtnDisabled(true);
    setSelected(null);
  };

  // Enable button when any plan is selected
  const handleSelectPlan = (plan) => {
    setSelected(plan);
    setBtnDisabled(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl text-center font-extrabold">
            Choose a plan that fits your contests
          </h1>
        </div>
        <div className="text-sm text-gray-600">
          Need help? <a className="underline cursor-pointer">Contact Sales</a>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((p) => (
          <PackageCard key={p.name} pkg={p} onSelect={handleSelectPlan} />
        ))}
      </section>

      <aside className="mt-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <h3 className="font-semibold">Selected Plan</h3>
        {selected ? (
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-medium">{selected.name}</div>
              <div className="text-sm text-gray-500">{selected.subtitle}</div>
            </div>
            <div className="text-lg font-bold">${selected.price}/mo</div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-2">No plan selected yet.</div>
        )}
      </aside>

      <div className="mt-8 text-right">
        <button
          onClick={handleCategoryChoise}
          disabled={btnDisabled}
          className={`px-5 py-2 rounded-lg text-white transition
            ${btnDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"}
          `}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default PackagesPage;
