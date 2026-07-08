import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
// import logo from "../../../assets/Images/cadmax-logo/footer-logo.png";

const Footer = () => {
  const columnsRef = useRef([]);

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

  return (
    <footer className="bg-[#151515] w-full relative z-20" style={{ transformStyle: 'preserve-3d' }}>
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
                Cadmax <span className="text-[#CAAA79]">Consultancy</span>
              </h3>
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed font-light max-w-xs">
              Excellence in engineering, surveying, and planning — delivering precision-driven solutions since inception.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div
            className="md:col-span-2 md:col-start-6 footer-col"
            ref={(el) => (columnsRef.current[1] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="footer-link-styled">ABOUT US</Link>
              <Link to="/contact" className="footer-link-styled">CONTACT US</Link>
              <Link to="/Services" className="footer-link-styled">SERVICES</Link>
              <Link to="/careerpath" className="footer-link-styled">CAREER PATH</Link>
            </div>
          </div>

          {/* Column 3 — Projects */}
          <div
            className="md:col-span-2 footer-col"
            ref={(el) => (columnsRef.current[2] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              PROJECTS
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/projects" className="footer-link-styled">ALL PROJECTS</Link>
              <Link to="/projects/engineering" className="footer-link-styled">ENGINEERING</Link>
              <Link to="/projects/surveying" className="footer-link-styled">SURVEYING</Link>
              <Link to="/projects/planning" className="footer-link-styled">PLANNING</Link>
            </div>
          </div>

          {/* Column 4 — Social / Connect */}
          <div
            className="md:col-span-2 footer-col"
            ref={(el) => (columnsRef.current[3] = el)}
          >
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-medium text-white/60 mb-5">
              CONNECT
            </h4>
            <div className="flex items-center gap-5">
              <a
                href="https://www.facebook.com/CadMaxProjectsJPR"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <Facebook className="footer-social-icon" size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/cadmaxconsultancy/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <Instagram className="footer-social-icon" size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/company/cadmax-projects-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <Linkedin className="footer-social-icon" size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — hairline divider */}
      <div className="w-full h-[1px] bg-[var(--color-border)]"></div>

      <div className="max-w-full px-5 md:px-16 lg:px-24 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-white/40 font-light">
          Copyright © Dipen Gada & Associates. All Rights Reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/about" className="text-[12px] text-white/40 hover:text-[#CAAA79] transition-colors duration-200 font-light">
            Privacy
          </Link>
          <Link to="/contact" className="text-[12px] text-white/40 hover:text-[#CAAA79] transition-colors duration-200 font-light">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;