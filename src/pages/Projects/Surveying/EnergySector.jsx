import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const EnergySector = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Surveying - Energy Sector"
      subtitle="Hydro/Solar/Thermal/Wind/Natural Gas/Petroleum - More than 300.00 KM"
      sector="SURVEYING"
      subCategory="ENERGY SECTOR"
    />
  );
};

export default EnergySector;
