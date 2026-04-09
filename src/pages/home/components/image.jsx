import React from "react";
import "./image.css";
import image1 from "../../../assets/Images/collage/DGPS.jpg"
import image2 from "../../../assets/Images/collage/TOPOGRAPHICAL.jpg"
import image3 from "../../../assets/Images/collage/ENGINEERING.jpg"
import image4 from "../../../assets/Images/collage/LAND.jpg"
import image5 from "../../../assets/Images/collage/MOBILR.jpg"



const MasonryGallery = () => {
  const images = [
    { img: image1, title: "1. DGPS SURVEY" },
    { img: image2, title: "2. TOPOGRAPHICAL SURVEY" },
    { img: image3, title: "3. ENGINEERING SURVEY" },
    { img: image4, title: "4. LAND SURVEYING" },
    { img: image5, title: "5. MOBILE MAPPING & GIS" },
  ];

  return (
    
    <div className="max-w-7xl mx-auto px-6 py-16">
       <div className="text-center pb-12 md:pb-20 px-4">
  <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-gray-800 leading-snug">
    <span className="block font-semibold text-gray-900 mt-2">
      TYPES OF SURVEY
    </span>
  </h2>

  <div className="w-24 sm:w-40 md:w-[420px] h-[2px] bg-gray-900 mx-auto mt-3 mb-8 md:mb-12"></div>
</div>

      {/* TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        {images.slice(0, 3).map((item, index) => (
          <div key={index} className="relative h-[300px] overflow-hidden rounded-xl group">
            
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/0 transition"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg z-10">
              {item.title}
            </div>

          </div>
        ))}
      </div>

      {/* BOTTOM 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {images.slice(3, 5).map((item, index) => (
          <div key={index} className="relative h-[300px] overflow-hidden rounded-xl group">
            
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/0 transition"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg z-10">
              {item.title}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MasonryGallery;
