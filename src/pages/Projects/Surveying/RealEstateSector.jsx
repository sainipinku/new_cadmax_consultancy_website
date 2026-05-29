import React from "react";
import ProjectLayout from "../components/ProjectLayout";
import heroImage from "../../../assets/Images/project/project-banner.png";

const noProjectContent = (
  <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 space-y-10">
    {/* Description - clean modern typography */}
    <div className="text-center">
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
        More than <span className="text-blue-600 font-bold text-2xl md:text-3xl">500</span> projects included of Jaipur top most Builders, industrialist, Institutions, Farmers and land developers sites property surveys, submission surveys and layout marking work area more than <span className="text-blue-600 font-bold text-2xl md:text-3xl">1000.00</span> Hectare.
      </p>
    </div>

    {/* Stats Highlight - clean icons */}
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">500+</p>
        <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-medium">Projects</p>
      </div>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">1000+</p>
        <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-medium">Hectares</p>
      </div>
    </div>
  </div>
);

const RealEstateSector = () => {
  return (
    <ProjectLayout
      heroImage={heroImage}
      title="Surveying - Real Estate Sector"
      subtitle="Traditional Survey, Construction Survey"
      description=""
      sector="SURVEYING"
      subCategory="REAL ESTATE SECTOR"
      noProjectContent={noProjectContent}
    />
  );
};

export default RealEstateSector;
