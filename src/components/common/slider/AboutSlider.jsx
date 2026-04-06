import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import image1 from "../../../assets/Images/about/banglore.jpeg";
import image2 from "../../../assets/Images/about/bikaner.jpeg";
import image3 from "../../../assets/Images/about/gujrat.jpeg";
import image4 from "../../../assets/Images/about/jodhpur.jpeg";
import image5 from "../../../assets/Images/about/lucknow.jpeg";
import image6 from "../../../assets/Images/about/maharastra.jpeg";
import image7 from "../../../assets/Images/about/punjab.jpeg";
import image8 from "../../../assets/Images/about/rajasthan.jpeg";
import image9 from "../../../assets/Images/about/varanasi.jpeg";
import image10 from "../../../assets/Images/about/congo-photo.jpeg";
import image11 from "../../../assets/Images/about/shri-lanka.jpeg";
import image12 from "../../../assets/Images/about/AFRICA-IMAGES.webp";

const AboutSlider = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 300;

  const [images] = useState([
    { id: 1, url: image1, title: "BANGLORE" },
    { id: 2, url: image2, title: "BIKANER" },
    { id: 3, url: image3, title: "GUJRAT" },
    { id: 4, url: image4, title: "JODHPUR" },
    { id: 5, url: image5, title: "LUCKNOW" },
    { id: 6, url: image6, title: "MAHARASHTRA" },
    { id: 7, url: image7, title: "PUNJAB" },
    { id: 8, url: image8, title: "RAJASTHAN" },
    { id: 9, url: image9, title: "VARANASI" },
    { id: 10, url: image10, title: "CONGO" },
    { id: 11, url: image11, title: "SHRI LANKA" },
    { id: 12, url: image12, title: "AFRICA" },
  ]);

  const loopImages = [...images, ...images];

  const scrollRight = () => {
    const container = sliderRef.current;
    container.scrollLeft += scrollAmount;

    if (
      container.scrollLeft + container.offsetWidth >=
      container.scrollWidth - 10
    ) {
      container.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollRight, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
   <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-10 overflow-hidden">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-center mb-4"
      >
        Where We Build & Design
      </motion.h2>

      {/* Subtitle line */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto text-base md:text-lg text-gray-600 mb-14 leading-relaxed"
      >
        From concept to construction, Cadmax Consultancy serves multiple states and cities
        with expert architectural planning and infrastructure solutions—shaping
        sustainable, future-ready environments wherever we build.
      </motion.p>

      <div className="relative flex items-center">
        {/* Images */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-scroll scroll-smooth scrollbar-hide w-full"
        >
          {loopImages.map((img, index) => (
            <motion.div
              key={index}
              className="min-w-[220px] md:min-w-[320px] xl:min-w-[380px] 2xl:min-w-[420px] flex-shrink-0"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: (index % images.length) * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <motion.img
                src={img.url}
                alt={img.title}
                className="w-full h-[260px] object-cover rounded-md shadow-lg"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              <motion.h4
                className="mt-4 text-xl md:text-2xl font-serif tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {img.title}
              </motion.h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;
