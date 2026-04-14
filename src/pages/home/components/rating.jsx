import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./rating.css";
// import img1 from "../../../assets/Images/Other/img1.jpg"


const data = [
  {
    // img: img1,
    name: "— RAVI KUMAWAT ",
    desc: "A professional architectural practice with strong design expertise and excellent project coordination. Their commitment to quality, clear communication, and client satisfaction is evident at every stage of their work. From concept to final execution, the team demonstrated creativity, technical precision, and a clear understanding of our requirements, delivering results that truly exceeded our expectations." ,
  Role :"SHREE RAM GROUP"
  },
  {
    // img: img1,
    name: "— MUKESH SHARMA ",
    desc: "We were highly satisfied with the firm’s design approach and exceptional attention to detail. The architects balanced creativity with practicality, delivering a solution that was both visually strong and highly functional. Their thoughtful planning, clear communication, and technical expertise were evident at every stage of the project, resulting in a smooth process and an outcome that truly reflected our vision.",
    Role :" HOMELAND GROUP"
  },
  {
    // img: img1,
    name: "— SANWAR MAL ",
    desc: "Working with the Cadmax Group architects was a thoroughly positive experience. They listened carefully to our requirements, responded thoughtfully to every piece of feedback, and provided clear, professional guidance at each stage of the process. Their collaborative and solution-oriented approach greatly contributed to the smooth execution of the project and played a key role in its overall success.",
    Role :" ASHIANA HOUSING LTD"
  },
  {
    // img: img1,
    name: "— CHARAN KHANGAROAT",
    desc: "The firm managed the project efficiently, maintaining agreed timelines and delivering high-quality, well-structured documentation. Their reliability, transparency, and organized workflow gave us confidence throughout the design and development process. The team’s proactive coordination and attention to detail ensured smooth progress and resulted in a final outcome that met our technical requirements and expectations",
    Role :" FS REALITY GROUP"
  },
  {
    // img: img1,
    name: "— MANISH GOYAL  ",
    desc: "CADMAX Group truly made our dream home a reality through their exceptional design quality, professionalism, and constant support. We were particularly impressed by their collaborative approach and genuine willingness to listen to our feedback, which made us feel like valued partners throughout the process. We highly recommend their services to anyone seeking creative, reliable, and client-focused architectural solutions.",
    Role :" KGK Group"
  },
  {

    // img: img1,
    name: "— Sandeep Sharma",
    desc: "We were particularly impressed by their collaborative approach and genuine willingness to listen to our feedback, which made us feel like valued partners throughout the process. Their thoughtful planning, creative insight, and strong technical knowledge were evident at every stage of the project. The team’s professionalism and commitment to quality ensured a smooth experience and a final outcome we are truly proud of." ,
 Role :"Udaygajraj Group"
  },


    {

    // img: img1,
    name: "— Ashish Kumar",
    desc: "The true strength of this company lies in its people—highly skilled professionals whose knowledge, discipline, and passion bring distinction and prestige to every project they deliver. Their team’s commitment to excellence, innovation, and quality is clearly reflected in the final outcomes. Working with them has been a rewarding experience, and we deeply value their professionalism and dedication." ,
 Role :"Ashish Group"
  },
    {

    // img: img1,
    name: "— Ram Chandra Yadav",
    desc: "Their team was consistently professional, highly responsive, and guided us seamlessly through every stage of the project. They took the time to understand our vision, offered valuable insights, and maintained clear communication throughout. We would not hesitate to recommend their services to anyone looking for a truly collaborative, reliable, and talented architectural partner." ,
 Role :"Aryan Landmark"
  },
    {

    // img: img1,
    name: "— Abhishek Kumawat",
    desc: "We are absolutely delighted with the work of CADMAX Consultancy. They took our initial ideas and transformed them into a beautiful, highly functional design that truly exceeded our expectations. Their creativity, technical expertise, and attention to detail were evident throughout the process. The team maintained clear communication, respected timelines, and delivered a final outcome that perfectly aligned with our vision and project goals." ,
 Role :"Mahima Group"
  },
    {

    // img: img1,
    name: "— Babu Lal  Kulariya",
    desc: "The firm proved to be a highly reliable and capable partner throughout our engagement. They consistently adhered to agreed timelines and budgets while maintaining a high standard of design quality and detailed documentation. Their structured approach, proactive coordination, and strong attention to detail gave us confidence at every stage of the project and resulted in an outcome that met both our creative and operational expectations." ,
 Role :"SHYAMASHISH GROUP"
  },
];
const Testimonial = () => {
  return (
    <div className="testimonial-bg">
      <div className="testimonial-wrapper">
        <h2 className="testimonial-title">Proof of Performance</h2>
        {/* <p className="testimonial-subtitle">
          Each discipline is handled by teams trained to convert field conditions into design-ready data.
        </p> */}

        <div className="testimonial-slider-container">
          {/* LEFT BUTTON */}
          <div className="swiper-button-prev custom-prev"></div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            spaceBetween={25}
            slidesPerView={3}
            loop={true}
            breakpoints={{
              1000: { slidesPerView: 3 },
              600: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {data.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-card">
                  <p className="testimonial-msg">{t.desc}</p>

                  <div className="testimonial-client">
                    {/* <img src={t.img} alt="" /> */}
                    <div>
                      <p className="client-name">{t.name.toUpperCase()}</p>
                      <p className="client-role">{t.Role.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* RIGHT BUTTON */}
          <div className="swiper-button-next custom-next"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
