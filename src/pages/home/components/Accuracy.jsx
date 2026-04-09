import React, { useEffect, useRef, useState } from 'react';
import './Accuracy.css';
import image from "../../../assets/Images/Other/accuracy-part.jpg.jpeg";

const Accuracy = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const [expanded, setExpanded] = useState(false);

  const fullText = `
   We build trust before we build structures That’s the CadMax difference. Customers choose CadMax because we turn complex ideas into precise, buildable designs on time, every time. CadMax is where accuracy meets creativity and is trusted by clients who value quality, innovation and flawless execution. We don’t just design spaces, CadMax designs solutions. That’s why clients trust us to deliver excellence from concept to completion. CadMax stands out for our attention to detail, advanced CAD technology and commitment to client satisfaction. From 2D to 3D perfection, customers choose CadMax for designs that are accurate, clear and construction-ready because CadMax delivers plans that save time, reduce errors and cut construction costs. Smart designs and smooth construction make building easier. CadMax combines industry expertise with cutting-edge technology to bring your vision to life. Clients choose CadMax for our fast turnaround, top-tier accuracy and designs engineered for real-world success.

  `;

  const previewLength = 726;
  const isLongText = fullText.length > previewLength;
  const shownText = expanded ? fullText : fullText.slice(0, previewLength);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
          } else {
            entry.target.classList.remove("animate-show");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4  mb-6 pb-10">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* LEFT TEXT */}
        <div
          className="w-full md:w-1/2 opacity-0 translate-x-[-60px] transition-all duration-700 accuracy-text"
          ref={textRef}
        >
          <h2 className="text-[22px] md:text-[24px] font-extrabold uppercase text-[#171717] mb-4 leading-tight tracking-wide">
            How CADMAX Maintains Accuracy
          </h2>

          <p className="text-[15px] md:text-[16px] leading-[1.5] text-[#333] font-medium">
            {shownText}
          </p>

          {isLongText && (
            <button
              className="mt-2 text-blue-600 font-semibold text-[14px] md:text-[15px] hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="w-full md:w-1/2 flex justify-center opacity-0 translate-x-[60px] transition-all duration-700 accuracy-img-wrapper"
          ref={imageRef}
        >
          <img
            src={image}
            className="w-full max-w-[600px] rounded-lg transition-transform duration-700 hover:scale-105"
            alt="Accuracy"
          />
        </div>

      </div>
    </div>
  );
};

export default Accuracy;