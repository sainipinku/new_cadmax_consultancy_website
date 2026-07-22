import React, { useEffect, useState, useRef } from "react";
import "./company.css";

// Company logo imports
import logoAai from "../../../assets/Images/company logo/aai.png";
import logoAdani from "../../../assets/Images/company logo/adani.png";
import logoAnanta from "../../../assets/Images/company logo/Ananta_logo_new_ivatuw.png";
import logoAryanBuildmart from "../../../assets/Images/company logo/aryan-buildmart.png";
import logoAshiyana from "../../../assets/Images/company logo/ashiyana.jpg";
import logoB3bGroup from "../../../assets/Images/company logo/b3b-group.png";
import logoCeg from "../../../assets/Images/company logo/ceg.png";
import logoChiripal from "../../../assets/Images/company logo/Chiripal-Logo.png";
import logoChordia from "../../../assets/Images/company logo/chordia.png";
import logoCityhome from "../../../assets/Images/company logo/cityhome_logo.png";
import logoCroppedAashish from "../../../assets/Images/company logo/cropped-aashish.webp";
import logoCroppedKedia from "../../../assets/Images/company logo/cropped-Kedia_logo.png";
import logoDdaDelhi from "../../../assets/Images/company logo/dda-delhi.png";
import logoDerewala from "../../../assets/Images/company logo/derewala.png";
import logoFirstIndia from "../../../assets/Images/company logo/first-india.webp";
import logoFlipcart from "../../../assets/Images/company logo/flipcart.svg";
import logoFsRealty from "../../../assets/Images/company logo/fs-realty.png";
import logoGalaxy from "../../../assets/Images/company logo/galaxy.png";
import logoGkbGroup from "../../../assets/Images/company logo/gkb-group.png";
import logoGrill from "../../../assets/Images/company logo/grill-logo.png";
import logoGulshanFashions from "../../../assets/Images/company logo/gulshan-fashions.jpg";
import logoGyanVihar from "../../../assets/Images/company logo/gyan-vihar.png";
import logoHgInfra from "../../../assets/Images/company logo/hg-infra.png";
import logoHomelandGroup from "../../../assets/Images/company logo/homeland-group.png";
import logoJda from "../../../assets/Images/company logo/jda.png";
import logoJwm from "../../../assets/Images/company logo/JWM_Logo_Vertical.webp";
import logoKgkRealty from "../../../assets/Images/company logo/KGK-Realty-logo.png";
import logoDefault from "../../../assets/Images/company logo/logo.jpg";
import logoFinalCelebrating from "../../../assets/Images/company logo/Logo_Final-With-celebrating.png";
import logoPrideHotels from "../../../assets/Images/company logo/Logo_of_Pride_Hotels_Group.png";
import logoOne from "../../../assets/Images/company logo/logo-1.jpg";
import logoMojika from "../../../assets/Images/company logo/logo-mojikagroup.png";
import logoSaffron from "../../../assets/Images/company logo/Logo-Saffron-Group-Web.jpg";
import logoMahima from "../../../assets/Images/company logo/mahimagroup_logoblue.png";
import logoMircleGroup from "../../../assets/Images/company logo/mircle-group.png";
import logoNirwana from "../../../assets/Images/company logo/nirwana.webp";
import logoOmLogostic from "../../../assets/Images/company logo/om-logostic.png";
import logoOnerealty from "../../../assets/Images/company logo/onerealty.webp";
import logoOswalGroup from "../../../assets/Images/company logo/oswal-group.jpg";
import logoPatrika from "../../../assets/Images/company logo/patrika.webp";
import logoPragati from "../../../assets/Images/company logo/Pragati.webp";
import logoPrataUniversity from "../../../assets/Images/company logo/pratapuniversity.png";
import logoPurple from "../../../assets/Images/company logo/purple-logo.png";
import logoRana from "../../../assets/Images/company logo/rana_logo.avif";
import logoRaviSurya from "../../../assets/Images/company logo/Ravi-Surya-Group-Logo-1.png";
import logoReliance from "../../../assets/Images/company logo/reliance.png";
import logoRiico from "../../../assets/Images/company logo/riico.jpeg";
import logoSallemPapers from "../../../assets/Images/company logo/salllem-papers.png";
import logoSamurai from "../../../assets/Images/company logo/samurai.png";
import logoSaras from "../../../assets/Images/company logo/saras.svg";
import logoShivalikGroup from "../../../assets/Images/company logo/shivalik-group.png";
import logoShivgyan from "../../../assets/Images/company logo/shivgyan.png";
import logoShubhashishGroup from "../../../assets/Images/company logo/shubhashish group.svg";
import logoShyamAshish from "../../../assets/Images/company logo/shyam-ashish.png";
import logoSiddarth from "../../../assets/Images/company logo/Siddarth-logo-1.pdf.png";
import logoTataProjects from "../../../assets/Images/company logo/tata-projects-logo.png";
import logoToreent from "../../../assets/Images/company logo/toreent.png";
import logoUb from "../../../assets/Images/company logo/UB-logo.png";
import logoUrbanGaon from "../../../assets/Images/company logo/urban-gaon.png";
import logoVardhman from "../../../assets/Images/company logo/vardhman.png";
import logoVidhyasharam from "../../../assets/Images/company logo/vidhyasharam.png";

