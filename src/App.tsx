/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Instagram, Linkedin, Mail, Menu, X, ChevronLeft, ChevronRight, Download, ArrowLeft } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const PROJECTS = [
  {
    id: 1,
    title: "The Glass Pavilion",
    category: "Residential",
    year: "2024",
    images: [
      "https://picsum.photos/seed/arch1/1200/800",
      "https://picsum.photos/seed/arch1b/1200/800",
      "https://picsum.photos/seed/arch1c/1200/800"
    ],
    description: "A seamless integration of indoor and outdoor living in the heart of the Swiss Alps."
  },
  {
    id: 2,
    title: "Monolith Library",
    category: "Public",
    year: "2023",
    images: [
      "https://picsum.photos/seed/arch2/1200/800",
      "https://picsum.photos/seed/arch2b/1200/800",
      "https://picsum.photos/seed/arch2c/1200/800"
    ],
    description: "A brutalist-inspired sanctuary for knowledge, featuring dramatic light wells and raw concrete."
  },
  {
    id: 3,
    title: "Azure Heights",
    category: "Commercial",
    year: "2023",
    images: [
      "https://picsum.photos/seed/arch3/1200/800",
      "https://picsum.photos/seed/arch3b/1200/800",
      "https://picsum.photos/seed/arch3c/1200/800"
    ],
    description: "Redefining the skyline with a sustainable, vertical forest concept in Singapore."
  },
  {
    id: 4,
    title: "Desert Mirage",
    category: "Hospitality",
    year: "2022",
    images: [
      "https://picsum.photos/seed/arch4/1200/800",
      "https://picsum.photos/seed/arch4b/1200/800",
      "https://picsum.photos/seed/arch4c/1200/800"
    ],
    description: "An eco-resort that disappears into the dunes of the Sahara, utilizing passive cooling."
  }
];

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  key?: React.Key;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index % 2 * 0.2, duration: 0.8 }}
      className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <div className="overflow-hidden mb-8 aspect-[4/5] relative bg-neutral-100">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img 
            key={currentImageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            src={project.images[currentImageIndex]} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {project.images.map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentImageIndex ? 'bg-white w-4' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest font-medium rounded-full z-10">
          {project.category}
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-serif mb-2 group-hover:italic transition-all">{project.title}</h3>
          <p className="text-muted text-sm max-w-xs line-clamp-2">{project.description}</p>
        </div>
        <span className="font-serif italic text-muted">{project.year}</span>
      </div>
    </motion.div>
  );
}

