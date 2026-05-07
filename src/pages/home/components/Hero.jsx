import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import img1 from "../../../assets/Images/header/banner1.jpg";
// import img1 from "../../../assets/Images/header/home-banner-1.jpg";
import img2 from "../../../assets/Images/header/banner2.jpg";
import img3 from "../../../assets/Images/header/banner3.jpg";
import img4 from "../../../assets/Images/header/home-banner-4.jpg";

const Hero = () => {
  const sliderImages = [img1, img2, img3, img4];

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
                  className="w-full h-full object-cover"
                />

              </div>
            </SwiperSlide>

          ))}
        </Swiper>

      </div>

      {/* STICKY COMPANY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200 py-2 z-50">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          <span className="text-sm md:text-lg font-bold text-gray-800">CADMAX</span>
          <span className="text-sm md:text-lg font-bold text-gray-800">AutoDesk</span>
          <span className="text-sm md:text-lg font-bold text-gray-800">SolidWorks</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;