import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const SurveyingProjects = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Surveying Projects"
      subtitle="Comprehensive Surveying Solutions"
      description="Our surveying division provides accurate land surveys, topographical surveys, and geospatial mapping for various sectors including transportation, water resources, energy, and real estate development."
      sector="SURVEYING"
    />
  );
};

export default SurveyingProjects;
