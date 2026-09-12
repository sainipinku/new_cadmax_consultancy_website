import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CompanyLogoImage from "../../../assets/Images/cadmax-logo/Cadmax-logo.png";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-column", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".footer-bottom", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLink =
    "group flex items-center gap-1 text-[14px] text-white/60 hover:text-[#CAAA79] transition-all duration-300";

  const headingClass =
    "text-[12px] uppercase tracking-[0.18em] text-white font-medium mb-6";

  return (
    <footer
      ref={footerRef}
      className="relative z-20 w-full bg-[#151515] text-white"
    >
      {/* Top Divider */}
      <div className="h-[1px] w-full bg-white/10" />

      {/* Main Footer */}
      <div className="px-5 py-14 md:px-10 md:py-16 lg:px-16 xl:px-24 xl:py-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8 xl:gap-12">

          {/* ========================================= */}
          {/* 1. COMPANY LOGO + NAME + SLOGAN */}
          {/* ========================================= */}

          <div className="footer-column sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src={CompanyLogoImage}
                alt="Cadmax Consultancy"
                className="mb-5 h-[65px] w-auto object-contain"
              />
            </Link>

            <h2
              className="mb-2 text-[28px] font-semibold leading-tight md:text-[32px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Cadmax{" "}
              <span className="text-[#CAAA79]">
                Consultancy
              </span>
            </h2>

            {/* Slogan */}
            <p className="mb-5 text-[12px] uppercase tracking-[0.28em] text-[#CAAA79]">
              Plan • Design • Deliver
            </p>

            <div className="mb-5 h-[2px] w-12 bg-[#CAAA79]" />

            <p className="max-w-[360px] text-[14px] font-light leading-7 text-white/55">
              Excellence in engineering, surveying and planning —
              delivering innovative and precision-driven solutions for
              every project.
            </p>
          </div>

          {/* ========================================= */}
          {/* 2. QUICK LINKS */}
          {/* ========================================= */}

          <div className="footer-column">
            <h4 className={headingClass}>
              Quick Links
            </h4>

            <div className="flex flex-col gap-4">
              <Link to="/about" className={footerLink}>
                About Us
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </Link>

              <Link to="/services" className={footerLink}>
                Services
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </Link>

              <Link to="/contact" className={footerLink}>
                Contact Us
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </Link>

              <Link to="/careerpath" className={footerLink}>
                Career
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </Link>
            </div>
          </div>

          {/* ========================================= */}
          {/* 3. PROJECT SECTION */}
          {/* ========================================= */}

          <div className="footer-column">
            <h4 className={headingClass}>
              Projects
            </h4>

            <div className="flex flex-col gap-4">
              <Link to="/projects" className={footerLink}>
                All Projects
              </Link>

              <Link
                to="/projects/engineering"
                className={footerLink}
              >
                Engineering
              </Link>

              <Link
                to="/projects/surveying"
                className={footerLink}
              >
                Surveying
              </Link>

              <Link
                to="/projects/planning"
                className={footerLink}
              >
                Planning
              </Link>
            </div>
          </div>

          {/* ========================================= */}
          {/* 4. SOCIAL MEDIA */}
          {/* ========================================= */}

          <div className="footer-column">
            <h4 className={headingClass}>
              Follow Us
            </h4>

            <div className="mb-6 flex items-center gap-3">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/CadMaxProjectsJPR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#CAAA79] hover:bg-[#CAAA79] hover:text-[#151515]"
              >
                <Facebook size={17} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/cadmaxconsultancy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#CAAA79] hover:bg-[#CAAA79] hover:text-[#151515]"
              >
                <Instagram size={17} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/cadmax-projects-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-[#CAAA79] hover:bg-[#CAAA79] hover:text-[#151515]"
              >
                <Linkedin size={17} />
              </a>
            </div>

            <p className="max-w-[190px] text-[13px] font-light leading-6 text-white/45">
              Stay connected with us for our latest projects,
              updates and insights.
            </p>
          </div>

          {/* ========================================= */}
          {/* 5. COMPANY CONTACT */}
          {/* ========================================= */}

          <div className="footer-column">
            <h4 className={headingClass}>
              Contact
            </h4>

            <div className="flex flex-col gap-3">

              {/* Address */}
              <div className="flex items-start">
                <MapPin
                  size={18}
                  className="mt-[3px] shrink-0 text-[#CAAA79]"
                />

                <p className="text-[14px] font-light leading-6 text-white/55">
                  301-302, PRISM TOWER,LALKHOTHI SCHEME, OPP.POLICE HEADQUATER,NEHRU PALCE ,TONK ROAD Jaipur 302015
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+919829045031"
                className="group flex items-center gap-3"
              >
                <Phone
                  size={17}
                  className="shrink-0 text-[#CAAA79]"
                />

                <span className="text-[14px] text-white/55 transition-colors group-hover:text-[#CAAA79]">
                  +91 9602360000
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:consultancy@cadmax.co.in"
                className="group flex items-center gap-3"
              >
                <Mail
                  size={17}
                  className="shrink-0 text-[#CAAA79]"
                />

                <span className="break-all text-[14px] text-white/55 transition-colors group-hover:text-[#CAAA79]">
                  consultancy@cadmax.co.in
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM LEGAL BAR */}
      {/* ========================================= */}

      <div className="h-[1px] w-full bg-white/10" />

      <div className="footer-bottom px-5 md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 py-6 md:flex-row">

          {/* Copyright */}
          <p className="text-center text-[12px] font-light text-white/40 md:text-left">
            © {currentYear} Cadmax Consultancy. All Rights Reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[12px]">

            <Link
              to="/privacy-policy"
              className="text-white/40 transition-colors duration-300 hover:text-[#CAAA79]"
            >
              Privacy Policy
            </Link>

            <span className="text-[#CAAA79]">
              •
            </span>

            <Link
              to="/terms-and-conditions"
              className="text-white/40 transition-colors duration-300 hover:text-[#CAAA79]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;