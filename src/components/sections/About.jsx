import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import headshot from "/assets/images/Terrell-Headshot.png";
import purdueLogo from "/assets/images/Purdue_Boilermakers_logo.svg";
import morehouseLogo from "/assets/images/Morehouse_college_seal.svg";
import flareTechLogo from "/assets/images/flaretech-logo.png";
import toyDriveImage from "/assets/images/toydrive/ToyDrive-CierraTerrell.png";
import toyDriveImage1 from "/assets/images/toydrive/20241219_122342.jpg";
import toyDriveImage2 from "/assets/images/toydrive/20251207_122034.jpg";
import toyDriveImage3 from "/assets/images/toydrive/20251207_123949.jpg";
import toyDriveImage4 from "/assets/images/toydrive/20251207_130011.jpg";
import toyDriveImage5 from "/assets/images/toydrive/Screenshot_20241101_175339_Photos.jpg";
import geriImage1 from "/assets/images/ger2i/geri-2017.jpg";
import geriImage2 from "/assets/images/ger2i/geri-2018.jpg";
import geriImage3 from "/assets/images/ger2i/geri-2019.jpg";
import geriImage4 from "/assets/images/ger2i/IMG_20180703_140931.jpg";
import geriImage5 from "/assets/images/ger2i/IMG_20180703_140944.jpg";
import geriImage6 from "/assets/images/ger2i/IMG_20180726_182525.jpg";
import geriImage7 from "/assets/images/ger2i/IMG_20180726_182534.jpg";
import geriImage8 from "/assets/images/ger2i/IMG_20180726_182551.jpg";
import geriImage9 from "/assets/images/ger2i/IMG_20180726_182621.jpg";
import geriImage10 from "/assets/images/ger2i/IMG_20180726_182638.jpg";
import geriImage11 from "/assets/images/ger2i/IMG_20190712_170057.jpg";
import geriLogo from "/assets/images/ger2i/geri-logo.png";

// Thumbnail Carousel Component for Toy Drive
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full">
            {/* Main Image Display */}
            <div className="relative w-full mb-4 rounded-lg overflow-hidden aspect-[4/3]">
                <img 
                    src={images[currentIndex]} 
                    alt={`Tevin's Adaptive Toy Drive event ${currentIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
                />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-200 ${
                            idx === currentIndex 
                                ? 'ring-2 ring-purple-400 opacity-100 scale-105' 
                                : 'opacity-60 hover:opacity-80 hover:scale-105'
                        }`}
                        style={{ 
                            width: '80px', 
                            height: '60px',
                        }}
                        aria-label={`View image ${idx + 1}`}
                    >
                        <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper component for skill cards with progressive disclosure
