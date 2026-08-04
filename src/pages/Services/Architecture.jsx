import React from 'react'
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import heroBG from "../../assets/Images/urbanmax/ARCHITECH-BANNER.jpeg"
// import img1 from "../../assets/Images/urbanmax/image-1.jpg"
// import img2 from "../../assets/Images/urbanmax/image-2.jpg"
// import img3 from "../../assets/Images/urbanmax/image-3.jpg"
import img4 from "../../assets/Images/urbanmax/mahadev-market.jpg"
import img5 from "../../assets/Images/urbanmax/offer-img1.jpg"
import img6 from "../../assets/Images/urbanmax/offer-img2.jpg"
import img7 from "../../assets/Images/urbanmax/offer-img3.jpg"
import img8 from "../../assets/Images/urbanmax/offer-img4.jpg"




const Architecture = () => {
     
  return (
    <>
    <Navbar />
    

 <div
  className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: `url(${heroBG})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Text */}
  <div className="relative z-10 text-center">
    {/* Eyebrow */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
      <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
        Our Service
      </span>
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
    </div>
    <h1 className="font-clash text-white font-semibold tracking-[3px] text-4xl md:text-6xl">
      ARCHITECTURAL
    </h1>
  </div>
</div>


   <div className="relative py-16 bg-[var(--background)]">

  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
      <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
        Our Philosophy
      </span>
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
    </div>
    <h2 className="font-clash text-3xl md:text-5xl text-[var(--foreground)] leading-snug">
      An architect who transforms the old into 
      <span className="block italic text-[var(--accent)] mt-2">
        timeless new designs
      </span>
    </h2>

    {/* Decorative Line */}
    <div className="w-24 h-[2px] bg-[var(--accent)] mx-auto mt-6 mb-12"></div>

    {/* Image Card */}
    <div className="relative group overflow-hidden rounded-2xl shadow-elevated border border-[var(--border)]">

      <img 
        src={img4} 
        alt="mahadev market"
        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>

    </div>

  </div>

</div>
<section className="relative py-24 bg-[var(--secondary)]">

  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">

      <div>
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
            Our Services
          </span>
        </div>
        <h2 className="font-clash text-4xl md:text-6xl text-[var(--foreground)] leading-[1.05]">
          WHAT WE <span className="italic text-[var(--accent)]">OFFER</span>
        </h2>
      </div>

      <p className="mt-6 md:mt-0 font-general text-sm md:text-base tracking-[3px] text-[var(--muted-foreground)] uppercase">
        Residential • Commercial • Industrial Planning
      </p>

    </div>

    {/* UNIQUE COLLAGE */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">

      {/* Large Left Image */}
      <div className="relative md:col-span-2 md:row-span-2 group overflow-hidden rounded-2xl border border-[var(--border)]">

        <img
          src={img8}
          alt=""
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>

        {/* Text */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="w-8 h-[1px] bg-[var(--accent)] mb-3" />
          <h3 className="font-clash text-2xl md:text-3xl text-white font-semibold tracking-wide">
            Cadmax
          </h3>
        </div>
      </div>

      {/* Top Right */}
      <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)]">

        <img
          src={img6}
          alt=""
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>

        <div className="absolute bottom-6 left-6 z-10">
          <div className="w-8 h-[1px] bg-[var(--accent)] mb-3" />
          <h3 className="font-clash text-lg md:text-xl text-white font-semibold tracking-wide">
            Turnkey Construction
          </h3>
        </div>
      </div>

      {/* Bottom Right */}
      <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)]">

        <img
          src={img7}
          alt=""
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>

        <div className="absolute bottom-6 left-6 z-10">
          <div className="w-8 h-[1px] bg-[var(--accent)] mb-3" />
          <h3 className="font-clash text-lg md:text-xl text-white font-semibold tracking-wide">
            Renovation
          </h3>
        </div>
      </div>

      {/* Bottom Wide */}
      <div className="relative md:col-span-2 group overflow-hidden rounded-2xl border border-[var(--border)]">

        <img
          src={img5}
          alt=""
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[var(--foreground)]/40 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>

        <div className="absolute bottom-6 left-6 z-10">
          <div className="w-8 h-[1px] bg-[var(--accent)] mb-3" />
          <h3 className="font-clash text-xl md:text-2xl text-white font-semibold tracking-wide">
            3D Elevation
          </h3>
        </div>
      </div>

    </div>

  </div>

</section>




    <Footer />
    </>
  )
}

export default Architecture