import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import logo from "../../../assets/Images/cadmax-logo/footer-logo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const columnsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-col-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    columnsRef.current.forEach((col) => {
      if (col) observer.observe(col);
    });

    return () => observer.disconnect();
  }, []);

  // 3D Reveal Animation for footer text and links
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal all footer mask elements with 3D effect
      gsap.utils.toArray(".footer-mask").forEach((mask) => {
        gsap.from(mask.querySelectorAll("span"), {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: mask,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // Reveal footer columns with fade-up
      gsap.utils.toArray(".footer-col").forEach((col, i) => {
        gsap.from(col, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: col,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Reveal bottom strip
      gsap.from(".footer-bottom-strip", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-bottom-strip",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#151515] w-full relative z-20" style={{ transformStyle: 'preserve-3d' }}>
      {/* Top hairline divider from page content */}
      <div className="w-full h-[1px] bg-[var(--color-border)]"></div>

      <div className="max-w-full px-5 md:px-16 lg:px-24 py-16 md:py-20">
        {/* Multi-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* Column 1 — Logo + Tagline */}
          <div
            className="md:col-span-4 footer-col"
            ref={(el) => (columnsRef.current[0] = el)}
          >
            <div className="mb-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                <span className="footer-mask inline-block overflow-hidden">
                  <span className="inline-block">Cadmax <span className="text-[#CAAA79]">Consultancy</span></span>
                </span>
              </h3>
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed font-light max-w-xs">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block">Excellence in engineering, surveying, and planning — delivering precision-driven solutions since inception.</span>
              </span>
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div
            className="md:col-span-2 md:col-start-6 footer-col"
            ref={(el) => (columnsRef.current[1] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block">QUICK LINKS</span>
              </span>
            </h4>
            <div className="flex flex-col gap-3">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/about" className="footer-link-styled">ABOUT US</Link></span>
              </span>
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/contact" className="footer-link-styled">CONTACT US</Link></span>
              </span>
              {/* OLD SERVICES LINK (commented - not deleted) */}
              {/* <Link to="/Services" className="footer-link-styled">SERVICES</Link> */}
              {/* NEW SERVICES LINK - CadmaxServices folder */}
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/services" className="footer-link-styled">SERVICES</Link></span>
              </span>
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/careerpath" className="footer-link-styled">CAREER PATH</Link></span>
              </span>
            </div>
          </div>

          {/* Column 3 — Projects */}
          <div
            className="md:col-span-2 footer-col"
            ref={(el) => (columnsRef.current[2] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block">PROJECTS</span>
              </span>
            </h4>
            <div className="flex flex-col gap-3">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/projects" className="footer-link-styled">ALL PROJECTS</Link></span>
              </span>
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/projects/engineering" className="footer-link-styled">ENGINEERING</Link></span>
              </span>
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/projects/surveying" className="footer-link-styled">SURVEYING</Link></span>
              </span>
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block"><Link to="/projects/planning" className="footer-link-styled">PLANNING</Link></span>
              </span>
            </div>
          </div>

          {/* Column 4 — Social / Connect */}
          <div
            className="md:col-span-2 footer-col"
            ref={(el) => (columnsRef.current[3] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              <span className="footer-mask inline-block overflow-hidden">
                <span className="inline-block">CONNECT</span>
              </span>
            </h4>
            <div className="flex items-center gap-5">
              <span className="footer-mask inline-block">
                <span className="inline-block">
                  <a
                    href="https://www.facebook.com/CadMaxProjectsJPR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label="Facebook"
                  >
                    <Facebook className="footer-social-icon" size={22} strokeWidth={1.5} />
                  </a>
                </span>
              </span>
              <span className="footer-mask inline-block">
                <span className="inline-block">
                  <a
                    href="https://www.instagram.com/cadmaxconsultancy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label="Instagram"
                  >
                    <Instagram className="footer-social-icon" size={22} strokeWidth={1.5} />
                  </a>
                </span>
              </span>
              <span className="footer-mask inline-block">
                <span className="inline-block">
                  <a
                    href="https://www.linkedin.com/company/cadmax-projects-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="footer-social-icon" size={22} strokeWidth={1.5} />
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — hairline divider */}
      <div className="w-full h-[1px] bg-[var(--color-border)]"></div>

      <div className="footer-bottom-strip max-w-full px-5 md:px-16 lg:px-24 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-white/40 font-light">
          <span className="footer-mask inline-block overflow-hidden">
            <span className="inline-block">Copyright © Dipen Gada & Associates. All Rights Reserved.</span>
          </span>
        </p>
        <div className="flex items-center gap-5">
          <span className="footer-mask inline-block overflow-hidden">
            <span className="inline-block">
              <Link to="/about" className="text-[12px] text-white/40 hover:text-[#CAAA79] transition-colors duration-200 font-light">
                Privacy
              </Link>
            </span>
          </span>
          <span className="footer-mask inline-block overflow-hidden">
            <span className="inline-block">
              <Link to="/contact" className="text-[12px] text-white/40 hover:text-[#CAAA79] transition-colors duration-200 font-light">
                Terms
              </Link>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;