import React, { useState, useMemo, useEffect } from "react";
import {
  Book,
  PlayCircle,
  FileText,
  Download,
  Bookmark,
  ArrowUpRight,
  Filter,
  Search,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import AOS from "aos";
import "aos/dist/aos.css";

// Reusable Badge Component
const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    video: "bg-red-500/10 text-red-600 border-red-500/20",
    template: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const ResourcesPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // AOS Initialize
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const resources = [
    {
      id: 1,
      title: "Mastering Contest Psychology: Why Some Briefs Get 10x More Entries",
      type: "Articles",
      length: "8 min read",
      icon: <Book size={20} className="text-cyan-500" />,
      desc: "An in-depth analysis of high-performing contests. Learn how to word your requirements to attract top-tier global talent.",
      tags: ["Strategy", "Psychology"],
      variant: "default",
    },
    {
      id: 2,
      title: "The Ultimate Brand Identity Handover Kit (Pro Edition)",
      type: "Templates",
      length: "45MB Download",
      icon: <Download size={20} className="text-amber-500" />,
      desc: "Ready-to-use professional templates for brand guidelines, asset handovers, and copyright transfer agreements.",
      tags: ["Legal", "Assets"],
      variant: "template",
    },
    {
      id: 3,
      title: "Video: Advanced UI/UX Judging Metrics for Modern Creators",
      type: "Masterclasses",
      length: "18 min video",
      icon: <PlayCircle size={20} className="text-red-500" />,
      desc: "Stop picking winners based on 'gut feeling'. Use our data-driven scorecard to evaluate accessibility and hierarchy.",
      tags: ["Judging", "UI/UX"],
      variant: "video",
    },
    {
      id: 4,
      title: "Plagiarism & AI Disclosure: The 2026 Ethical Framework",
      type: "Articles",
      length: "5 min read",
      icon: <FileText size={20} className="text-purple-500" />,
      desc: "Stay ahead of the curve. Understanding how to differentiate between high-effort human design and low-effort AI clones.",
      tags: ["Ethics", "AI"],
      variant: "default",
    },
  ];

  // Filter Handler
  const handleFilterChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  // Filtered Data
  const filteredResources = useMemo(() => {
    if (selectedFilters.length === 0) return resources;
    return resources.filter((r) => selectedFilters.includes(r.type));
  }, [selectedFilters]);

  return (
    <div className="min-h-screen bg-base-200/50 py-16 px-6 font-body">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <Title>
          Resource <span className="text-cyan-600">Archive</span>
        </Title>
        <Subtitle>
          Premium guides and industrial-grade templates engineered to help you
          launch, manage, and win high-stakes contests.
        </Subtitle>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-72 space-y-6" data-aos="fade-right">
          <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-300/50">
            <h4 className="font-title font-bold text-lg mb-6 flex items-center gap-2 text-base-content">
              <Filter size={18} className="text-cyan-600" /> Filter Content
            </h4>
            <div className="space-y-4">
              {["Articles", "Masterclasses", "Templates"].map((label) => (
                <label
                  key={label}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(label)}
                    onChange={() => handleFilterChange(label)}
                    className="checkbox checkbox-cyan checkbox-sm rounded-md transition-all"
                  />
                  <span
                    className={`text-sm font-medium transition-colors ${
                      selectedFilters.includes(label)
                        ? "text-cyan-600"
                        : "text-base-content/70 group-hover:text-cyan-600"
                    }`}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>

            {selectedFilters.length > 0 && (
              <button
                onClick={() => setSelectedFilters([])}
                className="mt-6 text-xs font-bold text-red-500 hover:text-red-600 transition-all flex items-center gap-1 mx-auto"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Request Card */}
          <div className="bg-linear-to-br from-cyan-600 to-blue-700 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-title font-bold text-lg mb-2 text-white">
                Request Guide
              </h4>
              <p className="text-white/80 text-xs mb-4">
                Can't find what you need? Our experts will write it for you.
              </p>
              <button className="btn btn-sm bg-white/20 hover:bg-white/30 border-none text-white rounded-lg px-4">
                Request Now
              </button>
            </div>
            <Search className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </aside>

        {/* Main content - Grid Layout */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResources.length > 0 ? (
                // eslint-disable-next-line no-unused-vars
                filteredResources.map((r, i) => (
                  <motion.article
                    layout
                    key={r.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-300/30 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-base-200 rounded-2xl group-hover:bg-cyan-500/10 transition-colors">
                          {r.icon}
                        </div>
                        <div className="flex gap-2">
                          {r.tags.map((t) => (
                            <Badge key={t} variant={r.variant}>
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-title font-bold text-xl mb-3 text-base-content/90 leading-tight group-hover:text-cyan-600 transition-colors">
                        {r.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-base-content/40 mb-4 font-body">
                        <span>{r.type}</span>
                        <span className="w-1 h-1 bg-base-content/20 rounded-full"></span>
                        <span>{r.length}</span>
                      </div>

                      <p className="text-sm text-base-content/50 leading-relaxed line-clamp-3">
                        {r.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-base-200 flex items-center justify-between">
                      <button className="flex items-center gap-2 font-bold text-sm text-cyan-600 hover:gap-3 transition-all font-title">
                        Access Resource <ArrowUpRight size={16} />
                      </button>
                      <button className="p-2 hover:bg-base-200 rounded-full transition-colors text-base-content/40">
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-24 text-center"
                >
                  <p className="font-title text-xl text-base-content/40">
                    No resources match your selection.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <footer className="mt-20 text-center border-t border-base-300 pt-10">
        <p className="text-sm text-base-content/40 font-medium">
          Content is updated weekly. Subscribe to our{" "}
          <span className="text-cyan-600 cursor-pointer hover:underline font-bold">Newsletter</span> for early access.
        </p>
      </footer>
    </div>
  );
};

export default ResourcesPage;