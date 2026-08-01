import { useState } from "react";
import { motion} from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Star, 
  Quote, 
  ArrowRight, 
  Award,
  ThumbsUp,
  CheckCircle
} from "lucide-react";

// Real estate and construction related images
const bannerImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";
const featuredProjectImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop";

// Featured testimonial
const featuredTestimonial = {
  name: "Rajesh & Sunita Gupta",
  role: "Property Developers, Jaipur",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  rating: 5,
  text: "Cadmax Consultancy transformed our vision into reality. Their precise land surveying and planning services ensured our residential project was completed ahead of schedule. Their 26+ years of experience truly shows in their work.",
  project: "Residential Township Planning",
  projectImage: featuredProjectImage,
  location: "Jaipur, Rajasthan",
};

// Testimonials data
const testimonials = [
  {
    name: "Vikram Singh Rathore",
    role: "Civil Contractor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "As a contractor with 15 years of experience, I can confidently say Cadmax Consultancy delivers the most accurate surveys and layouts. Their DGPS surveys saved us from costly errors.",
    project: "Commercial Complex Survey",
    location: "Udaipur",
  },
  {
    name: "Priya Agarwal",
    role: "Real Estate Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "I've worked with many consultancy firms, but Cadmax stands out for their thoroughness. Their topographical surveys and planning reports are incredibly detailed.",
    project: "Property Due Diligence",
    location: "Delhi NCR",
  },
  {
    name: "Amit Khanna",
    role: "Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Cadmax's engineering plans and 2D/3D designs are construction-ready and precise. Their team understands architectural requirements perfectly.",
    project: "Architectural Planning Support",
    location: "Gurugram",
  },
  {
    name: "Meena Sharma",
    role: "Land Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "When I wanted to divide my ancestral land among family members, Cadmax handled the entire process professionally. Their boundary surveys and documentation were flawless.",
    project: "Land Subdivision",
    location: "Ajmer",
  },
  {
    name: "Sanjay Mehta",
    role: "Builder & Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "For our high-rise project, we needed precise elevation data and site analysis. Cadmax delivered comprehensive reports that helped us optimize our construction timeline.",
    project: "High-Rise Development",
    location: "Mumbai",
  },
  {
    name: "Kavita Joshi",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "I needed accurate as-built drawings for a renovation project. Cadmax provided detailed 3D models that made my design process seamless.",
    project: "As-Built Documentation",
    location: "Pune",
  },
  {
    name: "Rakesh Bansal",
    role: "Industrialist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "We required detailed surveys for our new manufacturing unit. Cadmax's team conducted thorough soil analysis and prepared all necessary documentation for government approvals.",
    project: "Industrial Unit Setup",
    location: "Neemrana",
  },
  {
    name: "Ananya Reddy",
    role: "Property Consultant",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "I regularly refer clients to Cadmax for land surveys and verification. Their reports are reliable and legally sound, helping clients make confident investment decisions.",
    project: "Property Verification Services",
    location: "Hyderabad",
  },
];

// Stats
const stats = [
  { value: "500+", label: "Projects Completed", icon: CheckCircle },
  { value: "26+", label: "Years Experience", icon: Award },
  { value: "200+", label: "Happy Clients", icon: ThumbsUp },
  { value: "4.9/5", label: "Client Rating", icon: Star },
];