const images = [
  logoAai,
  logoAdani,
  logoAnanta,
  logoAryanBuildmart,
  logoAshiyana,
  logoB3bGroup,
  logoCeg,
  logoChiripal,
  logoChordia,
  logoCityhome,
  logoCroppedAashish,
  logoCroppedKedia,
  logoDdaDelhi,
  logoDerewala,
  logoFirstIndia,
  logoFlipcart,
  logoFsRealty,
  logoGalaxy,
  logoGkbGroup,
  logoGrill,
  logoGulshanFashions,
  logoGyanVihar,
  logoHgInfra,
  logoHomelandGroup,
  logoJda,
  logoJwm,
  logoKgkRealty,
  logoDefault,
  logoFinalCelebrating,
  logoPrideHotels,
  logoOne,
  logoMojika,
  logoSaffron,
  logoMahima,
  logoMircleGroup,
  logoNirwana,
  logoOmLogostic,
  logoOnerealty,
  logoOswalGroup,
  logoPatrika,
  logoPragati,
  logoPrataUniversity,
  logoPurple,
  logoRana,
  logoRaviSurya,
  logoReliance,
  logoRiico,
  logoSallemPapers,
  logoSamurai,
  logoSaras,
  logoShivalikGroup,
  logoShivgyan,
  logoShubhashishGroup,
  logoShyamAshish,
  logoSiddarth,
  logoTataProjects,
  logoToreent,
  logoUb,
  logoUrbanGaon,
  logoVardhman,
  logoVidhyasharam,
];

const CompanyShowcase = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(false);
            setTimeout(() => setVisible(true), 50);
          } else {
            setVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Duplicate images for infinite marquee
  const marqueeImages = [...images, ...images];

  return (
    <section
      className="company-showcase-section"
      ref={sectionRef}
      style={{
        background: 'white linear-gradient(to right, #f8f7f4, #f8f7f4)',
        padding: '40px 0'
      }}
    >
      <div className="max-w-full px-5 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT SIDE - Label Box */}
          <div className={`company-label-box ${visible ? "visible" : ""}`}>
            <div className="company-label-content">
              <p className="company-label-text">Clients who inspire us</p>
            </div>
          </div>

          {/* RIGHT SIDE - Horizontal Logo Slider */}
          <div className={`company-slider-container ${visible ? "visible" : ""}`}>
            <div className="company-slider-track">
              {marqueeImages.map((img, index) => (
                <div key={index} className="company-logo-item">
                  <img
                    src={img}
                    alt={`Client logo ${index + 1}`}
                    className="company-logo-image"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;