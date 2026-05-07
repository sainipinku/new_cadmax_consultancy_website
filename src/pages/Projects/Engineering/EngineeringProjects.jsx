import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const EngineeringProjects = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Engineering MEP Projects"
      subtitle="Complete Services designing for development more than 250.0 hectare"
      sector="ENGINEERING"
    />
  );
};

export default EngineeringProjects;
