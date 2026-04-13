/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Linkedin, Mail, Phone, Menu, X, ChevronLeft, ChevronRight, Download, ArrowLeft } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const PROJECTS = [
  {
    id: 1,
    title: "Mondrian Object",
    category: "Object Design",
    year: "Spring 2024",
    images: [
      "/images/mondrian-painting.png",
      "/images/mondrian-axon.png",
      "/images/mondrian-exploded-axon.png",
      "/images/mondrian-hierarchy-diagram.png",
      "/images/mondrian-technical.png"
    ],
    imageTypes: ["Painting", "Axonometric", "Exploded Axonometric", "Hierarchy Diagram", "Plans"],
    description: "Piet Mondrian was a Dutch artist who composed abstract art using geometry, such as lines, squares, and rectangles. The painting uses color to represent solids and white spaces to represent space. The black spaces symbolize neutral areas used to provide a visual pause for the viewer's eye from the solids. The Mondrian Object explores what exists beyond the painting through a tectonic system of core, shelves, and interlocking.",
    specs: [
      { label: "Location", value: "College Park, MD" },
      { label: "Type", value: "Painting" },
      { label: "Materials", value: "TBD" },
      { label: "Year", value: "Spring 2024" }
    ]
  },
  {
    id: 2,
    title: "Jackson Family Retreat Home",
    category: "Residential",
    year: "Fall 2025",
    images: [
      "/images/jackson-elevation.png",
      "/images/jackson-transverse-section.png",
      "/images/jackson-diagram.png",
      "/images/mondrian-part-mass.png"
    ],
    description: "The Jackson Family Retreat Home is located in Big Sur California and designed by Fougeron Architecture in 2005. The California household consists of a series of connected volumes that balance open and secluded spaces through transparency and material variation. The home is composed of three volumes being the perpendicular wing with the bedroom spaces and living room space, the front copper screen wall, and the vertical circulation defined by concrete walls. The front copper linear form runs parallel to the Canyon and serves as the building's datum used to ground the composition while highlighting the relationship of the masses.",
    specs: [
      { label: "Location", value: "Big Sur, CA" },
      { label: "Area", value: "TBD" },
      { label: "Materials", value: "TBD" },
      { label: "Year", value: "Fall 2025" }
    ]
  }
];

