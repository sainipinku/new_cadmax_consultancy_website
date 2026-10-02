import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [textWhite, setTextWhite] = useState(true);

  const simpleLinks = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    // OLD SERVICES LINK (commented - not deleted)
    // { label: "SERVICES", path: "/Services" },
    // NEW SERVICES LINK - CadmaxServices folder
    { label: "SERVICES", path: "/services" },
    { label: "CAREER", path: "/careerpath" },
    { label: "CONTACT", path: "/contact" },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Track scroll for header bg, text color, and visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setHasScrolled(scrollY > 50);

      // Text color logic:
      // White on Hero (first 100vh) + on ContactSection + on service page CTA sections (above footer)
      // Dark (foreground) on everything else
      const contactSection = document.querySelector('.contact-section-home');
      const servicesCta = document.querySelector('.sv-cta');
      const engineeringCta = document.querySelector('.eng-cta');
      const architecturalCta = document.querySelector('.arch-cta');
      let shouldBeWhite = false;

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const contactVisible = rect.top < vh - 100;
        shouldBeWhite = contactVisible;
      }

      // Also turn header text white when reaching CTA sections right above the footer
      // on Services, Engineering, and Architectural pages (dark backgrounds)
      if (!shouldBeWhite) {
        const ctaSections = [servicesCta, engineeringCta, architecturalCta].filter(Boolean);
        for (const cta of ctaSections) {
          const rect = cta.getBoundingClientRect();
          const ctaVisible = rect.top < vh - 100;
          if (ctaVisible) {
            shouldBeWhite = true;
            break;
          }
        }
      }

      if (!shouldBeWhite) {
        // White only on hero section (first ~100vh)
        shouldBeWhite = scrollY < vh - 80;
      }

      setTextWhite(shouldBeWhite);

      // Also check for AmenitiesSection visibility for navbar hide/show
      const amenitiesSection = document.querySelector('[data-section="amenities"]');
      if (amenitiesSection) {
        const rect = amenitiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.top <= 0 && rect.bottom >= windowHeight;
        setIsVisible(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Derived classes
  const textColorClass = textWhite ? 'text-white' : 'text-[var(--foreground)]';
  const logoDividerClass = textWhite ? 'bg-white' : 'bg-[var(--foreground)]';
  const hamburgerClass = textWhite ? 'bg-white' : 'bg-[var(--foreground)]';
  //const underlineClass = textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]';
  const headerBgClass = hasScrolled
    ? textWhite
      ? 'bg-black/20 backdrop-blur-md'
      : 'bg-[var(--background)]/90 backdrop-blur-md'
    : 'bg-transparent';

  // Menu Component to be rendered via Portal
  const MenuOverlay = () => {
    if (!menuOpen) return null;

    return createPortal(
      <div className="
        fixed inset-0
        bg-[var(--background)]
        transition-all duration-700 ease-in-out
        opacity-100 visible
        overflow-y-auto
        menu-overlay-portal
      ">
        {/* Menu Content */}
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-sm font-semibold tracking-wider uppercase">Close Menu</span>
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
            <nav className="space-y-1 w-full max-w-2xl">
              {/* Simple Links */}
              {simpleLinks.map((link, index) => (
                <div
                  key={link.path}
                  className="overflow-hidden text-center"
                  style={{
                    animation: `slideDown 0.6s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `group block text-3xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] py-3 
                      transition-all duration-300 hover:pl-4 relative
                      ${isActive ? 'font-semibold' : ''}`
                    }
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </NavLink>
                </div>
              ))}

              {/* Projects Link */}
              <div
                className="overflow-hidden text-center"
                style={{
                  animation: `slideDown 0.6s ease-out ${simpleLinks.length * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <NavLink
                  to="/projects"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `group block text-3xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] py-3 transition-all duration-300 hover:pl-4 ${isActive ? 'font-semibold' : ''}`
                  }
                >
                  <span className="relative inline-block">
                    PROJECTS
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </NavLink>
              </div>
            </nav>
          </div>

          {/* Bottom CTA Button */}
          <div
            className="p-8 md:p-16 flex justify-center"
            style={{
              animation: `slideDown 0.6s ease-out ${(simpleLinks.length + 1) * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 px-6 py-2 rounded-md text-[14px] font-bold transition-all duration-300"
            >
              ENQUIRE TODAY
            </Link>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <header
        className={`
      fixed top-0 left-0 w-full z-50
      h-[77px]
      flex items-center justify-between px-4 md:px-6
      transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      ${isHome ? 'navbar-enter' : ''}
      ${headerBgClass}
    `}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className={`${textColorClass} text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight transition-colors duration-300`} style={{ fontFamily: 'Fragment Glare, Arial, sans-serif' }}>
            CADMAX
          </span>
          <span className={`hidden sm:block w-[2px] h-6 md:h-8 ${logoDividerClass} transition-all duration-300`}></span>
          <span className={`hidden sm:block ${textColorClass} text-sm md:text-base lg:text-lg font-light tracking-[0.3em] uppercase transition-colors duration-300`} style={{ fontFamily: 'Fragment Glare, Arial, sans-serif' }}>
            Consultancy
          </span>
        </Link>

        {/* Desktop Menu - Only show on large screens */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-5">
          {/* Simple Links */}
          {simpleLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative text-[14px] font-bold px-3 py-2 transition font-['Cormorant_Garamond'] tracking-wider
              ${isActive ? "text-[var(--accent)] scale-110 font-extrabold" : textColorClass}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] ${textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]'} after:w-0
              hover:after:w-full after:transition-all`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `relative text-[14px] font-bold px-3 py-2 transition font-['Cormorant_Garamond'] tracking-wider
              ${isActive ? "text-[var(--accent)] scale-110 font-extrabold" : textColorClass}
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] ${textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]'} after:w-0
              hover:after:w-full after:transition-all`
            }
          >
            PROJECTS
          </NavLink>
        </nav>

        {/* Desktop Button */}
        <Link
          to="/contact"
          className={`hidden lg:block ${textWhite ? 'bg-white text-[#254441]' : 'bg-[var(--primary)] text-[var(--primary-foreground)]'} hover:opacity-90 px-3 py-1 rounded-md text-[12px] font-bold transition-all duration-300`}
        >
          ENQUIRE TODAY
        </Link>

        {/* Elegant Hamburger Menu Button - Show on tablet and mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group ${menuOpen ? 'fixed right-4 z-[100000]' : ''}`}
        >
          <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-[var(--foreground)]' : hamburgerClass}`}></span>
          <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : hamburgerClass}`}></span>
          <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-[var(--foreground)]' : hamburgerClass}`}></span>
        </button>

        {/* Full Screen Menu Overlay - Rendered via Portal */}
        <MenuOverlay />

        {/* Backdrop Overlay */}
        {menuOpen && createPortal(
          <div
            className="md:hidden fixed inset-0 bg-[var(--foreground)]/20 backdrop-blur-sm transition-opacity duration-700 opacity-100 menu-backdrop-portal"
            onClick={() => setMenuOpen(false)}
          ></div>,
          document.body
        )}
      </header>

      {/* Bottom line - hides on scroll */}
      <div className="fixed top-[77px] left-0 w-full flex justify-center z-50 pointer-events-none">
        <div
          className={`${isHome ? 'nav-line-enter' : ''} h-[0.5px] ${textWhite ? 'bg-white' : 'bg-[var(--border)]'} w-[calc(100%-6vw)] max-w-[1400px] transition-opacity duration-300 ease-in-out ${hasScrolled ? 'opacity-0' : 'opacity-100'
            }`}
        />
      </div>

    </>
  );
};

// Add custom animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .navbar-enter {
    opacity: 0;
    transform: translateY(-100%);
    animation: navbarSlideIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards;
  }

  @keyframes navbarSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-line-enter {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: center;
    animation: lineGrow 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 5s forwards;
  }

  @keyframes lineGrow {
    0% {
      opacity: 0;
      transform: scaleX(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;