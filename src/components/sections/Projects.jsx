import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RevealOnScroll } from "../RevealOnScroll";
import microkartsHeader from "/assets/images/microkarts-header.png";
import microkartsHeroImage from "/assets/images/microkarts-hero-image.png";
import sharediotHeader from "/assets/images/sharediot-header.png";
import sharediotHeroImage from "/assets/images/sharediot-hero-image.png";
import iotmakerHeader from "/assets/images/iotmaker-header.png";
import iotmakerHeroImage from "/assets/images/iotmaker-hero-image.png";
import storymakarHeader from "/assets/images/storymakar-header.png";
import storymakarHeroImage from "/assets/images/storymakar-hero-image.png";
import sixDofHeader from "/assets/images/6dof-header.png";
import sixDofHeroImage from "/assets/images/6dof-hero-image.png";
import constructionismHeader from "/assets/images/constructionism-header.jpg";
import iotcourseHeroImage from "/assets/images/iotcourse-hero-image.png";
import familyTreeHeroImage from "/assets/images/familytreeapp/Family-Tree-Generator-Thumbnail.png"; 

export const Projects = () => {
    const [showAllProjects, setShowAllProjects] = useState(false); // State to show/hide additional projects

    return (
        <section 
            id="projects" 
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                        Featured Projects
                    </h2>
                    {/* FEATURED PROJECTS GRID (2x2) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Project card #1 MICROKARTS */}
                        <Link 
                            to="/microkarts" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col group cursor-pointer no-underline"
                        >
                            <div className="mb-4">
                                <img 
                                    src={microkartsHeroImage} 
                                    alt="MicrokARts" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">MicrokARts</h3>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                MicrokARts empowers children to design, build, and program their own IoT-enabled karts using a block-based programming environment. The system encourages creative play and collaboration in a shared AR-IoT environment. Through hands-on activities, youth gain foundational skills in physical computing and interactive technology. The project was evaluated with both graduate experts and youth participants.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Augmented Reality", "Interaction Design", "Prototyping", "User Research"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>

                        {/* Project card #2 STORYMAKAR - FEATURED */}
                        <Link 
                            to="/storymakar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col group cursor-pointer no-underline"
                        >
                            <div className="mb-4">
                                <img 
                                    src={storymakarHeroImage} 
                                    alt="StoryMakAR" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">StoryMakAR</h3>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-justify">
                                StoryMakAR combines physical prototyping and storytelling through AR, allowing youth to build devices and create interactive stories. The toolkit uses block programming and event-based logic to bring virtual and physical worlds together. Workshops with high school students revealed strong engagement and creativity. The system is designed to lower barriers for maker-based storytelling in educational settings.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Augmented Reality", "Tangible UI", "Prototyping", "User Experience"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>

                        {/* Project card #3 IOT COURSE DESIGN - FEATURED */}
                        <Link 
                            to="/iotcourse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col group cursor-pointer no-underline"
                        >
                            <div className="mb-4">
                                <img 
                                    src={iotcourseHeroImage} 
                                    alt="IoT Course Design" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">IoT Course Design</h3>
                                        <h4 className="text-gray-400 text-xs mb-1">Research Paper (2025)</h4>
                                    </div>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-justify">
                                This project developed and implemented an IoT curriculum for high school enrichment programs using backward design and constructionist principles. Students learned electronics, programming, connectivity, and design through hands-on modules. The curriculum enabled students with little prior experience to successfully prototype IoT applications. Results show significant skill development and engagement.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["User-Centered Design", "Research", "Education", "Physical Computing"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>

                        {/* Project card #4 FAMILY TREE GENERATOR - FEATURED */}
                        <Link 
                            to="/familytreeapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col group cursor-pointer no-underline"
                        >
                            <div className="mb-4">
                                <img 
                                    src={familyTreeHeroImage} 
                                    alt="Family Tree Generator" 
                                    className="w-full h-48 sm:h-56 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-orange-400 transition-colors">Family Tree Generator</h3>
                                    <span className="text-xs text-orange-400 border border-orange-400/30 bg-orange-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                A full-stack web application that enables customers to design personalized, laser-ready family tree signs. Built for FlareTech Laser & Design, this tool transforms a complex customization process into an intuitive, real-time design experience with instant SVG/PDF export for manufacturing. Features include a 3-layer design system, AI-powered mockups, and secure Etsy order verification.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Product Design", "UX/UI", "Prototyping", "Full Stack"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs font-medium border border-orange-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>

                        {/* ========== ADDITIONAL PROJECTS (Hidden by default) ========== */}
                        
                        {/* Project card #5 SHARED IOT - ADDITIONAL */}
                        {showAllProjects && (
                        <Link 
                            to="/sharediot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn group cursor-pointer no-underline"
                        >
                            <div className="mb-4">
                                <img 
                                    src={sharediotHeroImage} 
                                    alt="ShARed IoT" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">ShARed IoT</h3>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                ShARed IoT enables users to interact with custom-built IoT devices through mobile augmented reality, supporting shared experiences across multiple smartphones. The system uses cloud anchors and a wireless protocol for real-time device control and AR content sharing.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Augmented Reality", "Spatial Computing", "Prototyping", "User Experience"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        )}

                        {/* Project card #6 IOT MAKER - ADDITIONAL */}
                        {showAllProjects && (
                        <Link 
                            to="/iotmaker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn group cursor-pointer no-underline" 
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="mb-4">
                                <img 
                                    src={iotmakerHeroImage} 
                                    alt="IoT Maker" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">IoT Maker</h3>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                IoT Maker is a web app for live programming and simulation of electronic devices using a drag-and-drop interface. Users can interact with sensors in real time and upload their code to custom hardware for hands-on control.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Interaction Design", "UX Research", "Prototyping", "Web Technologies"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        )}

                        {/* Project card #7 6-DOF ROBOTIC ARM - ADDITIONAL */}
                        {showAllProjects && (
                        <Link 
                            to="/6dof"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn group cursor-pointer no-underline" 
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="mb-4">
                                <img 
                                    src={sixDofHeroImage} 
                                    alt="6-DoF Robotic Arm" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">6-DoF Robotic Arm</h3>
                                    <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        View Case Study <span className="text-[10px]">↗</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                A 6-DoF robotic arm mounted on a mobile chassis, controlled via ESP32 and programmed in Arduino. A Unity3D interface enables remote operation using UDP with live video streaming.
                            </p>
                            {/* Curated Skills */}
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {["Spatial Interaction", "Unity3D", "Computer Vision", "HRI"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        )}
                    </div>

                    {/* View All Projects Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 text-blue-400 hover:border-blue-400 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                        >
                            <span>{showAllProjects ? 'Show Less' : 'View All Projects'}</span>
                            <span className="text-sm text-blue-500/70">({showAllProjects ? '−3' : '+3 more'})</span>
                            <svg 
                                className={`w-5 h-5 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};