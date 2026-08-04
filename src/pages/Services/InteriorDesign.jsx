import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import heroBG from "../../assets/Images/interior-image/interior-banner-image.jpeg"
// import WorkSlider from "../../components/common/slider/ourworkSlider";
// import img1 from "../../assets/Images/urbanmax/interior-work1.jpg";
// import img2 from "../../assets/Images/urbanmax/interior-work2.jpg";
// import img3 from "../../assets/Images/urbanmax/interior-work3.jpg";
// import img4 from "../../assets/Images/urbanmax/interior-work4.jpg";
import img5 from "../../assets/Images/urbanmax/cadmax-consultancy-img.jpg";
import img6 from "../../assets/Images/urbanmax/cadmax-project-img.jpg";
import img7 from "../../assets/Images/urbanmax/dipendra-ji-goner.jpg";





export const InteriorDesign = () => {
  return (
   <>
   <Navbar/>
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
      INTERIOR DESIGN
    </h1>
  </div>
</div>
<div className="w-full bg-[var(--background)]">
  <div className="w-full max-w-7xl mx-auto px-6 py-16">

    {/* Eyebrow */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
      <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
        Our Portfolio
      </span>
      <div className="w-8 h-[1px] bg-[var(--accent)]" />
    </div>

    <h3 className="
      font-clash
      text-[var(--foreground)]
      uppercase
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl
      font-semibold
      tracking-wide
      text-center
      px-4
      pb-4 md:pb-5
      leading-tight
    ">
      Inspired <span className="italic text-[var(--accent)]">Interiors</span>
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Card 1 */}
      <Link to="/cadmax-consultancy" className="relative group overflow-hidden h-[400px] block rounded-2xl border border-[var(--border)] shadow-elevated">
        <img
          src={img5}
          alt="service"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--foreground)]/50 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-clash text-white text-xl font-semibold tracking-wide text-center px-4 drop-shadow-lg">
            CADMAX CONSULTANCY
          </h3>
        </div>
      </Link>

      {/* Card 2 */}
      <Link to="/cadmax-projects" className="relative group overflow-hidden h-[400px] block rounded-2xl border border-[var(--border)] shadow-elevated">
        <img
          src={img6}
          alt="service"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--foreground)]/50 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-clash text-white text-xl font-semibold tracking-wide text-center px-4 drop-shadow-lg">
            CADMAX PROJECTS
          </h3>
        </div>
      </Link>

      {/* Card 3 */}
      <Link to="/dipendra-ji-goner-site" className="relative group overflow-hidden h-[400px] block rounded-2xl border border-[var(--border)] shadow-elevated">
        <img
          src={img7}
          alt="service"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[var(--foreground)]/50 group-hover:bg-[var(--foreground)]/0 transition duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-clash text-white text-xl font-semibold tracking-wide text-center px-4 drop-shadow-lg">
            DIPENDRA JI GONER SITE
          </h3>
        </div>
      </Link>

    </div>
  </div>
</div>


      {/* <div className='py-10'>
 <WorkSlider
      prefix="electricity"
      slides={[
       
  { url: img1, title: "INDUSTRIAL POWER NETWORK " },
  { url: img2, title: "POWER SUBSTATION PROJECT" },
  { url: img3, title: "ELECTRICAL GRID INFRASTRUCTURE" },
  { url: img4, title: "ELECTRICITY DISTRIBUTION SYSTEM" },
  



      ]}
    />
</div> */}
    
    
   <Footer/>
   
   </>
  )
}

export default InteriorDesign;