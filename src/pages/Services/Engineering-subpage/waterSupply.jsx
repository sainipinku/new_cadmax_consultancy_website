// import React from "react";
// import heroBG from "../../../assets/Images/service-page-2/watersupply-banner.jpeg";
// import Navbar from "../../../components/Layout/Header/Navbar";
// import Footer from "../../../components/Layout/Footer/Footer";
// import WorkSlider from "../../../components/common/slider/SliderSection";
// import img1 from "../../../assets/Images/service-page-3/collage-img.png";

// //slider-img
// import img2 from "../../../assets/Images/service-page-3/slider-img1.png";
// import img3 from "../../../assets/Images/service-page-3/slider-img2.jpg";
// import img4 from "../../../assets/Images/service-page-3/slider-img3.jpg";
// import img5 from "../../../assets/Images/service-page-3/slider-img3.jpg";








// const Watersupply = () => {
//   return (
//     <>
//       <Navbar />

//       {/* SERVICE 3 WRAPPER */}
//       <section className="service3-wrapper">

//         {/* HERO */}
//         <div
//           className="service3-hero w-full h-[420px] bg-cover bg-center"
//           style={{ backgroundImage: `url(${heroBG})` }}
//         />

//         {/* COLLAGE */}
//         <div className="service3-grid w-full grid grid-cols-4 gap-5 px-10 py-10
//                         max-[992px]:grid-cols-2
//                         max-[576px]:grid-cols-1">

//           {[
//             "Maingate and boundary construction",
//             "Road network",
//             "Water supply",
//             "Electricity",
            
//           ].map((text, i) => (
//             <div key={i} className="service3-card relative overflow-hidden group">
//               <img
//                 src={img1}
//                 alt=""
//                 className="service3-img w-full h-full object-cover
//                            brightness-[0.4] transition-all duration-500
//                            group-hover:brightness-75 group-hover:scale-110"
//               />
//               <p className="service3-text absolute top-1/2 left-1/2
//                             -translate-x-1/2 -translate-y-1/2
//                             text-white text-lg font-black uppercase
//                             text-center pointer-events-none">
//                 {text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

     
//     <WorkSlider
//       prefix="water"
//       slides={[
//         { url: img2, title: "URBAN WATER SUPPLY PROJECT" },
//         { url: img3, title: "PIPELINE INFRASTRUCTURE" },
//         { url: img4, title: "WATER TREATMENT PLANT" },
//         { url: img5, title: "WATER TREATMENT PLANT" },
//       ]}
//     />
//       <Footer />
//     </>
//   );
// };

// export default Watersupply;
