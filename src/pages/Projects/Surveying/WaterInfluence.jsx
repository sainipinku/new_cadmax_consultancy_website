import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const WaterInfluence = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Surveying - Water Influence"
      subtitle="Water supply/sewerage systems/STP/Pump Hose - More than 1000.0 KM."
      sector="SURVEYING"
      subCategory="WATER INFLUENCE"
    />
  );
};

export default WaterInfluence;
