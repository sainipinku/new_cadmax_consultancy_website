import { useRef } from "react";
import './About.css';
import AboutSlider from "../../components/common/slider/AboutSlider";
import Navbar from '../../components/Layout/Header/Navbar';
import Footer from '../../components/Layout/Footer/Footer';

import heroBG from "../../../src/assets/Images/about/hero-cadmax-light.jpg";
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

const leader = [
  { img: m1, name: "Mr. HANUMAN SAHAY SHARMA", role: "CHAIRMAN" },
  { img: m2, name: "Mrs. KAMLA DEVI SHARMA", role: "DIRECTOR" },
];


const members = [

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




const stats = [
  { value: "26+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "4.9/5", label: "Client Rating" },
];

// const value = [
//   {
    
//     title: "INNOVATION",
//     desc: "Innovation drives the architectural vision of CADMAX Consultancy. We integrate creative design thinking with advanced architectural technologies to produce functional, sustainable, and visually striking spaces",
//   },
//   {
    
//     title: "EXCELLENCE",
//     desc: "Excellence is reflected in every stage of our architectural process—from concept development to project completion..",
//   },
//   {
   
//     title: "INTEGRITY",
//     desc: "CADMAX Consultancy maintains clear communication, realistic commitments, and compliance with all regulatory standards. We build lasting relationships with clients, consultants, and contractors based on trust and mutual respect.",
//   },
//   {
//     img: svg4,
//     title: "RESPONSIBILITY",
//     desc: "Our responsibility extends to ensuring safety, regulatory compliance, cost efficiency, and timely project delivery while creating architecture that positively impacts communities.",
//   },
// ];


const values = [
  {
    img: svg1,
    title: "Innovation",
    body: "Innovation drives the architectural vision of CADMAX Consultancy. We integrate creative design thinking with advanced architectural technologies to produce functional, sustainable, and visually striking spaces.",
  },
  {
    img: svg2,
    title: "Excellence",
    body: "Excellence is reflected in every stage of our architectural process—from concept development to project completion.",
  },
  {
    img: svg3,
    title: "Integrity",
    body: "CADMAX Consultancy maintains clear communication, realistic commitments, and compliance with all regulatory standards. We build lasting relationships with clients, consultants, and contractors based on trust and mutual respect.",
  },
  {
    img: svg4,
    title: "Responsibility",
    body: "Our responsibility extends to ensuring safety, regulatory compliance, cost efficiency, and timely project delivery while creating architecture that positively impacts communities.",
  },
];


const About = () => {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* HERO — Full Tailwind Glassmorphism */}
      <div className="relative min-h-[85vh] overflow-hidden">
        <img
          src={heroBG}
          alt="Bright CADMAX architecture studio with drafting tables and building models"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-veil" />
        <section className="relative flex min-h-[85vh] flex-col justify-between px-6 py-20 md:px-22 md:py-21 mt-10 ">
          <div className="max-w-2xl rounded-3xl border border-border/50 surface-3d p-8 backdrop-blur-sm md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">About Cadmax</p>
            <h1 className="mt-5 font-display text-4xl uppercase leading-[1.02] tracking-[0.02em] text-foreground md:text-6xl">
              At CADMAX Consultancy
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            we specialize in architectural design, planning, and consultancy services for residential,
             commercial, and industrial projects. Our experienced team combines advanced CAD technology
              with thoughtful design to bring ideas to life. We build trust before we build structures.
               That's the CadMax difference.Customers choose CadMax because we turn complex ideas into
                precise, buildable designs—on time, every time.CadMax: Where accuracy meets creativity.
                 Trusted by clients who value quality, innovation, and flawless execution.We don't just
                  design spaces—CadMax designs solutions. That's why clients trust us to deliver 
                  excellence from concept to completion.CadMax stands out for our attention to detail, 
                  advanced CAD technology, and commitment to client satisfaction.From 2D to 3D 
                  perfection—customers choose CadMax for designs that are accurate, clear, and 
                  construction-ready.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border/60 surface-3d px-4 py-4"
                >
                  <dt className="font-display text-2xl text-foreground">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* Company Overview — dark section matching Home theme */}
      {/* <div className="relative py-24  bg-[var(--secondary)] overflow-hidden">
       
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              Company Overview
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>

          <h2 className="text-center font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)] leading-[1.1] mb-8">
            About <span className="italic text-[var(--accent)]">Cadmax</span>
          </h2>

          <p className="max-w-5xl mx-auto text-center font-inter text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed">
            At CADMAX Consultancy, we specialize in architectural design, planning, and consultancy services for residential, commercial, and industrial projects. Our experienced team combines advanced CAD technology with thoughtful design to bring ideas to life. We build trust before we build structures. That's the CadMax difference.Customers choose CadMax because we turn complex ideas into precise, buildable designs—on time, every time.CadMax: Where accuracy meets creativity. Trusted by clients who value quality, innovation, and flawless execution.We don't just design spaces—CadMax designs solutions. That's why clients trust us to deliver excellence from concept to completion.CadMax stands out for our attention to detail, advanced CAD technology, and commitment to client satisfaction.From 2D to 3D perfection—customers choose CadMax for designs that are accurate, clear, and construction-ready.
          </p>
        </div>
      </div> */}
      {/* Award / CEO story */}
      <section className="border-t border-border/60 bg-[var(--background)] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="group relative overflow-hidden rounded-[2rem] border border-border/70 surface-3d p-3 transition-all duration-500 hover:-translate-y-2 hover:surface-3d-lift">
            <img
              src={awardimg}
              alt="CADMAX CEO receiving an architecture excellence award on stage"
              width={1200}
              height={800}
              loading="lazy"
              className=" h-[600px] w-full rounded-[1.6rem] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-7 left-7 rounded-full bg-background/85 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-foreground shadow-[var(--shadow-soft)] backdrop-blur">
              Design Excellence Award 2025
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">
               Our Leadership
            </p>
            <h2 className="mt-5 font-display text-3xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-4xl">
              Inspiring Leadership, Remarkable Achievements
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              “It is truly commendable that Mr. Hanuman Sahay Sharma, chairman of Cadmax, has achieved numerous milestones through his dedication, perseverance, and visionary approach. His consistent efforts and leadership have played a key role in the growth and success of the organization. With a strong commitment to excellence and innovation, he has inspired many professionals and students alike. His achievements reflect not only personal success but also his positive impact on the industry, making him a respected and motivating leader.”
            </p>
            <p className="mt-4 text-sm text-bold leading-relaxed text-muted-foreground">
             A Journey of Vision, Dedication, and Success
Driven by innovation, guided by experience, and built on trust..
            </p>

            <div className="mt-6 flex items-center gap-4 rounded-3xl bg-[#fffcfc] border border-border/70 surface-3d p-4">
              <img
                src={awardimg}
                alt="Mr. Hanuman Sahay Sharma, Chairman of CADMAX Consultancy"
                width={900}
                height={1100}
                loading="lazy"
                className="h-16 w-16 rounded-2xl object-cover object-top"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Mr. Hanuman Sahay Sharma</p>
                <p className="text-xs uppercase mt-0 tracking-[0.2em] text-muted-foreground">
                  chairman of Cadmax
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* award section — matching Home AboutSection theme */}
      {/* <div className="relative py-24 md:py-32 bg-[var(--background)] overflow-hidden">
        
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
          <div>
            
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

          
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <img
                src={awardimg}
                alt="About Cadmac Consultancy"
                className="w-full max-w-md h-[480px] rounded-2xl shadow-elevated object-cover border border-[var(--border)]"
              />
             
              <div className="pointer-events-none absolute -inset-3 border border-[var(--accent)]/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </div> */}

      <AboutSlider />


       {/* Leadership: chairman + HR */}
      <section className="px-6 py-24 bg-[var(--background)] md:px-12 md:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Leadership</p>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-6xl mb-10">
              OUR CREATIVE LEADERS
            </h2>
          </div>

         <div className="max-w-[900px] mx-auto px-5 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
          {leader.map((member, index) => (
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
        </div>
      </section>

{/* team section  */}
      <section className="border-t border-border/60 bg-[var(--background)] px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-accent">Our team</p>
              <h2 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-6xl">
                Behind every drawing
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous team members"
                onClick={() => scrollBy(-1)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-border/70 surface-3d text-foreground transition-all hover:-translate-y-0.5 hover:surface-3d-lift"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next team members"
                onClick={() => scrollBy(1)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-border/70 surface-3d text-foreground transition-all hover:-translate-y-0.5 hover:surface-3d-lift"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {members.map((member) => (
              <article
                key={member.name}
                className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-border/70 surface-3d transition-all duration-500 hover:-translate-y-2 hover:surface-3d-lift"
              >
                <div className="overflow-hidden bg-secondary/50">
                  <img
                    src={member.img}
                    alt={`${member.name}, ${member.role} at CADMAX Consultancy`}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="h-72 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.1em] text-muted-foreground mt-1.5">
                    {member.role}
                  </p>
                  <div className="h-[2px] bg-accent mt-2 w-0 transition-all duration-500 group-hover:w-16" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* TOP LEADERS */}
      {/* <div className="relative py-10 bg-[var(--background)]"> */}
        {/* <div className="text-center my-16">
          
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
          
          <div className="w-[80px] h-[2px] bg-[var(--accent)] mx-auto mt-6"></div>
        </div> */}

        {/* <div className="max-w-[900px] mx-auto px-5 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
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
        </div> */}

        {/* Team Member Slider */}
        {/* <div className="w-full py-10 bg-[var(--background)] overflow-hidden">
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
      </div> */}

      {/* OUR CORE TEAM */}
      <div className="relative pb-5 bg-[var(--background)]">

        <div className="max-w-6xl  mx-auto py-5 px-6 text-left">
          <div className="max-w-2xl  pb-5">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">The People Behind</p>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-6xl">
              Our core TEAM
            </h2>
            
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




   

      <section
        id="studio"
        className="relative border-t border-border/60 bg-[var(--secondary)] px-6 py-24 md:px-12 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">What drives us</p>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-6xl">
              Our core values
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              The principles behind every masterplan, elevation and delivered
              square foot we put our name on.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
            {values.map((value, i) => (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-3xl bg-[#fdfbf7] border border-border/70 surface-3d p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:surface-3d-lift md:p-10"
              >
                <span className="pointer-events-none absolute right-4 -top-6 font-display text-[7rem] leading-none text-outline opacity-15 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-30">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <img src={value.img} alt={value.title} className="h-11 w-11 object-contain" />
                <h3 className="relative mt-6 text-lg font-semibold uppercase tracking-[0.2em] text-foreground">
                  {value.title}
                </h3>
                <p className="relative mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
                <span className="relative mt-8 block h-[3px] w-12 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* OUR CORE VALUES — Glassmorphism + 3D + Framer Motion */}
      {/* <div className="values-section glass-values-section bg-[var(--secondary)] py-24 relative overflow-hidden">
       
        <motion.div
          className="glass-ambient-orb glass-orb-1"
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="glass-ambient-orb glass-orb-2"
          animate={{ y: [0, 50, 0], x: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="glass-ambient-orb glass-orb-3"
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="glass-grid-overlay" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
         
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 1.02, 0.55, 1] }}
          >
          
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                What Drives Us
              </span>
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
            </motion.div>

            <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
              OUR CORE{" "}
              <motion.span
                className="italic text-[var(--accent)] inline-block"
                initial={{ opacity: 0, y: 20, rotateX: 60 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                VALUES
              </motion.span>
            </h2>

            <motion.div
              className="w-[120px] h-[2px] bg-[var(--accent)] mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </motion.div>

        
          <div className="glass-values-grid">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default About;