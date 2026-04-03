import React from 'react'
import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";

import img1 from "../../../assets/Images/interior-image/cadmax-project1.jpg";
import img2 from "../../../assets/Images/interior-image/cadmax-project-2.jpg";
import img3 from "../../../assets/Images/interior-image/cadmax-project-3.jpg";
import img4 from "../../../assets/Images/interior-image/cadmax-project-4.jpg";
import img5 from "../../../assets/Images/interior-image/cadmax-project-5.jpg";
import img6 from "../../../assets/Images/interior-image/cadmax-project-6.jpeg";


const CadmaxProjects = () => { 
    const images = [img1, img2, img3, img4, img5 , img6 ];
  return (
    <>
    <Navbar/>
    
    <section className="py-20 px-4 md:px-10 lg:px-20 bg-gray-50">
        {/* <h2 className="text-3xl pt-4 md:text-4xl font-bold text-center mb-12 tracking-wide">
          CADMAX PROJECT
        </h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 shadow-md"
            >
              <img
                src={image}
                alt={`interior-${index}`}
                className="w-full h-[300px] md:h-[350px] object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
    
    <Footer/>
    </>
  )
}

export default CadmaxProjects