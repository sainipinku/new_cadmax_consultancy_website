import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
// import img1 from "../../../assets/Images/header/banner1.jpg";
// import img1 from "../../../assets/Images/header/home-banner-1.jpg";
// import img2 from "../../../assets/Images/header/banner2.jpg";
// import img3 from "../../../assets/Images/header/banner3.jpg";
// import img4 from "../../../assets/Images/header/home-banner-4.jpg";
import heroImg from "../../../assets/Images/header/hero.jpg";

const Hero = () => {
  const sliderImages = [heroImg, heroImg];

  return (
    <section className="w-full overflow-hidden">

      {/* SAME HEIGHT */}
      <div className="relative w-full h-[400px] md:h-[560px] lg:h-[750px] pb-0 md:mt-[-100px]">

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {sliderImages.map((img, i) => (
            
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">

                {/* IMAGE */}
                <img
                  src={img}
                  alt={`slide-${i}`}
                  className="w-full h-full object-cover hero-zoom-effect"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* HERO CONTENT - Image only, no text */}
                <div className="absolute inset-0">
                  {/* Text content removed - keeping only the image with overlay */}
                </div>

              </div>
            </SwiperSlide>

          ))}
        </Swiper>

      </div>

    </section>
  );
};

export default Hero;