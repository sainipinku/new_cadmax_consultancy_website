import "./Careerpath.css"
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer"
import { motion } from "framer-motion";


// import heroBGCareer from "../../../src/assets/Images/careerpath/HERO-BG.png";
import heroBGCareer from "../../../src/assets/Images/careerpath/banner-img.jpg";
import img1 from "../../../src/assets/Images/careerpath/development-img.jpg";
import img2 from "../../../src/assets/Images/careerpath/work-environment.jpg";
import img3 from "../../../src/assets/Images/careerpath/learning-and-development.jpeg"







const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};




const CareerPath = () => {
  
  return (
    <>
      <Navbar />

  <div className="relative w-full h-[420px] sm:h-[450px] md:h-[550px] xl:h-[650px] flex items-center justify-center overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroBGCareer})` }}
  ></div>

  {/* Overlay (Brightness Control) */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Hero Content */}
  <div className="relative z-10 text-center px-6">
    {/* Eyebrow */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
      <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
        Join Our Team
      </span>
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
    </div>
    <h1 className="font-clash text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
      Build Your <span className="italic text-[var(--accent)]">Career</span> <br />
      With Cadmax
    </h1>
  </div>

        
      
      </div>

      {/* CONTENT SECTION — FULL WIDTH BACKGROUND */}
      <div className="w-full bg-[var(--background)]">
        <div className="w-full max-w-7xl mx-auto px-6 py-20 space-y-28">

  {/* SECTION 1 */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="grid md:grid-cols-2 gap-12 items-center bg-[var(--card)]/70 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-elevated border border-[var(--border)]"
  >
    <div>
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-[var(--accent)]" />
        <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
          Section 01
        </span>
      </div>
      <h2 className="font-clash text-3xl md:text-4xl text-[var(--foreground)] font-semibold mb-5">
        Leadership & <span className="italic text-[var(--accent)]">Teamwork</span>
      </h2>

      <p className="font-inter text-[var(--muted-foreground)] leading-relaxed text-[15px] md:text-[16px]">
        1. Leadership - At Cadmax Consultancy, teamwork is our greatest strength. By combining diverse expertise, creative thinking, and coordinated collaboration, our team transforms ideas into well-planned, high-quality architectural solutions. Every project reflects our shared commitment to precision, efficiency, and excellence—proving that strong teamwork builds stronger designs and lasting success. We're committed to creating an equitable workplace. An inclusive environment improves our teams, our firm, and our community, while also enriching and challenging our thinking about design
      </p>
    </div>

    <motion.img
      src={img1}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl shadow-elevated border border-[var(--border)] hover:scale-105 transition duration-500"
    />
  </motion.div>

  {/* SECTION 2 */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="grid md:grid-cols-2 gap-12 items-center bg-[var(--card)]/70 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-elevated border border-[var(--border)]"
  >
    <motion.img
      src={img3}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl shadow-elevated border border-[var(--border)] hover:scale-105 transition duration-500"
    />

    <div>
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-[var(--accent)]" />
        <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
          Section 02
        </span>
      </div>
      <h2 className="font-clash text-3xl md:text-4xl text-[var(--foreground)] font-semibold mb-5">
        Learning & <span className="italic text-[var(--accent)]">Development</span>
      </h2>

      <p className="font-inter text-[var(--muted-foreground)] leading-relaxed text-[15px] md:text-[16px]">
        Learning & Development at Cadmax Consultancy is the driving force behind our creativity and innovation. We nurture a culture where ideas grow, skills evolve, and knowledge is constantly redefined. By investing in continuous learning, hands-on training, and the latest architectural tools and technologies, we empower our team to think beyond boundaries. This dedication to development allows us to craft intelligent, sustainable, and future-focused design solutions that add lasting value for our clients and the built environment.
      </p>
    </div>
  </motion.div>

  {/* SECTION 3 */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="grid md:grid-cols-2 gap-12 items-center bg-[var(--card)]/70 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-elevated border border-[var(--border)]"
  >
    <div>
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-[var(--accent)]" />
        <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
          Section 03
        </span>
      </div>
      <h2 className="font-clash text-3xl md:text-4xl text-[var(--foreground)] font-semibold mb-5">
        Work <span className="italic text-[var(--accent)]">Environment</span>
      </h2>

      <p className="font-inter text-[var(--muted-foreground)] leading-relaxed text-[15px] md:text-[16px]">
        Cadmax Consultancy provides a positive and inspiring work environment where creativity, collaboration, and professionalism thrive. We believe that a supportive workplace encourages innovation and excellence, allowing our team to perform at their best. Open communication, mutual respect, and teamwork form the core of our culture, while modern tools and well-structured processes ensure efficiency and growth. By fostering a healthy balance between learning and work, CADMAX Consultancy creates an environment where talent is valued, ideas are encouraged, and individuals grow along with the organization.
      </p>

    </div>

    <motion.img
      src={img2}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl shadow-elevated border border-[var(--border)] hover:scale-105 transition duration-500"
    />
  </motion.div>

        </div>
      </div>

      <Footer/>
    </>
  );
};

export default CareerPath;