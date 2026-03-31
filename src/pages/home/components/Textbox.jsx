import React, { useEffect, useState } from "react";

const Textbox = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // run only on page load
  }, []);

  return (
   <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-hidden bg-[#0f172a] mt-[-5px] pt-0">

  {/* TOP SECTION */}
  <div
    className={`
      relative
      px-6 md:px-10
      py-[55px] md:py-[70px]
      flex justify-center
      transition-all duration-[1200ms] ease-out
      ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"}
    `}
  >

    {/* Background Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]"></div>

    {/* CONTENT */}
    <div className="relative max-w-[1100px] w-full text-center">

      <h2 className="
        text-white uppercase font-extrabold
        text-[24px]
        sm:text-[32px]
        md:text-[40px]
        lg:text-[48px]
        leading-[1.2]
      ">
        From your ideas to smart designs—Architech listens.
      </h2>

      <p className="
        text-gray-300 mt-6 mx-auto
        text-[15px]
        sm:text-[16px]
        md:text-[18px]
        lg:text-[19px]
        leading-[1.9]
        max-w-[850px]
      ">
        At Architech, every detail counts. From innovative interiors that inspire to engineering solutions that endure, we’re committed to shaping spaces where design meets precision. Take our survey and help us craft environments that reflect your vision.
      </p>

      {/* PREMIUM DIVIDER */}
      <div className="w-[80px] h-[2px] bg-white/30 mx-auto mt-8"></div>

    </div>
  </div>
</div>
  );
};

export default Textbox;