import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const CitySurvey = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Surveying - City Survey Sector"
      subtitle="For Master Planning, Zonal Planning, Sector Planning - More than 1000.00 Hectare"
      sector="SURVEYING"
      subCategory="CITY SURVEY SECTOR"
    />
  );
};

export default CitySurvey;
