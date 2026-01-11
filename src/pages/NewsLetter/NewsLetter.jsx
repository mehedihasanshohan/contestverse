import React from 'react';
import { Send, Sparkles, Mail } from 'lucide-react';
import Swal from 'sweetalert2';

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      Swal.fire({
        title: 'Welcome to the Verse!',
        text: 'You’re now on the list for exclusive contest drops.',
        icon: 'success',
        confirmButtonColor: '#06b6d4',
      });
      e.target.reset();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-base-200 pb-24">
      <div className="relative overflow-hidden bg-base-100
      rounded-[3rem] p-8 md:p-16 shadow-sm border border-base-300">

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64
        h-64 bg-cyan-500/10 rounded-full blur-md -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div data-aos="fade-right">
            <div className="flex items-center gap-2 mb-4 text-cyan-600">
              <Sparkles size={20} className="animate-pulse" />
              <span className="font-bold uppercase tracking-widest text-sm">Stay Competitive</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Don't miss the <br />
              <span className="text-cyan-500 italic">next big prize.</span>
            </h2>
            <p className="mt-6 text-lg max-w-md opacity-70 leading-relaxed">
              Join <span className="font-bold text-base-content">5,000+ creators</span>
               getting weekly updates on high-stakes contests, winning tips, and platform news.
            </p>
          </div>

          {/* Form Content */}
          <div data-aos="fade-left" className="w-full">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-3 p-2
              bg-base-100 rounded-3xl shadow-inner border border-base-300"
            >
              <div className="flex-1 flex items-center gap-3 px-4 w-full">
                <Mail className="opacity-40" size={22} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent outline-none w-full py-4 text-base-content"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-600
                 text-base-300/90 rounded-2xl font-bold flex items-center justify-center gap-2
                  transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                Join Now
                <Send size={18} />
              </button>
            </form>
            <p className="mt-4 text-[11px] text-center sm:text-left opacity-40
            uppercase tracking-widest font-medium">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;