const SkillCategory = ({ icon, title, skills }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedSkills = isExpanded ? skills : skills.slice(0, 3);

    return (
        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {displayedSkills.map((skill, key) => (
                    <span 
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
            {skills.length > 3 && (
                <div className="mt-auto pt-2">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1 w-full py-2 bg-blue-500/5 hover:bg-blue-500/10 rounded-lg"
                    >
                        {isExpanded ? "Show Less" : `View +${skills.length - 3} More`}
                    </button>
                </div>
            )}
        </div>
    );
};

export const About = () => {

    const researchSkills = [
        "User Research",
        "Usability Testing",
        "Mixed-Methods Research",
        "Contextual Inquiry",
        "Statistical Analysis",
        "A/B Testing"
    ];

    const designSkills = [
        "UX Design",
        "UI Design",
        "Data-driven Design",
        "Rapid Prototyping",
        "Design Systems",
        "User-Centered Design"
    ];

    const technicalSkills = [
        "Figma",
        "SolidWorks",
        "Autodesk Suite",
        "Sketch",
        "Principle"
    ];

    const programmingSkills = [
        "Python",
        "R",
        "C#",
        "C",
        "C++",
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Unity3D",
        "MATLAB"
    ];

    const aiMlSkills = [
        "Artificial Intelligence (AI)",
        "OpenCV",
        "Pytorch",
        "SIFT/SURF",
        "Cursor AI",
        "GitHub Copilot"
    ];

    const projectManagementSkills = [
        "Project Management",
        "Notion",
        "Stakeholder Advocacy",
        "Jira",
        "Agile Methodologies",
        "Miro"
    ];

    return (
        <section 
            id="about"
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                        About Me
                    </h2>    
                    <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border hover:-translate-y-1 transition-all">
                        {/* Headshot and Intro Section */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6 md:mb-8">
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-r from-orange-500 to-sky-600 overflow-hidden mb-4">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <img 
                                            src={headshot} 
                                            alt="Terrell Glenn" 
                                            className="w-full h-full object-cover"
                                            style={{ objectPosition: 'center 20%' }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Social Links */}
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/tglenn2012"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] touch-target"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <svg 
                                            className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" 
                                            fill="currentColor" 
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    
                                    <a
                                        href="https://www.github.com/tglenn2012"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] touch-target"
                                        aria-label="GitHub Profile"
                                    >
                                        <svg 
                                            className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" 
                                            fill="currentColor" 
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed font-medium">
                                    I am a technical leader that excels at driving impact across the entire product development lifecycle:
                                </p>
                                <ul className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed list-none">
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-500 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </span>
                                        <span>
                                            <strong className="text-white block sm:inline">Discovery & Strategy:</strong> Driving data-backed decisions through mixed-methods user research and stakeholder advocacy.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-500 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                            </svg>
                                        </span>
                                        <span>
                                            <strong className="text-white block sm:inline">Design & Prototyping:</strong> Translating insights into tangible solutions with rapid prototyping and iterative user-centered design.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-blue-500 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                            </svg>
                                        </span>
                                        <span>
                                            <strong className="text-white block sm:inline">Engineering & Execution:</strong> Bridging the gap between hardware, software, and AI to build scalable, high-impact products.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Notable Metrics Section */}
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center">Notable Metrics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">📚</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        100+
                                    </div>
                                    <div className="text-sm text-gray-400">Research Citations</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">📄</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        6+
                                    </div>
                                    <div className="text-sm text-gray-400">Publications</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">👥</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-400">STEAM Workshop Participants</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">💰</div>
                                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        $3-5M
                                    </div>
                                    <div className="text-sm text-gray-400">Impacted in NRE Costs</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Skills Section with Enhanced Visualization */}
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center">Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                <SkillCategory icon="🔬" title="Research" skills={researchSkills} />
                                <SkillCategory icon="🎨" title="Design" skills={designSkills} />
                                <SkillCategory icon="🛠️" title="Technical Skills" skills={technicalSkills} />
                                <SkillCategory icon="💻" title="Programming Languages" skills={programmingSkills} />
                                <SkillCategory icon="🤖" title="AI/ML" skills={aiMlSkills} />
                                <SkillCategory icon="📊" title="Project Management" skills={projectManagementSkills} />
                            </div>
                        </div>
                        
                        {/* Education Section - Individual Cards */}
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center">Education</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {/* Purdue Doctorate Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                    <div className="flex justify-center mb-4">
                                        <img 
                                            src={purdueLogo} 
                                            alt="Purdue University" 
                                            className="h-28 w-auto object-contain"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Doctorate</h4>
                                    <p className="text-gray-300 text-sm mb-2">Human-Computer Interaction</p>
                                    <p className="text-gray-400 text-xs">(Mechanical Engineering)</p>
                                </div>

                                {/* Morehouse Bachelor Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                    <div className="flex justify-center mb-4">
                                        <img 
                                            src={morehouseLogo} 
                                            alt="Morehouse College" 
                                            className="h-28 w-auto object-contain"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Bachelor of Science</h4>
                                    <p className="text-gray-300 text-sm mb-2">Physics</p>
                                </div>

                                {/* Certifications Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center flex flex-col items-center">
                                    <div className="flex justify-center mb-4 h-28 w-28 items-center bg-white/5 rounded-full p-4">
                                        <svg className="w-20 h-20" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Professional Certificate</h4>
                                    <p className="text-gray-300 text-sm mb-4">Google UX Design</p>
                                    <div className="mt-auto">
                                        <a 
                                            href="https://coursera.org/share/39a90bb26e004de67de5a57a081c8ead"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-6 py-2 rounded-lg text-sm transition"
                                        >
                                            View Certificate
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Experience Section - Individual Cards */}
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center">Professional Experience</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Microsoft Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                                        <div className="flex-shrink-0 rounded-lg p-3 flex items-center justify-center h-20 w-20 bg-white/5 border border-white/10">
                                            <svg className="h-full w-full" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                                <rect x="0" y="0" width="51" height="51" fill="#F25022"/>
                                                <rect x="57" y="0" width="51" height="51" fill="#7FBA00"/>
                                                <rect x="0" y="57" width="51" height="51" fill="#00A4EF"/>
                                                <rect x="57" y="57" width="51" height="51" fill="#FFB900"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                                                <h4 className="text-lg font-bold leading-tight">Hardware Engineer & Technical Product Manager</h4>
                                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                    May 2022 - Aug 2025
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">Microsoft Corporation</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-3 space-y-2">
                                        <li>Driven product strategy for AI-powered infrastructure tools by translating mixed-methods research into actionable roadmap decisions.</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Hardware Strategy & Planning Culture Award (2023)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">BAM Minority Student Day Volunteer Speaker (2023-2025)</span>
                                    </div>
                                </div>

                                {/* Flare Tech Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                                        <div className="flex-shrink-0 rounded-lg p-2 flex items-center justify-center h-20 w-20 bg-white/5 border border-white/10">
                                            <img 
                                                src={flareTechLogo} 
                                                alt="Flare Tech Logo" 
                                                className="h-full w-full object-contain"
                                                onError={(e) => {
                                                    console.error(`Failed to load Flare Tech logo`);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                                                <h4 className="text-lg font-bold leading-tight">Product Design Consultant</h4>
                                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                    Jan 2020 - Present
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">Flare Tech: Laser & Design LLC</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-3 space-y-2">
                                        <li>Achieved 95% engagement uplift and a 5-star rating by applying rapid prototyping and A/B testing to custom product design.</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">100% Satisfaction Rate</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">5-Star Etsy Rating</span>
                                    </div>
                                </div>

                                {/* Purdue Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                                        <div className="flex-shrink-0 rounded-lg p-2 flex items-center justify-center h-20 w-20 bg-white/5 border border-white/10">
                                            <img 
                                                src={purdueLogo} 
                                                alt="Purdue University Logo" 
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                                                <h4 className="text-lg font-bold leading-tight">UX Researcher</h4>
                                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                    Aug 2016 - Jun 2022
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">Purdue University (Convergence Design Lab)</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-3 space-y-2">
                                        <li>Improved user comprehension by 25% for AR/IoT technologies through rigorous user studies and iterative prototyping with 150+ participants.</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Outstanding Graduate Student Service Award (2020)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">NSF Graduate Research Fellowship Program (2017 - 2022)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Graduate Education for Minorities (GEM) Fellowship</span>
                                    </div>
                                </div>

                                {/* Intel Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                                        <div className="flex-shrink-0 rounded-lg p-3 flex items-center justify-center h-20 w-20 bg-white/5 border border-white/10">
                                            <img 
                                                src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" 
                                                alt="Intel Corporation Logo" 
                                                className="h-full w-full object-contain"
                                                onError={(e) => {
                                                    console.error(`Failed to load Intel logo`);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-1">
                                                <h4 className="text-lg font-bold leading-tight">Software Engineering Intern</h4>
                                                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                    Jun 2016 - Aug 2016
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">Intel Corporation (Performance Analysis Center)</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-3 space-y-2">
                                        <li>Optimized system configurations for major OEM customers by benchmarking 40+ workloads, directly influencing $2M+ in revenue.</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">$2M+ Revenue Impact</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service & Leadership Section */}
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center">Service & Leadership</h3>
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                                    <div className="flex-shrink-0 w-full md:w-1/3">
                                        <ImageCarousel images={[toyDriveImage, toyDriveImage1, toyDriveImage2, toyDriveImage3, toyDriveImage4, toyDriveImage5]} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                                            <h4 className="text-lg font-bold leading-tight">Tevin's Adaptive Toy Drive</h4>
                                            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                Dec 2023 - Present
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">Founding Program Lead & Adaptive Design Workshop Host</p>
                                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Transformed a grassroots, seasonal effort into a sustainable, systems-level community program dedicated to inclusive play, expanding the initiative to a year-round service through partnerships with local businesses, non-profits organizations, and community members.
                                        </p>
                                        <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-4 space-y-2">
                                            <li>Built and managed institutional partnerships with clinical organizations, including Seattle Children's Hospital, Boyer Children's Clinic, and the Down Syndrome Center of Puget Sound, establishing a sustainable pipeline that has distributed over 100 adaptive toys to children with disabilities.</li>
                                            <li>Designed and delivered inclusive design workshops for community members and corporate partners (e.g., securing corporate engagement for an upcoming 55-employee adaptation event). The workshops trained participants on repeatable, safe processes for modifying electronic toys (dismantling, rewiring switches).</li>
                                            <li>Leveraged human-centered research and collaboration with occupational therapists to ideate and refine toy adaptations for complex needs (e.g., cerebral palsy, motor-functioning challenges), ensuring solutions adhere to accessibility standards.</li>
                                            <li>Employed media coverage and storytelling to successfully raise awareness for the program, validate the importance of adaptive play, and attract institutional support.</li>
                                        </ul>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Adaptive Design</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Inclusive Play</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Community Engagement</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Workshop Design</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <a 
                                                href="https://www.seattletimes.com/life/byrd-barr-place-hosts-first-ever-tevins-adaptive-toy-drive-to-support-kids-with-disabilities/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg text-sm transition border border-blue-500/30"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                Seattle Times Article
                                            </a>
                                            <a 
                                                href="https://www.seattleschild.com/tevins-adaptive-toy-drive/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg text-sm transition border border-blue-500/30"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                Seattle's Child Article
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GER2I Smart Toys & Robots Course */}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all mt-6">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex-shrink-0 w-full md:w-1/3">
                                        <ImageCarousel images={[geriImage1, geriImage2, geriImage3, geriImage4, geriImage5, geriImage6, geriImage7, geriImage8, geriImage9, geriImage10, geriImage11]} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                                            <h4 className="text-lg font-bold leading-tight">GER²I Smart Toys & Robots Course</h4>
                                            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                                Summer 2017 - 2019
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">Course Designer & Lead Instructor</p>
                                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                            Designed and led the Smart Toys & Robots summer workshop for rising 9-12 grade students in partnership with Purdue University's Gifted Education Research and Resource Institute (GER²I). The course exposed gifted and talented youth to interdisciplinary STEM concepts including fabrication, programming, electronics, and IoT development.
                                        </p>
                                        <ul className="list-disc list-outside ml-4 text-gray-300 text-sm mb-4 space-y-2">
                                            <li>Created comprehensive curriculum that integrated hands-on learning with everyday materials (cardboard, plastic bottles, aluminum cans) and electronic components to build interconnected toy networks.</li>
                                            <li>Led 14 students through a culminating Battlebots competition project, where teams of 3-4 students designed WiFi-controlled robots to compete in balloon-popping challenges, reinforcing concepts in mechanical design, programming, and wireless communication.</li>
                                            <li>Established the foundation for ME 496: Design and Prototyping of Smart Things, a successful sophomore-level course in Purdue's School of Mechanical Engineering, demonstrating the scalability of the curriculum design.</li>
                                            <li>Received exceptional student feedback, with a four-year GER²I participant describing it as "by far the best class I have taken" and highlighting learning outcomes in circuits, augmented reality, and CAD software.</li>
                                        </ul>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Curriculum Design</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">STEM Education</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Youth Mentorship</span>
                                            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">Workshop Leadership</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </RevealOnScroll>
        </section>
    );
}