function Resume() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-16 print:hidden">
          <Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs uppercase tracking-widest bg-ink text-bg px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        <div className="print:block">
          <header className="border-b border-border pb-12 mb-12">
            <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Elias Thorne</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">Principal Architect & Visionary</p>
            <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-sm text-muted">
              <span>Oslo, Norway</span>
              <span>hello@aura.arch</span>
              <span>+47 123 45 678</span>
              <span>www.aura.arch</span>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Profile</h2>
            <p className="text-muted leading-relaxed text-lg">
              Award-winning architect with a focus on sustainable, minimal, and emotive spaces. Expert in merging Scandinavian design principles with global architectural trends. Dedicated to creating environments that harmonize with nature and elevate the human experience.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Experience</h2>
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif italic">Aura Architecture Studio</h3>
                  <span className="text-xs text-muted">2012 — Present</span>
                </div>
                <p className="text-sm uppercase tracking-widest mb-4">Founder & Principal Architect</p>
                <ul className="text-muted text-sm space-y-2 list-disc pl-4">
                  <li>Lead design for over 50 residential and commercial projects across Europe.</li>
                  <li>Pioneered sustainable "Vertical Forest" concepts in urban environments.</li>
                  <li>Managed a team of 15 designers and engineers from concept to completion.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif italic">Kengo Kuma & Associates</h3>
                  <span className="text-xs text-muted">2008 — 2012</span>
                </div>
                <p className="text-sm uppercase tracking-widest mb-4">Senior Architect (Tokyo, Japan)</p>
                <ul className="text-muted text-sm space-y-2 list-disc pl-4">
                  <li>Contributed to major public projects focusing on wood and natural materials.</li>
                  <li>Specialized in light-shadow choreography for cultural institutions.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif italic">BIG - Bjarke Ingels Group</h3>
                  <span className="text-xs text-muted">2005 — 2008</span>
                </div>
                <p className="text-sm uppercase tracking-widest mb-4">Architect (Copenhagen, Denmark)</p>
                <ul className="text-muted text-sm space-y-2 list-disc pl-4">
                  <li>Worked on large-scale urban planning and residential developments.</li>
                  <li>Developed innovative 3D modeling and visualization techniques.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif italic">ETH Zurich</h3>
                  <p className="text-xs text-muted uppercase tracking-widest">Master of Architecture</p>
                </div>
                <div>
                  <h3 className="text-lg font-serif italic">Oslo School of Architecture</h3>
                  <p className="text-xs text-muted uppercase tracking-widest">Bachelor of Design</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["Sustainable Design", "Urban Planning", "BIM", "Rhino 3D", "Revit", "Project Management", "Material Innovation", "Light Choreography"].map(skill => (
                  <span key={skill} className="text-[10px] uppercase tracking-widest border border-border px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  
  return (
    <div className="min-h-screen selection:bg-ink selection:text-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-center text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif tracking-widest uppercase"
        >
          <Link to="/">Aura</Link>
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em]">
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <Link to="/resume" className="hover:opacity-50 transition-opacity">Resume</Link>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 text-3xl font-serif"
        >
          <a href="#work" onClick={() => setIsMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <Link to="/resume" onClick={() => setIsMenuOpen(false)}>Resume</Link>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Architecture Hero"
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-9xl font-serif mb-6 italic"
          >
            Sculpting Space
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm md:text-base uppercase tracking-[0.4em] font-light"
          >
            Architecture for the Modern Soul
          </motion.p>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white opacity-50"
        >
          <div className="w-[1px] h-16 bg-white mx-auto" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section id="about" className="py-32 px-6 md:px-24 bg-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              We believe architecture is the <span className="italic">silent language</span> of human experience.
            </h2>
            <p className="text-muted leading-relaxed max-w-md text-lg">
              Aura is a boutique architectural studio based in Oslo, dedicated to creating spaces that harmonize with nature and elevate the human spirit. Our approach is minimal, yet deeply emotive.
            </p>
            <button className="mt-12 group flex items-center gap-4 text-xs uppercase tracking-widest font-medium">
              Our Philosophy <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] md:aspect-square"
          >
            <img 
              src="https://images.unsplash.com/photo-1518005020480-388a24563e66?auto=format&fit=crop&q=80&w=1000" 
              alt="Architectural Detail"
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-ink text-bg flex items-center justify-center rounded-full p-8 text-center text-xs uppercase tracking-widest leading-tight hidden md:flex">
              Est. 2012 <br /> Oslo, Norway
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-32 px-6 md:px-24 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Lead Architect"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-serif italic">Elias Thorne</h3>
                <p className="text-xs uppercase tracking-widest text-muted mt-2">Founder & Principal Architect</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 lg:pl-12"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted mb-6 block">The Visionary</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                "Architecture is not just about building; it's about <span className="italic">choreographing light</span> and shadow."
              </h2>
              <div className="space-y-6 text-muted leading-relaxed text-lg">
                <p>
                  With over 15 years of experience across Europe and Asia, Elias Thorne has developed a signature style that merges Scandinavian minimalism with organic fluidity. His work has been recognized for its sensitive use of natural materials and innovative light integration.
                </p>
                <p>
                  Before founding Aura, Elias spent a decade at renowned firms in Copenhagen and Tokyo, where he honed his belief that the best buildings are those that grow out of their environment rather than being imposed upon it.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-12">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Recognition</h4>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>Pritzker Prize Nominee (2025)</li>
                    <li>AIA Gold Medal (2023)</li>
                    <li>European Architecture Award</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Education</h4>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>MA Architecture, ETH Zurich</li>
                    <li>BA Design, Oslo School of Arch</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-32 px-6 md:px-24 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted mb-4 block">Selected Works</span>
              <h2 className="text-5xl md:text-7xl font-serif italic">Portfolio</h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs uppercase tracking-widest text-muted">01 — 04</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services / Approach */}
      <section className="py-32 px-6 md:px-24 bg-ink text-bg overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-4xl font-serif mb-12 sticky top-32">Our <br /> Expertise</h2>
          </div>
          <div className="md:col-span-8 space-y-24">
            {[
              { title: "Residential Design", desc: "Crafting intimate sanctuaries that reflect the unique rhythms of domestic life." },
              { title: "Urban Planning", desc: "Designing sustainable cityscapes that foster community and connectivity." },
              { title: "Interior Architecture", desc: "Curating the tactile experience of space through material and light." },
              { title: "Sustainable Innovation", desc: "Pushing the boundaries of eco-conscious construction and passive design." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-b border-white/10 pb-12"
              >
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block">0{i+1}</span>
                <h3 className="text-3xl md:text-5xl font-serif mb-6">{service.title}</h3>
                <p className="text-white/60 max-w-xl leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-bg">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-muted mb-8 block">Start a Conversation</span>
            <h2 className="text-5xl md:text-8xl font-serif mb-16 italic">Let's build <br /> something timeless.</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 items-center">
              <a href="mailto:hello@aura.arch" className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Email</div>
                <div className="text-xl md:text-2xl font-serif border-b border-transparent group-hover:border-ink transition-all">hello@aura.arch</div>
              </a>
              <div className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Location</div>
                <div className="text-xl md:text-2xl font-serif">Oslo, Norway</div>
              </div>
              <div className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Social</div>
                <div className="flex gap-6 justify-center">
                  <Instagram size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
                  <Linkedin size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-muted">
        <div>© 2026 Aura Architecture Studio</div>
        <div className="flex gap-12">
          <Link to="/resume" className="hover:text-ink transition-colors">Resume</Link>
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
        </div>
        <div>Built with Precision</div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
