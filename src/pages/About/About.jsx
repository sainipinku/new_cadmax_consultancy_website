import { useRef, useState } from "react";
import './About.css';
import AboutSlider from "../../components/common/slider/AboutSlider";
import Navbar from '../../components/Layout/Header/Navbar';
import Footer from '../../components/Layout/Footer/Footer';

import heroBG from "../../../src/assets/Images/about/About-hero-bg.jpg";
// import storyImage from "../../../src/assets/Images/about/ourstory-img.jpg";
import awardimg from "../../assets/Images/about/md-sir-image.jpeg"

import img4 from "../../assets/Images/about/our-team.jpg"

// mamber image 
import m1 from "../../assets/Images/about/member-1.jpg";
import m2 from "../../assets/Images/about/member-2.jpg";
import m3 from "../../assets/Images/about/member-3.jpg";
import m4 from "../../assets/Images/about/member-4.jpg";
import m5 from "../../assets/Images/about/member-5.jpg";
import m6 from "../../assets/Images/about/member-6.jpg";
import m7 from "../../assets/Images/about/member-7.jpg";
import m8 from "../../assets/Images/about/member-8.jpg";
import m9 from "../../assets/Images/about/member-9.jpg";
import m10 from "../../assets/Images/about/member-10.jpg";
import m11 from "../../assets/Images/about/member-11.jpg";

import svg1 from "../../../src/assets/Images/about/Frame-35.png";
import svg2 from "../../../src/assets/Images/about/Frame-36.png";
import svg3 from "../../../src/assets/Images/about/Frame-37.png";
import svg4 from "../../../src/assets/Images/about/Frame-38.png";


const members = [
 { img: m1, name: "Mr. HANUMAN SHARMA", role: "CHAIRMAN" },
 { img: m2, name: "Ms. KIRAN SHARMA", role: " DIRECTOR  " },
 { img: m3, name: "Mr. RAMDAYAL SHARMA ", role: "ADMIN MANAGER " },
 { img: m4, name: "Mr. BABU LAL SHARMA ", role: "C.E.O " },
 { img: m5, name: "Mr. MUKESH SAINI", role: "PLANNING MANAGER" },
 { img: m6, name: "Mr. KUNDAN SHARMA ", role: "SURVEY MANAGER" },
 { img: m7, name: "Mr. NITESH SHARMA ", role: "ENGINEERING MANAGER" },
 { img: m8, name: "Mr. RICHHPAL SINGH ", role: "DRAWING MANAGER" },
 { img: m9, name: "Mr. RAMCHARAN SHARMA ", role: "ACCOUNTS MANAGER" },
 { img: m10, name:"Mr. RAKESH GUPTA ", role: "LEGAL ADVISIOR" },
 { img: m11, name:"Mr. JAGDISH MATHUR ", role: "LEGAL ADVISIOR" }
]; 