type Project = typeof PROJECTS[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 })
  };

  const nextImage = () => { setDirection(1); setCurrentImageIndex((prev) => (prev + 1) % project.images.length); };
  const prevImage = () => { setDirection(-1); setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length); };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-8 border-b border-border">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted mb-2 block">{project.category}</span>
            <h2 className="text-3xl font-serif">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:opacity-50 transition-opacity">
            <X size={24} />
          </button>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
            <button onClick={prevImage} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {project.images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? "bg-white w-4" : "bg-white/40 w-1.5"}`} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-4">Description</h3>
            <p className="text-muted leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-4">Specifications</h3>
            <div className="space-y-4">
              {project.specs.map(({ label, value }) => {
                const displayValue = label === "Type" && project.imageTypes
                  ? project.imageTypes[currentImageIndex] ?? value
                  : value;
                return (
                  <div key={label} className="border-b border-border pb-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{label}</p>
                    <p className="text-sm font-medium">{displayValue}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  onOpen: (project: typeof PROJECTS[0]) => void;
  key?: React.Key;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
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
      className="group cursor-pointer w-full"
      onClick={() => onOpen(project)}
    >
      <div className="mb-8">
          <h3 className="text-2xl font-serif mb-2 group-hover:italic transition-all">{project.title}</h3>
      </div>
      <div className="overflow-hidden mb-8 aspect-[16/9] relative bg-neutral-100">
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
            className="absolute inset-0 w-full h-full object-contain"
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
      <div className="flex justify-end">
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
            <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Kyle Delgado</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">Fourth Year Architecture Student</p>
            <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 text-sm text-muted">
              <span>Manassas, VA</span>
              <span>kyifc03@gmail.com</span>
              <span>(703)-512-6829</span>
              <span>www.kydeldesign.com</span>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Profile</h2>
            <p className="text-muted leading-relaxed text-lg">
              Fourth Year Architecture Student with a minor in Construction Project Management. Experienced in managing project documentation and adept in utilizing design software. An effective team collaborator with strong analytical skills demonstrated through both volunteer and professional roles.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Experience</h2>
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif italic">Manhattan Construction Company</h3>
                  <span className="text-xs text-muted">May 2022 — Aug 2022</span>
                </div>
                <p className="text-sm uppercase tracking-widest mb-4">Project Intern · Arlington, VA</p>
                <ul className="text-muted text-sm space-y-2 list-disc pl-4">
                  <li>Assisted in the creation of RFI's and Submittals.</li>
                  <li>Annotation and interpretation of Civil, Structural, and Mechanical drawings.</li>
                  <li>Revisions of Material and Purchasing Expedited Logs.</li>
                  <li>Created Factory and Field-Testing logs to monitor lead times as well as the quality of all materials and equipment.</li>
                  <li>Conducted Field Inspections and documented reports to ensure compliance with project specifications.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif italic">Holy Family Catholic Church</h3>
                  <span className="text-xs text-muted">Nov 2018 — Apr 2019</span>
                </div>
                <p className="text-sm uppercase tracking-widest mb-4">Church Volunteer · Dale City, VA</p>
                <ul className="text-muted text-sm space-y-2 list-disc pl-4">
                  <li>Assisted in implementing ideas for holiday youth events.</li>
                  <li>Demonstrated and educated new volunteers about church procedures, values and objectives for church events.</li>
                  <li>Planned and organized a reception for church meetings.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif italic">University of Maryland</h3>
                  <p className="text-xs text-muted uppercase tracking-widest">Bachelor of Architecture</p>
                  <p className="text-xs text-muted mt-1">GPA 3.52</p>
                </div>
                <div>
                  <h3 className="text-lg font-serif italic">University of Maryland</h3>
                  <p className="text-xs text-muted uppercase tracking-widest">Minor in Construction Project Management</p>
                  <p className="text-xs text-muted mt-1">GPA 3.43</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 border-b border-border pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["Sketchup", "AutoCAD", "BIM", "Rhino 3D", "Revit", "Project Management", "Sefaira", "Climate Consultant", "Procore", "Primavera P6"].map(skill => (
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

function Sketches() {
  const placeholders = Array.from({ length: 9 });

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-muted mb-4 block">Selected Works</span>
          <h1 className="text-5xl md:text-7xl font-serif italic">Sketches</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-muted">Image {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-24">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted mb-4 block">Selected Works</span>
          <h2 className="text-5xl md:text-7xl font-serif italic">Portfolio</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-32">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
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
          <Link to="/">kydeldesign</Link>
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em]">
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <Link to="/explorations" className="hover:opacity-50 transition-opacity">Sketches</Link>
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
          <Link to="/explorations" onClick={() => setIsMenuOpen(false)}>Sketches</Link>
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
            src="/images/hero-sketch.png"
            alt="Architecture Sketch"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </motion.div>

        {/* Gradient overlay — dark at bottom, transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-9xl font-serif mb-6 italic"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
          >
            Design.Build.Evolve
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm md:text-base uppercase tracking-[0.4em] font-light mb-10"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            Furniture Design · Residential
          </motion.p>
          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="inline-flex items-center gap-3 border border-white/60 text-white text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            View Project <ArrowRight size={14} />
          </motion.a>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white opacity-80"
        >
          <div className="w-[1px] h-16 bg-white mx-auto" />
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-32 px-6 md:px-24 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden w-full mx-auto lg:mx-0">
                <img
                  src="/images/profile.jpg"
                  alt="Lead Architect"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-4xl font-serif italic">Kyle Delgado</h3>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 lg:pl-12"
            >
              <div className="space-y-6 text-muted leading-relaxed text-lg">
                <p>
                  I am an emerging architect who designs with purpose and structure. My work explores how geometry, material, and light can shape meaningful experiences. I believe architecture should be intentional, where every line, proportion, and decision is grounded in logic and clarity.
                </p>
                <p>
                  I value intentional, innovative, and high-performance design. My approach blends conceptual exploration with digital fabrication to translate ideas into building systems that are both expressive and pragmatic. I intend on becoming a Licensed Architect in Washington D.C., Maryland, and Virginia and obtain my LEED Green Associate and LEED BD+C certifications to design buildings that are efficient and environmentally impactful.
                </p>
              </div>

              <div className="mt-16 border-t border-border pt-12">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-4">Education</h4>
                  <ul className="text-sm space-y-2 text-muted">
                    <li>Bachelor of Architecture, University of Maryland</li>
                    <li>Minor Construction Project Management, University of Maryland</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-32 px-6 md:px-24 bg-[#F9F9F9]">
        <ProjectsGrid />
      </section>

      {/* Services / Approach */}
      <section className="py-32 px-6 md:px-24 bg-ink text-bg overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-4xl font-serif mb-12 sticky top-32">My <br /> Expertise</h2>
          </div>
          <div className="md:col-span-8 space-y-24">
            {[
              { title: "Object Design", desc: "Crafting intimate sanctuaries that reflect the unique rhythms of domestic life." },
              { title: "Residential Design", desc: "Designing sustainable cityscapes that foster community and connectivity." },
              { title: "Parametric Design", desc: "Curating the tactile experience of space through material and light." }
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
            
            {/* Map */}
            <div className="relative w-full max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden" style={{ height: "320px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49805.08!2d-77.50788!3d38.75087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b6497c2316ea01%3A0x2f6e34fc4e73a25e!2sManassas%2C%20VA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                title="Manassas VA Map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 items-center">
              <a href="mailto:kyifc03@gmail.com" className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Email</div>
                <div className="text-xl md:text-2xl font-serif border-b border-transparent group-hover:border-ink transition-all">kyifc03@gmail.com</div>
              </a>
              <div className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Location</div>
                <div className="text-xl md:text-2xl font-serif">Manassas, VA</div>
              </div>
              <div className="group">
                <div className="text-xs uppercase tracking-widest text-muted mb-2">Social</div>
                <div className="flex gap-6 justify-center">
<a href="https://www.linkedin.com/in/kyle-delgado-5614b5302" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
                  </a>
                  <a href="tel:+17035126829">
                    <Phone size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-muted">
        <div>© 2026 kydeldesign</div>
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
        <Route path="/explorations" element={<Sketches />} />
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
