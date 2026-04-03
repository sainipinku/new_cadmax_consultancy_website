import React, { useEffect, useState } from "react";

const Textbox = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); 
  }, []);

  return (
    
    <div className="w-screen relative pt-0 mt-[-5px] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-hidden">

  {/* TOP TEXT */}
  <div
    className={`
      bg-[#d0d0d0] 
      px-4 sm:px-6 md:px-8 
      py-[50px] sm:py-[60px]
      w-full
      flex justify-center
      transition-all duration-[1200ms] ease-out
      ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"}
    `}
  >

    {/* CONTENT WRAPPER (IMPORTANT 🔥) */}
    <div className="max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%px] text-center">

      <h2 className="
        text-black uppercase font-extrabold
        text-[18px] 
        sm:text-[20px] 
        md:text-[22px] 
        lg:text-[26px]
        leading-[1.4]
      ">
        From your ideas to smart designs—Architech listens.
      </h2>

      <p className="
        text-black capitalize font-bold mt-3
        text-[13px] 
        sm:text-[14px] 
        md:text-[16px] 
        lg:text-[20px]
        leading-[1.6]
      ">
       At Architech, every detail counts. From innovative interiors that inspire to engineering solutions that endure, we’re committed to shaping spaces where design meets precision. Take our survey and help us craft environments that reflect your vision.
      </p>

    </div>

  </div>

</div>
  );
};

export default Textbox;