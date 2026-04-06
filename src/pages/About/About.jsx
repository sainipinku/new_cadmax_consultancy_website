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
 { img: m2, name: "Ms. KIRAN SHARMA", role: "INTERIOR DIRECTOR  " },
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

      {/* Company Overview*/}
      <div style={{ background: "black" }}>
        <div className="story-section ">
          <h2 >Company Overview</h2>
          <p>
            At CADMAX Consultancy, we specialize in architectural design, planning, and consultancy services for residential, commercial, and industrial projects. Our experienced team combines advanced CAD technology with thoughtful design to bring ideas to life. We build trust before we build structures. That’s the CadMax difference.Customers choose CadMax because we turn complex ideas into precise, buildable designs—on time, every time.CadMax: Where accuracy meets creativity. Trusted by clients who value quality, innovation, and flawless execution.We don’t just design spaces—CadMax designs solutions. That’s why clients trust us to deliver excellence from concept to completion.CadMax stands out for our attention to detail, advanced CAD technology, and commitment to client satisfaction.From 2D to 3D perfection—customers choose CadMax for designs that are accurate, clear, and construction-ready.
          </p>

          {/* <img src={storyImage} alt="our story" className="story-image" /> */}
        </div>
      </div>

      {/* MISSION & VISION */}
      {/* <div className="mission-vision">
        <div className="mv-card">
          <div className="mv-icon ">
            <i class="fa-solid fa-handshake"></i>
          </div>
          <h3>OUR MISSION</h3>
          <p>
            Cadmax Consultancy’s mission is to deliver accurate, innovative, and reliable architectural solutions that meet client needs and industry standards. The firm is committed to quality design, strong teamwork, and efficient project execution while maintaining integrity and professionalism. Through continuous improvement and the use of advanced technology, Cadmax Consultancy aims to create sustainable and practical designs that add lasting value.
          </p>
        </div>

        <div className="mv-card">
          <div className="mv-icon">
            <i className="bi bi-eye"></i>
          </div>

          <h3>OUR VISION</h3>
          <p>
            To be a trusted leader in architectural and technical consultancy, delivering innovative, accurate, and design-ready solutions by seamlessly translating real-world site conditions into intelligent, sustainable, and future-focused outcomes that inspire confidence and long-term value
          </p>
        </div>
      </div> */}

      {/* award section  */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-6">
            Inspiring Leadership, Remarkable Achievements
          </h2>

          <p className="text-gray-600 text-base leading-relaxed mb-3">
            It is truly commendable that Mr. Hanuman Sahay Sharma, chairman of  Cadmax, has achieved numerous milestones through his dedication, perseverance, and visionary approach. His consistent efforts and leadership have played a key role in the growth and success of the organization. With a strong commitment to excellence and innovation, he has inspired many professionals and students alike. His achievements reflect not only personal success but also his positive impact on the industry, making him a respected and motivating leader.
          </p>

          <p className="text-gray-800 font-medium">
            A Journey of Vision, Dedication, and Success <br /> Driven by innovation, guided by experience, and built on trust.
          </p>
         
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src={awardimg}
            alt="About Cadmac Consultancy"
            className="w-full max-w-md h-[480px] rounded-xl shadow-lg object-cover"
          />
        </div>

      </div>


      {/* CAPABILITIES SECTION */}
      {/* <div className="cap-section">

        <div className="cap-header">
          <h2>CAPABILITIES THAT HOLD UP IN THE FIELD</h2>
          <p>Cadmax Consultancy’s capabilities stand strong in the field through its commitment to precision, innovation, and practical execution. With a skilled team, advanced design technology, and thorough on-site coordination, the firm successfully translates concepts into reliable, buildable solutions. Every project reflects a balance of technical accuracy, creative design, and real-world performance, ensuring quality from planning to completion. This dedication to excellence allows Cadmax Consultancy to deliver results that consistently meet professional standards and client expectations on the ground.</p>
        </div>

        <div className="cap-collage">

          
          <div className="cap-item cap-big">
            <img src={cap1} alt="" />
            <h3>TOTAL STATION</h3>
          </div>

        
          <div className="cap-item cap-small">
            <img src={cap2} alt="" />
            <h3>DRONE</h3>
          </div>

         
          <div className="cap-item cap-small">
            <img src={cap4} alt="" />
            <h3>DGPS</h3>
          </div>

         
          <div className="cap-item cap-big">
            <img src={cap3} alt="" />
            <h3>GPS</h3>
          </div>

          
          <div className="cap-item cap-small">
            <img src={cap5} alt="" />
            <h3>LIDAR</h3>
          </div>

         
          <div className="cap-item cap-small">
            <img src={cap6} alt="" />
            <h3> DIGITAL AUTO LEVEL</h3>
          </div>

        </div> */}


      {/* </div> */}



      <AboutSlider />


      
{/* out team */}


{/* TOP LEADERS */}
<div className="text-center my-16">
  <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
    OUR CREATIVE LEADERS
  </h2>
   {/* Decorative Line */}
    <div className="w-[80px] h-[2px] bg-gray-900 mx-auto mt-3 mb-12"></div>
</div>


<div className="max-w-[900px] mx-auto px-5 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">

  {members.slice(0, 2).map((member, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl overflow-hidden shadow-2xl border group transition duration-500 hover:-translate-y-2"
    >
      <div className="h-[360px] overflow-hidden">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="text-center py-5 px-4 bg-white">
        <h3 className="text-lg font-bold text-gray-900 tracking-wide whitespace-normal break-words">
          {member.name}
        </h3>

        <p className="text-sm text-gray-600 mt-1 tracking-wider whitespace-normal break-words">
          {member.role}
        </p>
      </div>
    </div>
  ))}

</div>

<div className="w-full py-10 bg-white overflow-hidden">

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
          bg-white rounded-xl overflow-hidden 
          shadow-lg border
          group transition duration-500 hover:-translate-y-2
        "
      >

        <div className="h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px] overflow-hidden">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="text-center py-4 px-3 bg-white">
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            {member.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {member.role}
          </p>
        </div>

      </div>

    ))}

  </div>

</div>



  {/* our team core value */}

  <div className="relative py-10 bg-gradient-to-b from-white to-gray-100">

  <div className="max-w-6xl mx-auto px-6 text-center">

<div className="text-center my-16">
  <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
   OUR CORE TEAM
  </h2>
   {/* Decorative Line */}
    <div className="w-[120px] h-[2px] bg-gray-900 mx-auto mt-3 mb-12"></div>
</div>

    {/* Image Card */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">

      <img 
        src={img4} 
        alt="mahadev market"
        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
      />

    

    </div>

  </div>

</div>




      <div className="values-section ">

        <div className="text-center my-16">
  <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
  OUR CORE VALUES
  </h2>
  
</div>

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


      <Footer />
    </>
  );
};

export default About;
