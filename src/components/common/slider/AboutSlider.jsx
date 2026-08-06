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
   <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-10 overflow-hidden bg-[var(--background)]">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-xs text-left px-5 uppercase tracking-[0.35em] text-accent mb-4">
          Our Global Presence
        </p>
        <h2 className="font-display text-4xl uppercase leading-[1.05] tracking-[0.02em] text-foreground md:text-6xl">
          Where We <span className="italic text-[var(--accent)]">Build & Design</span>
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-3xl mx-auto">
          From concept to construction, Cadmax Consultancy serves multiple states and cities
          with expert architectural planning and infrastructure solutions—shaping
          sustainable, future-ready environments wherever we build.
        </p>
      </motion.div>

      <div className="relative">
        {/* Images */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide w-full pb-6"
        >
          {loopImages.map((img, index) => (
            <motion.div
              key={index}
              className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] flex-shrink-0 group"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: (index % images.length) * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: false }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/70 surface-3d transition-all duration-500 hover:-translate-y-2 hover:surface-3d-lift">
                <div className="overflow-hidden bg-secondary/50">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-[var(--card)]">
                  <h4 className="text-lg font-bold uppercase tracking-[0.15em] text-foreground">
                    {img.title}
                  </h4>
                  <div className="h-[2px] bg-accent mt-2 w-0 transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;