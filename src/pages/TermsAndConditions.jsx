import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TermsAndConditions = () => {
    return (
        <main className="min-h-screen bg-[#f7f5f1]">

            {/* Hero */}
            <section className="bg-[#151515] px-5 pb-16 pt-36 md:px-16 lg:px-24">
                <div className="mx-auto max-w-[1200px]">

                    <div className="mb-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white/50">
                        <Link
                            to="/"
                            className="transition-colors hover:text-[#CAAA79]"
                        >
                            Home
                        </Link>

                        <ChevronRight size={13} />

                        <span className="text-[#CAAA79]">
                            Terms & Conditions
                        </span>
                    </div>

                    <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#CAAA79]">
                        Legal
                    </p>

                    <h1
                        className="text-4xl font-medium text-white md:text-5xl lg:text-6xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Terms & Conditions
                    </h1>

                    <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
                        These Terms & Conditions govern your use of the
                        Cadmax Consultancy website.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="px-5 py-16 md:px-16 lg:px-24 lg:py-24">
                <div className="mx-auto max-w-[900px]">

                    <p className="mb-10 text-[14px] text-black/50">
                        Last Updated: September 2026
                    </p>

                    <TermsSection title="1. Acceptance of Terms">
                        <p>
                            By accessing or using this website, you agree to these
                            Terms & Conditions. If you do not agree with these
                            terms, please discontinue use of the website.
                        </p>
                    </TermsSection>

                    <TermsSection title="2. Website Information">
                        <p>
                            Information provided on this website is for general
                            informational purposes regarding Cadmax Consultancy,
                            our projects and our professional services.
                        </p>
                    </TermsSection>

                    <TermsSection title="3. Services">
                        <p>
                            Details regarding engineering, surveying, planning
                            and other professional services may change based on
                            project requirements and contractual agreements.
                        </p>
                    </TermsSection>

                    <TermsSection title="4. Intellectual Property">
                        <p>
                            Website content including text, graphics, designs,
                            logos, photographs and other materials is owned by or
                            licensed to Cadmax Consultancy unless otherwise
                            stated.
                        </p>
                    </TermsSection>

                    <TermsSection title="5. Website Usage">
                        <p>
                            You agree not to misuse this website, attempt
                            unauthorised access, interfere with website
                            functionality or use website content for unlawful
                            purposes.
                        </p>
                    </TermsSection>

                    <TermsSection title="6. External Links">
                        <p>
                            Our website may include links to third-party websites.
                            Such links are provided for convenience and we are not
                            responsible for external website content or policies.
                        </p>
                    </TermsSection>

                    <TermsSection title="7. Limitation of Liability">
                        <p>
                            Cadmax Consultancy will not be liable for indirect,
                            incidental or consequential damages arising from the
                            use or inability to use this website, subject to
                            applicable law.
                        </p>
                    </TermsSection>

                    <TermsSection title="8. Changes to Terms">
                        <p>
                            We reserve the right to modify these Terms &
                            Conditions when necessary. Updated terms become
                            effective when published on this website.
                        </p>
                    </TermsSection>

                    <TermsSection title="9. Contact">
                        <p>
                            For questions regarding these Terms & Conditions,
                            contact us at{" "}
                            <a
                                href="mailto:info@cadmaxpro.com"
                                className="text-[#9b7545] hover:underline"
                            >
                                info@cadmaxpro.com
                            </a>
                            .
                        </p>
                    </TermsSection>

                </div>
            </section>
        </main>
    );
};

const TermsSection = ({ title, children }) => {
    return (
        <div className="mb-10 border-b border-black/10 pb-10">
            <h2
                className="mb-4 text-[24px] font-medium text-[#151515]"
                style={{ fontFamily: "var(--font-serif)" }}
            >
                {title}
            </h2>

            <div className="text-[15px] font-light leading-8 text-black/60">
                {children}
            </div>
        </div>
    );
};

export default TermsAndConditions;