import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PrivacyPolicy = () => {
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
                            Privacy Policy
                        </span>
                    </div>

                    <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#CAAA79]">
                        Legal
                    </p>

                    <h1
                        className="text-4xl font-medium text-white md:text-5xl lg:text-6xl"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Privacy Policy
                    </h1>

                    <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
                        This Privacy Policy explains how Cadmax Consultancy
                        collects, uses and protects information when you use
                        our website or communicate with us.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="px-5 py-16 md:px-16 lg:px-24 lg:py-24">
                <div className="mx-auto max-w-[900px]">

                    <p className="mb-10 text-[14px] text-black/50">
                        Last Updated: September 2026
                    </p>

                    <PolicySection title="1. Information We Collect">
                        <p>
                            We may collect personal information such as your name,
                            email address, phone number and other information you
                            voluntarily provide when contacting us through our
                            website.
                        </p>
                    </PolicySection>

                    <PolicySection title="2. How We Use Your Information">
                        <p>
                            Information submitted through our website may be used
                            to respond to enquiries, communicate regarding our
                            services, improve our website and provide customer
                            support.
                        </p>
                    </PolicySection>

                    <PolicySection title="3. Cookies & Website Usage">
                        <p>
                            Our website may use cookies and similar technologies
                            to understand website usage, improve functionality and
                            enhance the overall user experience.
                        </p>
                    </PolicySection>

                    <PolicySection title="4. Information Security">
                        <p>
                            We take reasonable technical and organisational
                            measures to protect personal information from
                            unauthorised access, misuse, alteration or disclosure.
                        </p>
                    </PolicySection>

                    <PolicySection title="5. Third-Party Services">
                        <p>
                            Our website may contain links to third-party websites
                            or use external services. Cadmax Consultancy is not
                            responsible for the privacy practices of external
                            websites.
                        </p>
                    </PolicySection>

                    <PolicySection title="6. Information Sharing">
                        <p>
                            We do not sell or rent your personal information.
                            Information may only be shared where necessary to
                            provide requested services or where required by law.
                        </p>
                    </PolicySection>

                    <PolicySection title="7. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy when required.
                            Updated versions will be published on this page with
                            the latest revision date.
                        </p>
                    </PolicySection>

                    <PolicySection title="8. Contact Us">
                        <p>
                            For questions regarding this Privacy Policy, please
                            contact Cadmax Consultancy at{" "}
                            <a
                                href="mailto:info@cadmaxpro.com"
                                className="text-[#9b7545] hover:underline"
                            >
                                info@cadmaxpro.com
                            </a>
                            .
                        </p>
                    </PolicySection>

                </div>
            </section>
        </main>
    );
};

const PolicySection = ({ title, children }) => {
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

export default PrivacyPolicy;