// Client logos
const clientLogos = [
  "Jaipur Development Authority",
  "Shubhashish Builders",
  "NHAI",
  "Adani Group",
  "Tata Projects",
  "Reliance Infrastructure",
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function TestimonialsPage() {


  return (
    <main className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]">
          <img
            src={bannerImage}
            alt="Real Estate Consultancy"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent-primary)]/90 via-[var(--color-accent-primary)]/70 to-[var(--color-bg-primary)]" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wider uppercase mb-6">
                Client Success Stories
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
            >
              What Our Clients
              <br />
              <span className="text-[#D7E3EA]">
                Say About Us
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-white/80 text-lg"
            >
              Trusted by 200+ clients for accurate surveys, precise planning, and reliable real estate consultancy services.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-[var(--color-accent-primary)] font-medium text-sm tracking-[0.2em] uppercase">
              Featured Story
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mt-4 mb-6">
              Client Spotlight
            </h2>
            <div className="w-20 h-1 bg-[var(--color-accent-primary)] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl overflow-hidden border border-[var(--color-border-light)] shadow-lg max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Project Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={featuredTestimonial.projectImage}
                  alt={featuredTestimonial.project}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-[var(--color-accent-primary)] text-white text-sm font-semibold">
                    Featured Project
                  </span>
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent-primary)]/10 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-[var(--color-accent-primary)]" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(featuredTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-accent-primary)] text-[var(--color-accent-primary)]" />
                  ))}
                </div>
                
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg mb-8 italic">
                  &ldquo;{featuredTestimonial.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-accent-primary)]">
                    <img
                      src={featuredTestimonial.image}
                      alt={featuredTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[var(--color-text-primary)]">
                      {featuredTestimonial.name}
                    </h4>
                    <p className="text-[var(--color-text-muted)] text-sm">
                      {featuredTestimonial.role}
                    </p>
                    <p className="text-[var(--color-accent-primary)] text-xs flex items-center gap-1 mt-1">
                      {featuredTestimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border-light)]">
                  <span className="px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-sm font-medium">
                    {featuredTestimonial.project}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--color-accent-primary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Testimonials Stack */}
      <div className="relative">
        {testimonials.map((testimonial, index) => (
          <section
            key={testimonial.name}
            className="sticky top-0 min-h-screen flex items-center justify-center py-20"
            style={{ 
              zIndex: testimonials.length - index,
              backgroundColor: index % 2 === 0 ? 'var(--color-bg-primary)' : 'var(--color-bg-section-alt)'
            }}
          >
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-primary)]/10 flex items-center justify-center mx-auto mb-6">
                  <Quote className="w-8 h-8 text-[var(--color-accent-primary)]" />
                </div>
                
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-accent-primary)] text-[var(--color-accent-primary)]" />
                  ))}
                </div>
                
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl mb-8 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-accent-primary)]">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-heading text-lg font-bold text-[var(--color-text-primary)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-[var(--color-text-muted)] text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Project Tag */}
                <div className="mt-6">
                  <span className="text-xs text-[var(--color-accent-primary)] font-medium tracking-wider uppercase bg-[var(--color-accent-primary)]/10 px-3 py-1 rounded-full">
                    {testimonial.project}
                  </span>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* Client Success Stories */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-[var(--color-accent-primary)] font-medium text-sm tracking-[0.2em] uppercase">
              Success Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mt-4 mb-6">
              Project Highlights
            </h2>
            <div className="w-20 h-1 bg-[var(--color-accent-primary)] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart City Survey Project",
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
                client: "Jaipur Development Authority",
                description: "Comprehensive topographical and cadastral survey for 200+ acres of urban development including road networks, utilities mapping, and GIS integration.",
                duration: "8 months",
                pieces: "500+ hectares",
              },
              {
                title: "Luxury Villa Township",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
                client: "Shubhashish Builders",
                description: "Complete surveying, planning, and layout design for a premium 25-acre residential township with 200+ plots, amenities, and infrastructure planning.",
                duration: "4 months",
                pieces: "25 acres",
              },
              {
                title: "Highway Alignment Survey",
                image: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?q=80&w=2070&auto=format&fit=crop",
                client: "NHAI Rajasthan",
                description: "Detailed survey and alignment planning for 45 km highway stretch including land acquisition surveys, cross-section analysis, and 3D modeling.",
                duration: "6 months",
                pieces: "45 km stretch",
              },
            ].map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border-light)] hover:border-[var(--color-accent-primary)]/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-primary)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white text-[var(--color-accent-primary)] text-xs font-semibold">
                      {story.client}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-3">
                    {story.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-[var(--color-accent-primary)]">
                      <Award className="w-4 h-4" />
                      {story.pieces}
                    </span>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {story.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-[var(--color-accent-primary)] font-medium text-sm tracking-[0.2em] uppercase">
              Trusted By
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mt-4">
              Our Valued Clients
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--color-bg-primary)] rounded-xl p-6 flex items-center justify-center border border-[var(--color-border-light)] hover:border-[var(--color-accent-primary)]/30 transition-all duration-300"
              >
                <span className="font-heading text-sm font-bold text-[var(--color-text-secondary)] text-center">
                  {logo}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-accent-primary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z' fill='none' stroke='%23FFFFFF' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work With
              <br />
              <span className="text-[#D7E3EA]">Rajasthan's Trusted Consultancy?</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join 200+ satisfied clients who trust Cadmax Consultancy for accurate surveys, 
              precise planning, and reliable real estate solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--color-accent-primary)] font-semibold hover:bg-[#D7E3EA] transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white hover:text-[var(--color-accent-primary)] transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}