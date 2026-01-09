import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Trophy,
  Terminal,
  Sparkles,
  Zap,
} from "lucide-react";
import { TextAnimate } from "../../components/text-animate";
import Title from "./../../components/Title";
import Subtitle from "../../components/Subtitle";

const Guidelines = () => {
  // const rules = [
  //   {
  //     title: "Participation Rules",
  //     icon: <CheckCircle className="text-green-500" />,
  //     content: "Users must be registered and logged in to participate. Each contest requires a specific entry fee which is non-refundable once the task is submitted."
  //   },
  //   {
  //     title: "Submission Standards",
  //     icon: <Terminal className="text-cyan-500" />,
  //     content: "All submissions must be original work. For design contests, high-resolution files (PNG/JPG/SVG) are required. For writing, plagiarism must be below 5%."
  //   },
  //   {
  //     title: "Winner Selection",
  //     icon: <Trophy className="text-yellow-500" />,
  //     content: "Creators evaluate submissions based on creativity, technical skill, and adherence to instructions. Decisions made by the Contest Creator are final."
  //   },
  //   {
  //     title: "Prohibited Content",
  //     icon: <AlertTriangle className="text-red-500" />,
  //     content: "Submission of copyrighted, offensive, or low-effort AI-generated content without disclosure will lead to immediate disqualification and account ban."
  //   }
  // ];

  const rules = [
    {
      title: "Participation & Eligibility",
      icon: <CheckCircle className="text-green-500" />,
      content:
        "To maintain competitive integrity, participants must verify  their identity and be at least 18 years old. Each contest has a unique entry protocol: you must pay the designated non-refundable entry fee before accessing the submission portal. Multiple entries are allowed only if specified in the contest brief, but each requires a separate participation confirmation.",
    },
    {
      title: "Technical Submission Standards",
      icon: <Terminal className="text-cyan-500" />,
      content:
        "We accept high-quality deliverables only. For visual designs, submissions must include high-resolution source files (SVG, AI, or PSD) along with standard previews (PNG/JPG). Content-based entries must maintain a plagiarism score of less than 5%, verified through our internal scanners. All files must be hosted on approved secure cloud platforms (Google Drive/GitHub) with public 'view-only' access.",
    },
    {
      title: "Fair Winner Selection Process",
      icon: <Trophy className="text-yellow-500" />,
      content:
        "The selection process is governed by a merit-based system. Contest Creators evaluate submissions based on four key metrics: Innovation, Technical Complexity, Adherence to the Brief, and Scalability. While the Creator has the final authority to pick a winner, our platform's automated 'Dispute System' remains active for 48 hours post-declaration to ensure no unethical practices occurred.",
    },
    {
      title: "Anti-Fraud & Content Ethics",
      icon: <AlertTriangle className="text-red-500" />,
      content:
        "ContestVerse maintains a zero-tolerance policy towards intellectual property theft. The use of generative AI tools is strictly prohibited unless the contest brief explicitly allows it. Submitting copyrighted material, low-effort templates, or offensive content will trigger an immediate permanent ban on your account and forfeiture of all accumulated earnings and entry fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20" data-aos="fade-down">
          <div className="flex justify-center mb-4">
            <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-sm font-semibold">
              <Sparkles size={16} /> Official Handbook
            </span>
          </div>
          <Title>Platform Guidelines</Title>
          <Subtitle>
            Welcome to ContestHub. To maintain a fair and creative environment,
            please adhere to our core competitive protocols.
          </Subtitle>
        </div>

        {/* 2-Column Grid for Core Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300/10 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={100} />
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-base-200 rounded-xl group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all duration-300">
                  {rule.icon}
                </div>
                <h3 className="text-2xl font-bold text-base-content/80">
                  {rule.title}
                </h3>
              </div>

              <div className="text-base-content/60 leading-relaxed">
                <TextAnimate animation="fadeIn" by="word" className="text-base">
                  {rule.content}
                </TextAnimate>
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-Step Submission Guide */}
        <div
          className="bg-base-100 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-base-300/20 mb-20 relative overflow-hidden"
          data-aos="zoom-in"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>

          <h2 className="text-3xl font-bold text-base-content/80 mb-10 flex items-center gap-3">
            <BookOpen className="text-cyan-600" /> Submission Workflow
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Join Contest",
                desc: "Register and pay the entry fee to unlock submission access.",
              },
              {
                step: "02",
                title: "Cloud Upload",
                desc: "Upload your files to Drive/GitHub and ensure the link is public.",
              },
              {
                step: "03",
                title: "Submit Link",
                desc: "Paste your link into the submission modal before the deadline.",
              },
            ].map((item, i) => (
              <div key={i} className="relative space-y-3">
                <div className="text-5xl font-black text-cyan-600/10 absolute -top-6 -left-2">
                  {item.step}
                </div>
                <h4 className="font-bold text-xl text-base-content/80 relative z-10">
                  {item.title}
                </h4>
                <p className="text-base-content/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-4" data-aos="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content/80 flex justify-center items-center gap-3">
              <HelpCircle className="text-cyan-600" /> FAQ
            </h2>
          </div>

          <div className="collapse collapse-plus bg-base-100 border border-base-300/20 rounded-2xl shadow-sm">
            <input type="radio" name="guideline-faq" defaultChecked />
            <div className="collapse-title text-lg font-semibold text-base-content/80">
              When will the prize money be distributed?
            </div>
            <div className="collapse-content text-base-content/50 text-sm">
              <p>
                Prize money is processed within 48 hours after the Contest
                Creator officially declares the winner. Funds are sent directly
                to your linked account.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-100 border border-base-300/20 rounded-2xl shadow-sm">
            <input type="radio" name="guideline-faq" />
            <div className="collapse-title text-lg font-semibold text-base-content/80">
              Can I participate in multiple contests?
            </div>
            <div className="collapse-content text-base-content/50 text-sm">
              <p>
                Absolutely! You can participate in as many active contests as
                you like, provided you meet the individual requirements for
                each.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