const About = () => {

  const sliderRef = useRef(null);
const [isDown, setIsDown] = useState(false);
const [startX, setStartX] = useState(0);
const [scrollLeft, setScrollLeft] = useState(0);

const handleMouseDown = (e) => {
  setIsDown(true);
  setStartX(e.pageX - sliderRef.current.offsetLeft);
  setScrollLeft(sliderRef.current.scrollLeft);
};

const handleMouseLeave = () => setIsDown(false);
const handleMouseUp = () => setIsDown(false);

const handleMouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - sliderRef.current.offsetLeft;
  const walk = (x - startX) * 2;
  sliderRef.current.scrollLeft = scrollLeft - walk;
};
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="about-hero" style={{ backgroundImage: `url(${heroBG})` }}></div>

      {/* Company Overview — dark section matching Home theme */}
      <div className="relative py-24 bg-[var(--foreground)] overflow-hidden">
        {/* Decorative accent glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              Company Overview
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>

          <h2 className="text-center font-clash text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
            About <span className="italic text-[var(--accent)]">Cadmax</span>
          </h2>

          <p className="max-w-5xl mx-auto text-center font-inter text-white/80 text-base md:text-lg leading-relaxed">
            At CADMAX Consultancy, we specialize in architectural design, planning, and consultancy services for residential, commercial, and industrial projects. Our experienced team combines advanced CAD technology with thoughtful design to bring ideas to life. We build trust before we build structures. That's the CadMax difference.Customers choose CadMax because we turn complex ideas into precise, buildable designs—on time, every time.CadMax: Where accuracy meets creativity. Trusted by clients who value quality, innovation, and flawless execution.We don't just design spaces—CadMax designs solutions. That's why clients trust us to deliver excellence from concept to completion.CadMax stands out for our attention to detail, advanced CAD technology, and commitment to client satisfaction.From 2D to 3D perfection—customers choose CadMax for designs that are accurate, clear, and construction-ready.
          </p>
        </div>
      </div>

      {/* award section — matching Home AboutSection theme */}
      <div className="relative py-24 md:py-32 bg-[var(--secondary)] overflow-hidden">
        {/* Decorative */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                Our Leadership
              </span>
            </div>

            <h2 className="font-clash text-section text-[var(--foreground)] leading-tight mb-6">
              Inspiring Leadership,<br />
              <span className="text-[var(--muted-foreground)]">Remarkable Achievements</span>
            </h2>

            <p className="text-[var(--muted-foreground)] font-inter text-base leading-relaxed mb-3">
              It is truly commendable that Mr. Hanuman Sahay Sharma, chairman of  Cadmax, has achieved numerous milestones through his dedication, perseverance, and visionary approach. His consistent efforts and leadership have played a key role in the growth and success of the organization. With a strong commitment to excellence and innovation, he has inspired many professionals and students alike. His achievements reflect not only personal success but also his positive impact on the industry, making him a respected and motivating leader.
            </p>

            <p className="font-general font-semibold text-[var(--foreground)]">
              A Journey of Vision, Dedication, and Success <br /> Driven by innovation, guided by experience, and built on trust.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <img
                src={awardimg}
                alt="About Cadmac Consultancy"
                className="w-full max-w-md h-[480px] rounded-2xl shadow-elevated object-cover border border-[var(--border)]"
              />
              {/* Accent border frame */}
              <div className="pointer-events-none absolute -inset-3 border border-[var(--accent)]/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <AboutSlider />

      {/* TOP LEADERS */}
      <div className="relative py-10 bg-[var(--background)]">
        <div className="text-center my-16">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              Meet The Team
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
            OUR CREATIVE <span className="italic text-[var(--accent)]">LEADERS</span>
          </h2>
          {/* Decorative Line */}
          <div className="w-[80px] h-[2px] bg-[var(--accent)] mx-auto mt-6"></div>
        </div>

        <div className="max-w-[900px] mx-auto px-5 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
          {members.slice(0, 2).map((member, index) => (
            <div
              key={index}
              className="bg-[var(--card)] rounded-2xl overflow-hidden shadow-elevated border border-[var(--border)] group transition duration-500 hover:-translate-y-2 hover:border-[var(--accent)]/50"
            >
              <div className="h-[360px] overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="text-center py-5 px-4 bg-[var(--card)]">
                <h3 className="font-clash text-lg font-semibold text-[var(--foreground)] tracking-wide whitespace-normal break-words">
                  {member.name}
                </h3>

                <p className="font-general text-sm font-semibold text-[var(--accent)] mt-1 tracking-wider uppercase whitespace-normal break-words">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Member Slider */}
        <div className="w-full py-10 bg-[var(--secondary)] overflow-hidden">
          <div
            ref={sliderRef}
            className="
              flex 
              gap-4 sm:gap-6 md:gap-8 lg:gap-10
              overflow-x-auto overflow-y-hidden
              cursor-grab active:cursor-grabbing
              animate-scroll hover:[animation-play-state:paused]
              scrollbar-hide
              px-4
            "
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {[...members.slice(2), ...members.slice(2)].map((member, index) => (
              <div
                key={index}
                className="
                  flex-shrink-0
                  w-[260px] 
                  sm:w-[280px] 
                  md:w-[300px] 
                  lg:w-[320px]
                  bg-[var(--card)] rounded-xl overflow-hidden 
                  shadow-lg border border-[var(--border)]
                  group transition duration-500 hover:-translate-y-2 hover:border-[var(--accent)]/50
                "
              >
                <div className="h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px] overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="text-center py-4 px-3 bg-[var(--card)]">
                  <h3 className="font-clash text-base sm:text-lg font-semibold text-[var(--foreground)]">
                    {member.name}
                  </h3>

                  <p className="font-general text-xs sm:text-sm font-semibold text-[var(--accent)] mt-1 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OUR CORE TEAM */}
      <div className="relative py-16 bg-[var(--background)]">

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-center my-16">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                The People Behind
              </span>
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
            </div>
            <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
              OUR CORE <span className="italic text-[var(--accent)]">TEAM</span>
            </h2>
            {/* Decorative Line */}
            <div className="w-[120px] h-[2px] bg-[var(--accent)] mx-auto mt-6"></div>
          </div>

          {/* Image Card */}
          <div className="relative group overflow-hidden rounded-2xl shadow-elevated border border-[var(--border)]">
            <img 
              src={img4} 
              alt="mahadev market"
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* OUR CORE VALUES */}
      <div className="values-section bg-[var(--secondary)] py-20">
        <div className="text-center my-16">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              What Drives Us
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
            OUR CORE <span className="italic text-[var(--accent)]">VALUES</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="values-grid">

            <div className="value-box">
              <img src={svg1} className="value-icon" alt='' />
              <h5>INNOVATION</h5>
              <p>Innovation drives the architectural vision of CADMAX Consultancy. We integrate creative design thinking with advanced architectural technologies to produce functional, sustainable, and visually striking spaces</p>
            </div>

            <div className="value-box">
              <img src={svg2} className="value-icon" alt='' />
              <h5>EXCELLENCE</h5>
              <p>Excellence is reflected in every stage of our architectural process—from concept development to project completion..</p>
            </div>

            <div className="value-box">
              <img src={svg3} className="value-icon" alt='' />
              <h5>INTEGRITY</h5>
              <p>CADMAX Consultancy maintains clear communication, realistic commitments, and compliance with all regulatory standards. We build lasting relationships with clients, consultants, and contractors based on trust and mutual respect.</p>
            </div>

            <div className="value-box">
              <img src={svg4} className="value-icon" alt='' />
              <h5>RESPONSIBILITY</h5>
              <p>Our responsibility extends to ensuring safety, regulatory compliance, cost efficiency, and timely project delivery while creating architecture that positively impacts communities.</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;