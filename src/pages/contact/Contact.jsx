import React, { useState } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


import heroBG from "../../assets/Images/contact/contact-page-banner.jpeg";

import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";

import API from "../../api/axios"; // 👈 axios instance

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await API.post("/inquiries", form);

      setSuccess("Your inquiry has been sent successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 2500);

      setForm({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      {/* <div
        className="contact-hero"
        style={{ backgroundImage: `url(${heroBG})` }}
      ></div> */}

      {/* CONTACT SECTION */}
      <div
        className="w-full relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBG})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[var(--foreground)]/70"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE — CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                Get In Touch
              </span>
            </div>

            <h2 className="font-clash text-4xl md:text-5xl font-semibold mb-4 leading-[1.05]">
              BUILD YOUR DREAMS, <span className="italic text-[var(--accent)]">WITH US</span>
            </h2>

            <p className="font-inter text-lg text-white/80 mb-8 max-w-xl">
              Contact CADMAX directly—no delays. Get clear communication, expert
              guidance, and personalized solutions straight from our team to
              bring your project to life with confidence.
            </p>

            <div className="h-[3px] w-24 bg-[var(--accent)] mb-10"></div>

            {/* PHONE */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-11 h-11 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                <FaPhoneAlt className="text-[var(--accent)] text-lg" />
              </div>
              <p className="font-inter text-lg font-semibold">0141-411-3111</p>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-11 h-11 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                <FaMapMarkerAlt className="text-[var(--accent)] text-lg" />
              </div>
              <p className="font-inter text-white/85 leading-relaxed max-w-lg">
                GROUND FLOOR-1,2,3 AND 302-3RD FLOOR, PRISM TOWER,  
                OPP. RAJASTHAN POLICE HEADQUARTER, LAL KOTHI SCHEME,  
                TONK ROAD, JAIPUR (RAJ.)
              </p>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                <FaEnvelope className="text-[var(--accent)] text-lg" />
              </div>
              <p className="font-inter text-lg font-semibold">
                cadmaxconsultancy@gmail.com
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE — FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-[var(--card)] rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mx-auto border border-[var(--border)]"
          >
            <h3 className="font-clash text-3xl font-semibold text-[var(--foreground)] mb-6">
              Get in <span className="italic text-[var(--accent)]">Touch</span>
            </h3>

            <form onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-[var(--accent)] font-inter text-[var(--foreground)]"
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-[var(--accent)] font-inter text-[var(--foreground)]"
              />

              {/* PHONE */}
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-[var(--accent)] font-inter text-[var(--foreground)]"
              />

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm mb-5 h-28 resize-none outline-none focus:ring-2 focus:ring-[var(--accent)] font-inter text-[var(--foreground)]"
              ></textarea>

              {/* SUCCESS / ERROR */}
              {success && (
                <p className="text-green-600 text-sm mb-3">{success}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm mb-3">{error}</p>
              )}

              {/* BUTTON */}
            <button
  type="submit"
  disabled={loading}
  className="w-full text-white font-semibold py-3 rounded-lg font-inter
  bg-[var(--foreground)]
  hover:bg-[var(--accent)] hover:text-[var(--foreground)]
  transition-all duration-300 disabled:opacity-60"
>
  {loading ? "SENDING..." : "SUBMIT"}
</button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* MAP SECTION */}
      <div className="contact-map w-full">
       <iframe
  title="office-location"
  src="https://www.google.com/maps?q=Pinncadmax%20Group&output=embed"
  className="w-full h-[400px] border-0"
  allowFullScreen
  loading="lazy"
></iframe>
      </div>

      <Footer />
    </>
  );
};

export default Contact;