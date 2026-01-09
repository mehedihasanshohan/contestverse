/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { User, MessageCircle, ShieldCheck, Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from "../../components/Title";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Captcha Check
    if (data.captcha.trim().toLowerCase() !== "human") {
      toast.error("Captcha failed. Type 'human' correctly.");
      return;
    }

    const loadingToast = toast.loading("Sending message...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully!", { id: loadingToast });
      reset();
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <section className="py-12 bg-base-200 text-base-content px-6 grid lg:grid-cols-2 gap-6">
      {/* Left Side */}
      <div
        className="space-y-6 rounded-md p-4 relative z-20 border border-white/20"
        data-aos="fade-left"
        data-aos-duration="2000"
      >
        <Title>Find US</Title>
        <div className="mt-4">
          <iframe
            title="Google Map"
            className="w-full h-96 rounded-md border"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301!2d90.3910801!3d23.7508672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55d1b33b%3A0x2f648710bc648a3d!2sPanthapath%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Right Side Form */}
      <div
        className="space-y-6 rounded-md p-6 relative z-20 border border-white/20"
      >
        <Title>Send Us Message</Title>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-cyan-700" size={20} />
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              data-aos="fade-left"
              data-aos-duration="1000"
              className="w-full pl-10 p-3 rounded-md border border-base-300 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-cyan-700" size={20} />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              data-aos="fade-left"
              data-aos-duration="1300"
              className="w-full pl-10 p-3 rounded-md border border-base-300 focus:outline-none"
            />
          </div>

          <div className="relative">
            <ShieldCheck
              className="absolute left-3 top-3 text-cyan-700"
              size={20}
            />
            <input
              {...register("captcha", { required: true })}
              type="text"
              placeholder="Type 'human' "
              data-aos="fade-left"
        data-aos-duration="1600"
              className="w-full pl-10 p-3 rounded-md border border-base-300 focus:outline-none "
            />
          </div>

          <div className="relative">
            <MessageCircle
              className="absolute left-3 top-3 text-cyan-700"
              size={20}
            />
            <textarea
              {...register("message", { required: true })}
              placeholder="Your Message"
              rows="4"
              data-aos="fade-left"
        data-aos-duration="1900"
              className="w-full pl-10 p-3 rounded-md border border-base-300 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-base-300  cursor-pointer mt-4

            border-base-300 font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
