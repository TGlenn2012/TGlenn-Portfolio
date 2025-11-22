import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../RevealOnScroll";

// Reusable Image Carousel Component with Captions
const ImageCarouselWithCaptions = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    // Add keyboard event listener for carousel navigation
    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevImage();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextImage();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [images, currentIndex]);

    if (!images || images.length === 0) return null;

    const currentImage = images[currentIndex];
    const isPNG = currentImage.src.toLowerCase().endsWith('.png');

    return (
        <div className="relative mt-4" role="region" aria-label="Image carousel">
            <div className="glass rounded-xl p-6 border-white/10 border overflow-hidden">
                <div className={`relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex items-center justify-center rounded-lg overflow-hidden ${
                    isPNG ? 'bg-white' : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
                }`}>
                    <img 
                        src={currentImage.src} 
                        alt={currentImage.caption || `Image ${currentIndex + 1} of ${images.length}`}
                        className="max-w-full max-h-[500px] object-contain rounded-lg"
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        prevImage();
                                    }
                                }}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 focus:bg-blue-500/40 text-white p-3 sm:p-4 rounded-full transition-all border-2 border-blue-500/30 focus:border-blue-500 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        nextImage();
                                    }
                                }}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 focus:bg-blue-500/40 text-white p-3 sm:p-4 rounded-full transition-all border-2 border-blue-500/30 focus:border-blue-500 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Caption */}
                {images[currentIndex].caption && (
                    <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
                        <p className="text-gray-200 text-sm leading-relaxed">
                            {images[currentIndex].caption}
                        </p>
                    </div>
                )}

                {/* Dots Indicator */}
                {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Image navigation">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToImage(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        goToImage(index);
                                    }
                                }}
                                role="tab"
                                aria-selected={index === currentIndex}
                                aria-label={`Go to image ${index + 1} of ${images.length}`}
                                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                    index === currentIndex
                                        ? "bg-blue-500 w-8"
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const IoTMaker = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeComponent, setActiveComponent] = useState(0);

    const handleCardClick = (index) => {
        if (isAnimating) return;
        if (expandedCard === index) {
            setIsAnimating(true);
            setExpandedCard(null);
            setTimeout(() => setIsAnimating(false), 300);
        } else {
            setIsAnimating(true);
            if (expandedCard !== null) {
                setExpandedCard(null);
                setTimeout(() => {
                    setExpandedCard(index);
                    setTimeout(() => setIsAnimating(false), 300);
                }, 300);
            } else {
                setExpandedCard(index);
                setTimeout(() => setIsAnimating(false), 300);
            }
        }
    };

    return (
        <main className="min-h-screen pt-20">
            {/* Skip to content link */}
            <a href="#overview" className="skip-link">
                Skip to main content
            </a>
            
            {/* Overview/Project Summary Section */}
            <section 
                id="overview" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="Overview and Project Summary"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent text-center">
                            IoT Maker
                        </h1>
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> IoT Maker: Creating High-Level Electro-Mechanical Devices Through Live Programming for Youth
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Research Project
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/iotmaker-header.png" 
                                            alt="IoT Maker Interface Overview" 
                                            className="w-full rounded-lg mb-2"
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            IoT Maker is a web application that uses live programming to simulate various electronic devices, enabling youth to learn programming and electronics in an accessible way. Users (a) drag-and-drop blocks of code into the programming environment and (b) watch their code execute in real-time on the screen, while interacting with sensors via sliders, buttons, and color pickers. Once users have a sufficient understanding of the functionality of their code, they can (c) upload the code to our customized iBoard and (d) connect their phone, tablet, or computer to the iBoard to control the electronics via WiFi.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> Microcontrollers are a popular tool to use when designing electro-mechanical devices with low-level functionality, and those with more complex, high-level functionality. Block-based programming interfaces are ideal environments to program physical computing devices, lowering the barrier of entry for novice programmers. The advent of live programming yields a more engaging and thorough process of programming such devices but leaves much to be desired due to primitive functionalities or high barriers of entry. To understand the impact of live programming on designing complex electro-mechanical devices, we developed a plug-and-play electronics module and an accompanying block-based live programming environment. We conducted an evaluation study with 4 expert users to elicit critical feedback and validity, followed by a user study with 15 youths (age=11-18). The results show that our system helps reduce the barrier to entry for youths to create electro-mechanical devices with advanced functionalities and a novice understanding of the field at baseline.
                                </p>
                                
                                {/* Video Embed */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Project Video</h3>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/8j_6nkkeK_c?si=Ai_biSI57dN5DuWJ"
                                            title="IoT Maker Project Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>

                            {/* My Role Cards */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">My Role</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🔬</div>
                                        <div className="text-xl font-bold text-white mb-2">Principal Investigator</div>
                                        <div className="text-sm text-gray-300">Led research direction and methodology, designed experiments, conducted human-subjects studies, and analyzed data using mixed-methods research practices.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🔧</div>
                                        <div className="text-xl font-bold text-white mb-2">Embedded Systems Engineer</div>
                                        <div className="text-sm text-gray-300">Designed and developed the iBoard hardware system, including all laser cut and 3D printed parts, UX interactions, and electronics ecosystem</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">📚</div>
                                        <div className="text-xl font-bold text-white mb-2">Curriculum Designer</div>
                                        <div className="text-sm text-gray-300">Created educational content and learning modules and conducted workshops in a middle school setting</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* The Problem Section */}
            <section 
                id="problem" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="The Problem"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                The Problem
                            </h2>
                            
                            {/* Summarized Introduction */}
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                                    Physical computing has transformed education, giving students new ways to learn programming and electronics. However, creating advanced IoT devices remains challenging for youth due to complex barriers at the intersection of live programming, block-based languages, and IoT technologies.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🧩</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Block Programming Gap</h3>
                                        <p className="text-sm text-gray-200">
                                            While block-based programming makes coding accessible, Arduino and similar platforms lack native block programming support, creating barriers for novice users.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">⚡</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Live Programming Limitations</h3>
                                        <p className="text-sm text-gray-200">
                                            Live programming helps debug code, but existing platforms don't fully integrate with IoT development, leaving a gap between learning and creating working prototypes.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🌐</div>
                                        <h3 className="text-lg font-bold text-white mb-2">IoT Complexity</h3>
                                        <p className="text-sm text-gray-200">
                                            IoT requires advanced networking knowledge that novice programmers don't typically have, making it difficult to create sophisticated electro-mechanical devices.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Gap */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The Intersection Gap</h3>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                        While live programming, block-based languages, and IoT each offer tremendous educational opportunities individually, there exists a critical gap at their intersection. This gap prevents novice users from creating advanced electro-mechanical devices that go beyond basic microcontroller capabilities.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔴</div>
                                            <p className="text-sm text-gray-200">Live Programming</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🟡</div>
                                            <p className="text-sm text-gray-200">Block-Based Languages</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔵</div>
                                            <p className="text-sm text-gray-200">IoT Technologies</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">=</div>
                                        <div className="glass rounded-xl p-4 border-green-500/30 border bg-green-500/10 text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">✨</div>
                                            <p className="text-sm font-semibold text-green-300">IoT Maker</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Our Contributions */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Contributions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Design Rationale</h4>
                                        <p className="text-sm text-gray-200">
                                            I extracted design principles from 4 experts in physical computing, electronics, and prototyping to create a system that allows novice users to prototype electro-mechanical IoT devices.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">IoT Maker System</h4>
                                        <p className="text-sm text-gray-200">
                                            I developed a complete platform with plug-and-play electronics, block programming, live simulation, and a companion app for WiFi control.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Evaluation Results</h4>
                                        <p className="text-sm text-gray-200">
                                            I conducted a study with 15 youth (age 11-18) showing that users could create more complex electro-mechanical devices than without the system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* My Role and Responsibilities Section */}
            <section 
                id="rr" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="My Role and Responsibilities"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                My Role and Responsibilities
                            </h2>
                            
                            {/* Process Timeline */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">My Design Process</h3>
                                <div className="relative">
                                    {/* Timeline Container with Line and Dots */}
                                    <div className="relative mb-12 hidden md:block">
                                        <div className="relative flex justify-between items-center">
                                            <div className={`relative z-10 transition-all duration-300 ${
                                                expandedCard === 0 ? 'scale-150' : 'scale-100'
                                            }`}>
                                                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                                            </div>
                                            <div className="absolute top-1/2 left-[0.75rem] right-[0.75rem] h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 -translate-y-1/2 z-0"></div>
                                            <div className={`relative z-10 transition-all duration-300 ${
                                                expandedCard === 1 ? 'scale-150' : 'scale-100'
                                            }`}>
                                                <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-black"></div>
                                            </div>
                                            <div className={`relative z-10 transition-all duration-300 ${
                                                expandedCard === 2 ? 'scale-150' : 'scale-100'
                                            }`}>
                                                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Cards */}
                                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                        <div className="relative flex-1 max-w-xs w-full">
                                            <button
                                                onClick={() => handleCardClick(0)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleCardClick(0);
                                                    }
                                                }}
                                                className={`w-full glass rounded-2xl border-white/10 border transition-all duration-300 cursor-pointer relative overflow-hidden group bg-black/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                    expandedCard === 0 
                                                        ? 'p-6 border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105' 
                                                        : 'p-5 hover:border-blue-500/30 hover:scale-105 focus:border-blue-500/50'
                                                }`}
                                                aria-expanded={expandedCard === 0}
                                                aria-label="Expand Research and Discovery card"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                    expandedCard === 0 ? 'opacity-100' : ''
                                                }`}></div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-center gap-3 mb-2">
                                                        <span className="text-2xl">🔍</span>
                                                        <h4 className="text-lg font-bold text-white">Research & Discovery</h4>
                                                    </div>
                                                    <div className={`overflow-hidden transition-all duration-300 ${
                                                        expandedCard === 0 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                    }`}>
                                                        <p className="text-sm text-gray-200 leading-relaxed">
                                                            I researched existing programming education tools and identified gaps in IoT education for youth. I analyzed barriers to entry in electronics and programming education. I conducted interviews with 4 experts in physical computing devices, electronics, and physical prototyping to extract design rationale for a system that allows novice users to prototype electro-mechanical IoT devices.
                                                        </p>
                                                    </div>
                                                    {expandedCard !== 0 && (
                                                        <div className="flex items-center justify-center mt-2">
                                                            <span className="text-xs text-blue-400 opacity-70 animate-pulse">Click to expand</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        </div>

                                        <div className="relative flex-1 max-w-xs w-full">
                                            <button
                                                onClick={() => handleCardClick(1)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleCardClick(1);
                                                    }
                                                }}
                                                className={`w-full glass rounded-2xl border-white/10 border transition-all duration-300 cursor-pointer relative overflow-hidden group bg-black/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                    expandedCard === 1 
                                                        ? 'p-6 border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105' 
                                                        : 'p-5 hover:border-cyan-500/30 hover:scale-105 focus:border-cyan-500/50'
                                                }`}
                                                aria-expanded={expandedCard === 1}
                                                aria-label="Expand Design and Development card"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                    expandedCard === 1 ? 'opacity-100' : ''
                                                }`}></div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-center gap-3 mb-2">
                                                        <span className="text-2xl">💡</span>
                                                        <h4 className="text-lg font-bold text-white">Design & Development</h4>
                                                    </div>
                                                    <div className={`overflow-hidden transition-all duration-300 ${
                                                        expandedCard === 1 ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                    }`}>
                                                        <p className="text-sm text-gray-200 leading-relaxed mb-3">
                                                            I designed and developed the complete IoT Maker system:
                                                        </p>
                                                        <ul className="text-sm text-gray-200 leading-relaxed space-y-2 list-disc list-inside ml-2">
                                                            <li><strong className="text-white">Block Programming Interface:</strong> Built on Google's Blockly, modified Blocklyduino for ESP32 compatibility with custom functions and component-specific blocks</li>
                                                            <li><strong className="text-white">Live Simulator:</strong> Developed a visual simulator that allows users to test code without hardware, with interactive controllers for real-time feedback</li>
                                                            <li><strong className="text-white">iBoard Hardware:</strong> Designed custom PCB with ESP32 Feather Board, 10 I/O ports (5 input, 5 output), three power sources, and plug-and-play electronics repository</li>
                                                            <li><strong className="text-white">Mobile App:</strong> Created Unity-based multi-platform application with four control methods (Action, Toggle, Slider, Directional Pad) using UDP communication</li>
                                                        </ul>
                                                    </div>
                                                    {expandedCard !== 1 && (
                                                        <div className="flex items-center justify-center mt-2">
                                                            <span className="text-xs text-cyan-400 opacity-70 animate-pulse">Click to expand</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        </div>

                                        <div className="relative flex-1 max-w-xs w-full">
                                            <button
                                                onClick={() => handleCardClick(2)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleCardClick(2);
                                                    }
                                                }}
                                                className={`w-full glass rounded-2xl border-white/10 border transition-all duration-300 cursor-pointer relative overflow-hidden group bg-black/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                    expandedCard === 2 
                                                        ? 'p-6 border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105' 
                                                        : 'p-5 hover:border-blue-500/30 hover:scale-105 focus:border-blue-500/50'
                                                }`}
                                                aria-expanded={expandedCard === 2}
                                                aria-label="Expand Testing and Evaluation card"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                    expandedCard === 2 ? 'opacity-100' : ''
                                                }`}></div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-center gap-3 mb-2">
                                                        <span className="text-2xl">🧪</span>
                                                        <h4 className="text-lg font-bold text-white">Testing & Evaluation</h4>
                                                    </div>
                                                    <div className={`overflow-hidden transition-all duration-300 ${
                                                        expandedCard === 2 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                    }`}>
                                                        <p className="text-sm text-gray-200 leading-relaxed">
                                                            I conducted user studies with youth to evaluate the effectiveness of live programming and the iBoard system. I iterated on the design based on user feedback and learning outcomes.
                                                        </p>
                                                    </div>
                                                    {expandedCard !== 2 && (
                                                        <div className="flex items-center justify-center mt-2">
                                                            <span className="text-xs text-blue-400 opacity-70 animate-pulse">Click to expand</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Design Goals */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Design Goals</h3>
                                <p className="text-center text-gray-200 mb-6 max-w-2xl mx-auto">
                                    Based on my research and design process, I established core design goals that guided the IoT Maker system development.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">⚡</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Live Execution</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Real-time code execution for immediate feedback and learning.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🎯</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Accessibility</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Low barriers to entry with block-based programming interface.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🔄</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Rapid Iteration</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Enable quick testing and learning through immediate feedback.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🌐</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">IoT Integration</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Seamless connection between programming and physical devices.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">📱</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Multi-Platform</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Support for phone, tablet, and computer connectivity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Process and Solution Section */}
            <section 
                id="process" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="Process and Solution"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Process and Solution
                            </h2>
                            
                            {/* System Overview - Visual Architecture */}
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The IoT Maker System Architecture</h3>
                                <p className="text-center text-gray-200 mb-8 max-w-3xl mx-auto">
                                    I designed IoT Maker as a complete IoT creation platform with four interconnected subsystems that work together to enable live programming, hardware simulation, and wireless device control.
                                </p>
                                
                                {/* Component Selection Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div 
                                        className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                            activeComponent === 0 
                                                ? 'border-blue-500/80 bg-blue-500/20 scale-105 shadow-lg shadow-blue-500/30' 
                                                : 'border-white/10 hover:scale-105 hover:border-blue-500/30 focus:border-blue-500/50'
                                        }`}
                                        onClick={() => setActiveComponent(0)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveComponent(0);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Select Block Programming Interface component"
                                        aria-pressed={activeComponent === 0}
                                    >
                                        <div className="text-4xl mb-2">🧩</div>
                                        <h4 className="text-sm font-bold text-white">Block Programming</h4>
                                    </div>
                                    <div 
                                        className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black ${
                                            activeComponent === 1 
                                                ? 'border-cyan-500/80 bg-cyan-500/20 scale-105 shadow-lg shadow-cyan-500/30' 
                                                : 'border-white/10 hover:scale-105 hover:border-cyan-500/30 focus:border-cyan-500/50'
                                        }`}
                                        onClick={() => setActiveComponent(1)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveComponent(1);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Select Live Simulator component"
                                        aria-pressed={activeComponent === 1}
                                    >
                                        <div className="text-4xl mb-2">⚡</div>
                                        <h4 className="text-sm font-bold text-white">Live Simulator</h4>
                                    </div>
                                    <div 
                                        className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${
                                            activeComponent === 2 
                                                ? 'border-green-500/80 bg-green-500/20 scale-105 shadow-lg shadow-green-500/30' 
                                                : 'border-white/10 hover:scale-105 hover:border-green-500/30 focus:border-green-500/50'
                                        }`}
                                        onClick={() => setActiveComponent(2)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveComponent(2);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Select iBoard Hardware component"
                                        aria-pressed={activeComponent === 2}
                                    >
                                        <div className="text-4xl mb-2">🔌</div>
                                        <h4 className="text-sm font-bold text-white">iBoard</h4>
                                    </div>
                                    <div 
                                        className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${
                                            activeComponent === 3 
                                                ? 'border-purple-500/80 bg-purple-500/20 scale-105 shadow-lg shadow-purple-500/30' 
                                                : 'border-white/10 hover:scale-105 hover:border-purple-500/30 focus:border-purple-500/50'
                                        }`}
                                        onClick={() => setActiveComponent(3)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveComponent(3);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Select Mobile App component"
                                        aria-pressed={activeComponent === 3}
                                    >
                                        <div className="text-4xl mb-2">📱</div>
                                        <h4 className="text-sm font-bold text-white">Mobile App</h4>
                                    </div>
                                </div>
                                
                                {/* Component Details - Tabbed Interface */}
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    {activeComponent === 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-4xl">🧩</span>
                                                <h4 className="text-2xl font-bold text-cyan-400">Block Programming Interface</h4>
                                            </div>
                                            <p className="text-gray-200 leading-relaxed">
                                                I built a graphical programming interface using Google's Blockly, modified from Blocklyduino to ensure ESP32 compatibility. Users select electronic components and place them in custom functions, with each component having unique blocks for pin placement and functionality. The iBoard's design with varying connector sizes prevents incorrect pin placement, creating a frustration-free experience.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-sm text-blue-300 font-semibold mb-2">Custom Functions</p>
                                                    <p className="text-gray-200 text-sm">Users create named functions for each device, with blocks automatically generating helper methods and header file links</p>
                                                </div>
                                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <p className="text-sm text-cyan-300 font-semibold mb-2">Real-time Code Generation</p>
                                                    <p className="text-gray-200 text-sm">Users can view and edit the generated ESP32/Arduino code in real-time, with automatic syntax correction</p>
                                                </div>
                                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                    <p className="text-sm text-green-300 font-semibold mb-2">Pin Placement Safety</p>
                                                    <p className="text-gray-200 text-sm">Component-specific blocks and connector sizes prevent incorrect connections, reducing user errors</p>
                                                </div>
                                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                    <p className="text-sm text-purple-300 font-semibold mb-2">Technology Stack</p>
                                                    <p className="text-gray-200 text-sm">Built on Blockly, modified Blocklyduino for ESP32 compatibility</p>
                                                </div>
                                            </div>
                                            <ImageCarouselWithCaptions 
                                                images={[
                                                    {
                                                        src: "/assets/images/iotmaker/Device_Flowchart_v3.0.png",
                                                        caption: "Users generate code for their IoT devices using our block-based programming environment. Users can upload their code to the iBoard and the custom Function Names are then read by the mobile app. Using the mobile app, users can connect to and activate their custom functions on the iBoard."
                                                    }
                                                ]}
                                            />
                                        </div>
                                    )}
                                    
                                    {activeComponent === 1 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-4xl">⚡</span>
                                                <h4 className="text-2xl font-bold text-cyan-400">Live Simulator</h4>
                                            </div>
                                            <p className="text-gray-200 leading-relaxed">
                                                I developed a live simulator that allows users to test generated code instantly without compiling and uploading to physical hardware. This eliminates time-consuming processes and enables testing even when components are missing. As users place components in the programming panel, they are rendered on the simulator in the same pin positions as the physical board. Users can select a function and hit play to see animations for output components based on code logic, with interactive controllers for input components (temperature readings, RGB sensing) that re-evaluate functions in real-time.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-sm text-blue-300 font-semibold mb-2">No Hardware Required</p>
                                                    <p className="text-gray-200 text-sm">Test code instantly without physical components, increasing accessibility for users without hardware</p>
                                                </div>
                                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <p className="text-sm text-cyan-300 font-semibold mb-2">Interactive Testing</p>
                                                    <p className="text-gray-200 text-sm">Real-time function evaluation with visual animations and interactive input controllers</p>
                                                </div>
                                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                    <p className="text-sm text-green-300 font-semibold mb-2">Visual Assembly Guide</p>
                                                    <p className="text-gray-200 text-sm">Simulator serves as a visual guide for users to assemble components to the iBoard</p>
                                                </div>
                                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                    <p className="text-sm text-purple-300 font-semibold mb-2">JavaScript Code Generation</p>
                                                    <p className="text-gray-200 text-sm">Blocks generate JavaScript code for the simulator, allowing intermediate/expert users to understand the flow</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-4">
                                                <p className="text-sm text-yellow-300 font-semibold mb-2">Design Inspiration</p>
                                                <p className="text-gray-200 text-sm">Inspired by Microsoft's Micro:bit ecosystem, but expanded beyond its limitations in component variety and complexity</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {activeComponent === 2 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-4xl">🔌</span>
                                                <h4 className="text-2xl font-bold text-cyan-400">iBoard</h4>
                                            </div>
                                            <p className="text-gray-200 leading-relaxed">
                                                I designed the iBoard as a plug-and-play electronics platform that bypasses prerequisite knowledge of electronics and power systems. The board incorporates an Adafruit HUZZAH32 ESP32 Feather Board with WiFi capability and 10 I/O ports (5 input on the left, 5 output on the right). I implemented three different pin header types (3-pin, 4-pin, and 5-pin I2C) to support various component types. The power distribution system uses three sources: a 3.7V LiPo battery for the MCU, OLED display, and rotary encoder; and two 9V Li-Ion batteries for I/O ports, allowing all pins and components to operate simultaneously.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-sm text-blue-300 font-semibold mb-2">MCU</p>
                                                    <p className="text-gray-200 text-sm">Adafruit HUZZAH32 ESP32 Feather Board with WiFi</p>
                                                </div>
                                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <p className="text-sm text-cyan-300 font-semibold mb-2">I/O Ports</p>
                                                    <p className="text-gray-200 text-sm">10 total: 5 input (left), 5 output (right)</p>
                                                </div>
                                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                    <p className="text-sm text-green-300 font-semibold mb-2">Pin Headers</p>
                                                    <p className="text-gray-200 text-sm">3 types: 3-pin, 4-pin, and 5-pin (I2C protocol)</p>
                                                </div>
                                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                    <p className="text-sm text-purple-300 font-semibold mb-2">Power System</p>
                                                    <p className="text-gray-200 text-sm">3-source distribution: 3.7V LiPo + 9V Li-Ion x2</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-4">
                                                <p className="text-sm text-yellow-300 font-semibold mb-2">Design Principles</p>
                                                <p className="text-gray-200 text-sm">Applied Gestalt principles of proximity and continuity: I/O ports grouped in straight lines, non-interactable components on rear, interactable components on top</p>
                                            </div>
                                            <ImageCarouselWithCaptions 
                                                images={[
                                                    {
                                                        src: "/assets/images/iotmaker/Electronics_Bank_v4.PNG",
                                                        caption: "iBoard and the Electronics Repository. There are 15 peripheral devices offering a variety of functionality for users to utilize."
                                                    }
                                                ]}
                                            />
                                        </div>
                                    )}
                                    
                                    {activeComponent === 3 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-4xl">📱</span>
                                                <h4 className="text-2xl font-bold text-cyan-400">Mobile App</h4>
                                            </div>
                                            <p className="text-gray-200 leading-relaxed">
                                                I developed a multi-platform mobile and desktop application using Unity 3D that allows users to trigger their custom functions wirelessly. On startup, the app reads a text file generated by the IoT Maker web application containing all user-created function names. I implemented four different control methods: (1) Action - a button that runs a function on press, (2) Toggle - allows users to assign functions for on/off states, (3) Slider - provides variable input for devices like servo motors, and (4) Directional Pad - four directional buttons useful for multi-function devices like cars. The iBoard communicates with the mobile app through UDP packets over WiFi, providing responsive control suitable for real-time interaction.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-sm text-blue-300 font-semibold mb-2">Action Button</p>
                                                    <p className="text-gray-200 text-sm">Press to trigger a function immediately</p>
                                                </div>
                                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <p className="text-sm text-cyan-300 font-semibold mb-2">Toggle Switch</p>
                                                    <p className="text-gray-200 text-sm">Assign separate functions for on and off states</p>
                                                </div>
                                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                    <p className="text-sm text-green-300 font-semibold mb-2">Slider Control</p>
                                                    <p className="text-gray-200 text-sm">Variable input for precise control (e.g., servo position)</p>
                                                </div>
                                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                    <p className="text-sm text-purple-300 font-semibold mb-2">Directional Pad</p>
                                                    <p className="text-gray-200 text-sm">Four-directional control for multi-function devices</p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-4">
                                                <p className="text-sm text-yellow-300 font-semibold mb-2">Technology</p>
                                                <p className="text-gray-200 text-sm">Unity 3D for multi-platform deployment (mobile and PC), UDP communication over WiFi for responsive real-time control</p>
                                            </div>
                                            <ImageCarouselWithCaptions 
                                                images={[
                                                    {
                                                        src: "/assets/images/iotmaker/Activity_Diagram.png",
                                                        caption: "A flow of events for a user in the IoT Maker System"
                                                    }
                                                ]}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Evaluation Study Section */}
            <section 
                id="evaluation-study" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Evaluation Study: Expert Feedback
                            </h2>
                            
                            {/* Summary */}
                            <div className="mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
                                    I conducted an evaluation study with 4 expert users to establish external validity of the IoT Maker system and gain insights on design considerations for high learning ceilings and low entry floors. Experts were recruited from graduate and professional students with at least three years of experience in programming physical computing devices, electronics & circuitry, or building electro-mechanical devices. The study used demonstration and usage evaluation strategies, with experts completing 5 coding challenges that highlighted the simplicity of IoT Maker compared to traditional Arduino setups.
                                </p>
                            </div>
                            
                            {/* Research Questions - Visual */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Research Questions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-4xl mb-3 relative z-10">🎯</div>
                                        <div className="text-blue-400 font-bold mb-2 relative z-10">RQ1</div>
                                        <p className="text-gray-200 text-sm relative z-10">
                                            What further design considerations are needed to ensure IoT Maker has a high ceiling for learning, but a low floor for students in our target age group?
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-4xl mb-3 relative z-10">⚡</div>
                                        <div className="text-cyan-400 font-bold mb-2 relative z-10">RQ2</div>
                                        <p className="text-gray-200 text-sm relative z-10">
                                            In what ways can live programming help with the design of an electro-mechanical device?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Methodology - Visual Flow */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Study Overview</h3>
                                
                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">👨‍🔬</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">4</div>
                                        <div className="text-sm text-gray-300">Experts</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">⏱️</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">90</div>
                                        <div className="text-sm text-gray-300">Minutes</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">📝</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">5</div>
                                        <div className="text-sm text-gray-300">Challenges</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">🎓</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">3+</div>
                                        <div className="text-sm text-gray-300">Years Exp.</div>
                                    </div>
                                </div>

                                {/* Study Protocol Flow */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400 text-center">Study Protocol</h4>
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                                        {/* Flow Steps */}
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">📋</div>
                                            <div className="text-sm font-semibold text-white mb-1">Pre-Survey</div>
                                            <div className="text-xs text-gray-400">Demographics & Experience</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">💻</div>
                                            <div className="text-sm font-semibold text-white mb-1">Coding</div>
                                            <div className="text-xs text-gray-400">Challenges 1-4</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">🚗</div>
                                            <div className="text-sm font-semibold text-white mb-1">Open-Ended</div>
                                            <div className="text-xs text-gray-400">Car Project</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">📊</div>
                                            <div className="text-sm font-semibold text-white mb-1">Post-Survey</div>
                                            <div className="text-xs text-gray-400">Feedback & Insights</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Coding Challenges */}
                                <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Coding Challenges</h4>
                                    <p className="text-gray-200 text-sm mb-4">
                                        Experts completed 5 coding challenges designed to compare IoT Maker with traditional Arduino setups:
                                    </p>
                                    <ol className="text-gray-200 text-sm space-y-2 list-decimal list-inside ml-2">
                                        <li>Rotate a DC motor clockwise and counter-clockwise</li>
                                        <li>Turn the Neopixel LED blue when the lights get dim</li>
                                        <li>Turn the Neopixel red when the RGB sensor sees something red</li>
                                        <li>Use a for loop to rotate the servo motors from 0° to 180°</li>
                                        <li>Build a car that you can control with your phone</li>
                                    </ol>
                                </div>
                            </div>

                            {/* Discussion - Visual Insights */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Key Insights</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">✅</div>
                                        <div className="text-green-300 font-semibold mb-2">System Effectiveness</div>
                                        <p className="text-gray-200 text-sm">
                                            Experts rated the system highly for helping build electro-mechanical devices (M=4.75, m=4.5, σ=0.433)
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">⚡</div>
                                        <div className="text-blue-300 font-semibold mb-2">Live Simulator</div>
                                        <p className="text-gray-200 text-sm">
                                            All experts responded favorably about simulator functionality (M=4.5, m=4, σ=0.500)
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">🔧</div>
                                        <div className="text-purple-300 font-semibold mb-2">Testing Benefits</div>
                                        <p className="text-gray-200 text-sm">
                                            3 experts highlighted the importance of testing code without "burning" it to hardware first
                                        </p>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-yellow-500/20 border bg-yellow-500/5">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">💡</div>
                                        <div>
                                            <div className="text-yellow-300 font-semibold mb-2">Primary Finding</div>
                                            <p className="text-gray-200 text-sm">
                                                Experts confirmed that IoT Maker provides a platform to simulate design projects, removes logic creation load, gives an overview of all elements needed, and enables real-time output to increase design/debug/troubleshooting speed through more iterations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Link to Results */}
                            <a 
                                href="#results" 
                                className="block p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 hover:border-orange-500/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-orange-300 font-semibold group-hover:text-orange-200">
                                        View Results and Outcomes →
                                    </p>
                                    <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Youth Study Section */}
            <section 
                id="youth-study" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Youth Study: Novice User Evaluation
                            </h2>
                            
                            {/* Summary */}
                            <div className="mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
                                    I conducted a study with 15 youth participants (age 11-18) across 7 workshops to understand how IoT Maker enables novices to create complex electro-mechanical devices. The study focused on how the system helps youth enact higher-level programming concepts and how the iBoard opens capacity for live programming complex devices. Participants completed coding challenges using pseudo-code scaffolding, with most completing all challenges within the 90-minute session. The study revealed strong usability, learning outcomes, and reduced barriers to entry for physical computing.
                                </p>
                            </div>
                            
                            {/* Research Questions - Visual */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Research Questions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-4xl mb-3 relative z-10">📈</div>
                                        <div className="text-blue-400 font-bold mb-2 relative z-10">RQ1</div>
                                        <p className="text-gray-200 text-sm relative z-10">
                                            How does IoT Maker enable youth to enact higher level programming concepts in a simple and robust way?
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-4xl mb-3 relative z-10">🔌</div>
                                        <div className="text-cyan-400 font-bold mb-2 relative z-10">RQ2</div>
                                        <p className="text-gray-200 text-sm relative z-10">
                                            What does our board do to open the capacity for live programming complex electro-mechanical devices?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Methodology - Visual Flow */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Study Overview</h3>
                                
                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">👥</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">15</div>
                                        <div className="text-sm text-gray-300">Participants</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">7</div>
                                        <div className="text-sm text-gray-300">Workshops</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">📅</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">11-18</div>
                                        <div className="text-sm text-gray-300">Ages</div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl mb-2">⏱️</div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">90</div>
                                        <div className="text-sm text-gray-300">Minutes</div>
                                    </div>
                                </div>

                                {/* Study Protocol Flow */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400 text-center">Workshop Protocol</h4>
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                                        {/* Flow Steps */}
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">📋</div>
                                            <div className="text-sm font-semibold text-white mb-1">Pre-Survey</div>
                                            <div className="text-xs text-gray-400">Demographics</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">💻</div>
                                            <div className="text-sm font-semibold text-white mb-1">Coding</div>
                                            <div className="text-xs text-gray-400">Challenges 1-3</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">🚗</div>
                                            <div className="text-sm font-semibold text-white mb-1">Open-Ended</div>
                                            <div className="text-xs text-gray-400">Car Project</div>
                                        </div>
                                        <div className="hidden md:block text-2xl text-blue-500">→</div>
                                        <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl mb-2">💬</div>
                                            <div className="text-sm font-semibold text-white mb-1">Interview</div>
                                            <div className="text-xs text-gray-400">Post-Survey</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Collection - Visual */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-5 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">📊</div>
                                            <div className="text-blue-300 font-semibold">Quantitative Data</div>
                                        </div>
                                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside ml-2">
                                            <li>Pre- and post-survey Likert scales</li>
                                            <li>Usability assessments</li>
                                            <li>Completion rates</li>
                                        </ul>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-cyan-500/20 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">💬</div>
                                            <div className="text-cyan-300 font-semibold">Qualitative Data</div>
                                        </div>
                                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside ml-2">
                                            <li>Written code analysis</li>
                                            <li>Post-study interviews</li>
                                            <li>Observational field notes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Discussion - Visual Insights */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Key Insights</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">🎯</div>
                                        <div className="text-green-300 font-semibold mb-2">High Usability</div>
                                        <p className="text-gray-200 text-sm">
                                            Easy to connect electronics (M=6.4, m=7, σ=0.712), minimal training required (M=6.53, m=7, σ=0.718)
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">📚</div>
                                        <div className="text-blue-300 font-semibold mb-2">Strong Learning</div>
                                        <p className="text-gray-200 text-sm">
                                            Students learned a lot (M=6.33, m=6, σ=0.699) and could create more complex devices (M=6.33, m=7, σ=0.869)
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-5xl mb-3">⚡</div>
                                        <div className="text-purple-300 font-semibold mb-2">Live Programming Value</div>
                                        <p className="text-gray-200 text-sm">
                                            All students liked watching code run on screen (M=6.33, m=7, σ=0.789) and found it helped visualize outcomes (M=6.7, m=7, σ=0.718)
                                        </p>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-yellow-500/20 border bg-yellow-500/5">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">💡</div>
                                        <div>
                                            <div className="text-yellow-300 font-semibold mb-2">Primary Finding</div>
                                            <p className="text-gray-200 text-sm">
                                                IoT Maker successfully eliminates unnecessary barriers to physical computing, with both block-based interface and plug-and-play electronics enabling quick iteration. The simulator provides accurate depiction of behavior, and the system significantly reduces barrier to entry while providing a higher entry point to this level of physical computing.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Link to Results */}
                            <a 
                                href="#youth-study-results" 
                                className="block p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 hover:border-orange-500/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-orange-300 font-semibold group-hover:text-orange-200">
                                        View Results and Outcomes →
                                    </p>
                                    <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Results and Outcomes Section */}
            <section 
                id="results" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="Results and Outcomes"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Results and Outcomes
                            </h2>
                            
                            {/* Evaluation Study Results */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Evaluation Study Results</h3>
                                <p className="text-gray-200 leading-relaxed mb-6">
                                    The evaluation study with 4 expert users provided critical feedback on system design and usability. All experts completed all 5 coding challenges within the 90-minute session with little-to-no issues.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">4</div>
                                        <div className="text-sm text-gray-300">Expert Participants</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-1">5</div>
                                        <div className="text-sm text-gray-300">Coding Challenges</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-1">100%</div>
                                        <div className="text-sm text-gray-300">Completion Rate</div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Key Findings</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                            <p className="text-sm text-green-300 font-semibold mb-2">System Effectiveness</p>
                                            <p className="text-gray-200 text-sm">
                                                Experts rated the system highly for helping build electro-mechanical devices (M=4.75, m=4.5, σ=0.433)
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-sm text-blue-300 font-semibold mb-2">Simulator Functionality</p>
                                            <p className="text-gray-200 text-sm">
                                                All experts responded favorably about simulator functionality (M=4.5, m=4, σ=0.500)
                                            </p>
                                        </div>
                                        <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <p className="text-sm text-cyan-300 font-semibold mb-2">Testing Benefits</p>
                                            <p className="text-gray-200 text-sm">
                                                3 experts highlighted the importance of testing code without "burning" it to hardware first, making troubleshooting easier
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">Design Feedback</p>
                                            <p className="text-gray-200 text-sm">
                                                Experts suggested improvements for debugging tools and noted that complex functions may be challenging for novices in the Blockly UI
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mb-6">
                                    <p className="text-sm text-yellow-300 font-semibold mb-2">Expert Summary</p>
                                    <p className="text-gray-200 text-sm">
                                        Experts confirmed that IoT Maker (1) provides a platform to simulate design projects and gives an overview of all elements needed, (2) enables real-time output to increase design/debug/troubleshooting speed through more iterations, and (3) has potential to teach novices how to program physical computing devices to control a wide variety of electronic hardware.
                                    </p>
                                </div>
                            </div>

                            {/* Youth Study Results */}
                            <div id="youth-study-results" className="mb-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Youth Study Results</h3>
                                <p className="text-gray-200 leading-relaxed mb-6">
                                    The youth study with 15 participants (4 male, 11 female) across 7 workshops demonstrated strong usability, learning outcomes, and reduced barriers to entry. Most participants completed all coding challenges within the 90-minute session.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">15</div>
                                        <div className="text-sm text-gray-300">Participants</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-1">7</div>
                                        <div className="text-sm text-gray-300">Workshops</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-1">11-18</div>
                                        <div className="text-sm text-gray-300">Age Range</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-1">Most</div>
                                        <div className="text-sm text-gray-300">Completed All</div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Usability & User Experience</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                            <p className="text-sm text-green-300 font-semibold mb-2">Easy Electronics Connection</p>
                                            <p className="text-gray-200 text-sm">
                                                Every student responded favorably (M=6.4, m=7, σ=0.712) when asked how easy it was to connect electronics to the iBoard
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-sm text-blue-300 font-semibold mb-2">Minimal Training Required</p>
                                            <p className="text-gray-200 text-sm">
                                                Students commented on the lack of training needed (M=6.53, m=7, σ=0.718) to use the iBoard
                                            </p>
                                        </div>
                                        <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <p className="text-sm text-cyan-300 font-semibold mb-2">Quick Device Activation</p>
                                            <p className="text-gray-200 text-sm">
                                                Easy electronics connection helped quickly bring physical structures to life (M=6.33, m=7, σ=0.869)
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">Block Programming Ease</p>
                                            <p className="text-gray-200 text-sm">
                                                Students found using blocks to program devices easy (M=5.93, m=7, σ=0.929)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Live Programming Impact</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                            <p className="text-sm text-green-300 font-semibold mb-2">Enjoyed Watching Code</p>
                                            <p className="text-gray-200 text-sm">
                                                Every student responded favorably when asked if they liked watching code run on screen (M=6.33, m=7, σ=0.789)
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-sm text-blue-300 font-semibold mb-2">Visualization Help</p>
                                            <p className="text-gray-200 text-sm">
                                                Watching code on screen helped visualize what would happen when uploaded to iBoard (M=6.7, m=7, σ=0.718)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-4">
                                        <p className="text-sm text-yellow-300 font-semibold mb-2">Student Insight</p>
                                        <p className="text-gray-200 text-sm italic">
                                            "Live programming can help with the design of an electro-mechanical device because it allows the person programming to see exactly what works and does not work about their program in real time and work out problems quickly." - Erica (Female, 15)
                                        </p>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Learning Outcomes</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                            <p className="text-sm text-green-300 font-semibold mb-2">Learning Achievement</p>
                                            <p className="text-gray-200 text-sm">
                                                Students reported learning a lot while using IoT Maker (M=6.33, m=6, σ=0.699)
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-sm text-blue-300 font-semibold mb-2">Complex Device Creation</p>
                                            <p className="text-gray-200 text-sm">
                                                Students believed they could use IoT Maker to create something more complex (M=6.33, m=7, σ=0.869)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 mt-4">
                                        <p className="text-sm text-purple-300 font-semibold mb-2">Key Finding</p>
                                        <p className="text-gray-200 text-sm">
                                            Most students were able to complete all coding challenges, including those with no prior programming experience. Students demonstrated constructionist learning by applying prior knowledge and quickly picking up required skills.
                                        </p>
                                    </div>
                                </div>

                                {/* Demographics Chart */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Participant Demographics</h4>
                                    <ImageCarouselWithCaptions 
                                        images={[
                                            {
                                                src: "/assets/images/iotmaker/Percentage Charts Compilation v2 - CBF.png",
                                                caption: "Pre-Survey Results from the Youth Study. All demographic questions are based on a 7-point Likert Scale (1 - strongly disagree, 7 - strongly agree). The percentage of participants' answers is shown. Most students had no experience in many of the areas (indicated in red)."
                                            }
                                        ]}
                                    />
                                </div>

                                {/* Coding Challenges Table Image */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-cyan-400">Coding Challenges Comparison</h4>
                                    <ImageCarouselWithCaptions 
                                        images={[
                                            {
                                                src: "/assets/images/iotmaker/Coding Challenge Comparison.png",
                                                caption: "Coding Challenges used for both the Expert and Youth Studies. The table shows a quick comparison between components that are needed to implement this coding challenge with IoT Maker vs. Arduino. (1) Rotate a DC motor clockwise and counter-clockwise, (2) Turn the Neopixel LED blue when the lights get dim, (3) Turn the Neopixel red when the RGB sensor sees something red, (4) Use a for loop to rotate the servo motors from 0° to 180°, (5) Build a car that you can control with your phone."
                                            }
                                        ]}
                                    />
                                </div>

                                {/* Study Images */}
                                <div className="mb-6">
                                    <ImageCarouselWithCaptions 
                                        images={[
                                            {
                                                src: "/assets/images/iotmaker/UserStudyImage_combined.png",
                                                caption: "Participant (a) driving a car made during the coding challenge and (b) explaining the working of the car to their elder sibling"
                                            }
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Overall Success Metrics */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Overall Success Metrics</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="glass rounded-xl p-6 border-white/10 border">
                                        <h4 className="text-xl font-bold mb-3 text-cyan-400">System Effectiveness</h4>
                                        <ul className="text-gray-300 space-y-2 list-disc list-inside">
                                            <li>Successfully eliminated unnecessary barriers to physical computing</li>
                                            <li>Enabled rapid learning and iteration through live programming</li>
                                            <li>Supported both novice and expert users through low floors and high ceilings</li>
                                            <li>Demonstrated potential for educational integration</li>
                                        </ul>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border">
                                        <h4 className="text-xl font-bold mb-3 text-cyan-400">Key Contributions</h4>
                                        <ul className="text-gray-300 space-y-2 list-disc list-inside">
                                            <li>Design rationale from expert evaluation study</li>
                                            <li>Complete IoT Maker system with plug-and-play electronics</li>
                                            <li>Evaluation results showing system effectiveness with both experts and youth</li>
                                            <li>Evidence of reduced barriers and enhanced learning outcomes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Conclusion Section */}
            <section 
                id="conclusion" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="Conclusion"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Conclusion
                            </h2>
                            
                            {/* Discussion - Visual */}
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Discussion</h3>
                                
                                <div className="mb-6">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-6">
                                        In conclusion, IoT Maker is an IoT creation platform that utilizes live programming, an integrated block-based programming language, and a lightweight companion app for mobile/desktop that pairs wirelessly with the customized iBoard. I tested the system with 4 expert users and 15 youth users in the target age range of 11-18 years old. The expert study revealed opportunities for critical changes to the system, such as laboratory mode, as well as removing some coding challenges from the pseudo-code document and study procedures. The youth study revealed the importance of the features I designed for IoT Maker, including the plug-and-play iBoard, laboratory mode, and live programming simulator.
                                    </p>
                                    
                                    <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400">System Impact</h4>
                                        <p className="text-gray-200 leading-relaxed mb-4">
                                            The results show that IoT Maker is a great tool for:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-2">1. Teaching Novices</p>
                                                <p className="text-gray-200 text-sm">Teach novices how to program physical computing devices to control a wide variety of electronic hardware</p>
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-2">2. Ease of Use</p>
                                                <p className="text-gray-200 text-sm">Make programming physical computing devices easier and more enjoyable</p>
                                            </div>
                                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <p className="text-sm text-green-300 font-semibold mb-2">3. Complex Devices</p>
                                                <p className="text-gray-200 text-sm">Assist novices with creating complex devices that would require more skill than they otherwise would possess</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-200 leading-relaxed mt-4">
                                            IoT Maker successfully lowers the barrier of entry <strong className="text-white">and</strong> provides a higher entry point to this level of physical computing, enabling young, novice users to create electro-mechanical devices using high-level electronics and simple, low-cost tool chains.
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">⚡</div>
                                            <div className="text-blue-300 font-semibold mb-2">Live Programming</div>
                                            <p className="text-gray-200 text-sm">
                                                Real-time execution enables immediate feedback and learning
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🎯</div>
                                            <div className="text-cyan-300 font-semibold mb-2">Accessibility</div>
                                            <p className="text-gray-200 text-sm">
                                                Block-based interface reduces barriers to entry for youth
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🌐</div>
                                            <div className="text-purple-300 font-semibold mb-2">IoT Integration</div>
                                            <p className="text-gray-200 text-sm">
                                                Seamless connection between programming and physical devices
                                            </p>
                                        </div>
                                    </div>

                                    <div className="glass rounded-xl p-6 border-yellow-500/20 border bg-yellow-500/5">
                                        <h4 className="text-xl font-bold mb-4 text-yellow-300">Key Contributions</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold text-lg">1.</span>
                                                <p className="text-gray-200">
                                                    <strong className="text-white">Design rationale</strong> for an IoT device creation platform and block programming environment, validated by a group of four experts
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold text-lg">2.</span>
                                                <p className="text-gray-200">
                                                    <strong className="text-white">The IoT Maker system</strong> with its host of hardware and software features, including the iBoard, live simulator, block programming interface, and mobile app
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-yellow-300 font-bold text-lg">3.</span>
                                                <p className="text-gray-200">
                                                    <strong className="text-white">Results from the youth study</strong> which showcase the utility of IoT Maker to enable novice users to create complex electro-mechanical IoT devices
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Limitations and Future Work */}
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Limitations & Future Work</h3>
                                <p className="text-gray-200 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                                    While IoT Maker can be a launch pad to learn programming and electronics by exercising creativity and problem solving, I acknowledge there is room for improvement. Below are limitations uncovered during development and both studies, along with future goals and enhancements.
                                </p>
                                
                                <div className="space-y-6">
                                    {/* Software Limitations */}
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">💻</div>
                                            <div className="text-blue-300 font-semibold text-lg">Software Enhancements</div>
                                        </div>
                                        <p className="text-gray-200 mb-4">
                                            The present version outputs a .ino file that needs to be compiled alongside the rest of the code before transfer to the iBoard. Future iterations will include direct over-the-air code compilation and upload from the software, eliminating this additional step. I plan to add 3D printed connector categories to assist in attaching electronics to raw materials, expanding the mechanical design aspect of the platform with primitive shapes as building blocks and simple machine components like gears and pulleys.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-2">On-Screen Instructions</p>
                                                <p className="text-gray-200 text-sm">Replace printed pseudo-code with visual, on-screen instructions similar to MakeCode to improve engagement and task completion</p>
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-2">Open-Source Platform</p>
                                                <p className="text-gray-200 text-sm">Make IoT Maker open-source, allowing users to create, collaborate, and share projects</p>
                                            </div>
                                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <p className="text-sm text-green-300 font-semibold mb-2">Developer Features</p>
                                                <p className="text-gray-200 text-sm">Enable IoT developers to add new components and their corresponding animations using modular code</p>
                                            </div>
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <p className="text-sm text-purple-300 font-semibold mb-2">AR Integration</p>
                                                <p className="text-gray-200 text-sm">Explore AR-based IoT Kart racing game with programming and customization features, allowing youth to design interactions between physical cars and AR components</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hardware Improvements */}
                                    <div className="glass rounded-xl p-6 border-green-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🔧</div>
                                            <div className="text-green-300 font-semibold text-lg">Hardware Improvements</div>
                                        </div>
                                        <p className="text-gray-200 mb-4">
                                            The iBoard is currently a bare PCB with all components exposed to the user, making it vulnerable to potential accidental/environmental damage and functional failure. I plan to create an enclosure that limits user interaction to only interfacing components, similar to prior works. Additionally, connector design improvements will make hardware handling less fussy for youth users, addressing the small and tight connectors that can be challenging for younger participants.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <p className="text-sm text-green-300 font-semibold mb-2">Protective Enclosure</p>
                                                <p className="text-gray-200 text-sm">Create enclosure to protect components from damage and limit interaction to interfacing elements only</p>
                                            </div>
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-2">Improved Connectors</p>
                                                <p className="text-gray-200 text-sm">Redesign connectors inspired by littleBits to be easier for youth to handle, reducing fussiness and clumsiness</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Community & Platform */}
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🌐</div>
                                            <div className="text-purple-300 font-semibold text-lg">Community Platform</div>
                                        </div>
                                        <p className="text-gray-200">
                                            I plan to host IoT Maker on the web as a public platform that allows users to create, collaborate, and share projects. The platform will enable seamless physical-digital interactions that find applications in a variety of areas, building toward a comprehensive ecosystem for IoT education and creative play. This includes adding developer features that enable other IoT developers to add new components and animations using modular code.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Acknowledgements - Visual */}
                            <div className="mb-8 pt-8 border-t border-white/10">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Acknowledgements</h3>
                                
                                <div className="space-y-6">
                                    {/* Research Team */}
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">👨‍🔬</div>
                                            <div className="text-blue-300 font-semibold text-lg">Research Team</div>
                                        </div>
                                        <p className="text-gray-200 mb-3">
                                            I am grateful to my collaborators for their invaluable contributions to the design, development, and evaluation of IoT Maker:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Kylie Peppler</p>
                                                <p className="text-gray-300 text-sm">The Creativity Labs, UC Irvine</p>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Karthik Ramani</p>
                                                <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Pashin Raja</p>
                                                <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Devashri Vagholkar</p>
                                                <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Kiran Payne</p>
                                                <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-white font-semibold">Joey Huang</p>
                                                <p className="text-gray-300 text-sm">The Creativity Labs, UC Irvine</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Participants */}
                                    <div className="glass rounded-xl p-6 border-green-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">👥</div>
                                            <div className="text-green-300 font-semibold text-lg">Participants</div>
                                        </div>
                                        <p className="text-gray-200 mb-4">
                                            Special thanks to all the students who participated in our studies. Their creativity, feedback, and engagement were essential to this research.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                <div className="text-2xl font-bold text-green-300 mb-1">4</div>
                                                <p className="text-gray-200 text-sm">Expert Users</p>
                                            </div>
                                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                <div className="text-2xl font-bold text-green-300 mb-1">15</div>
                                                <p className="text-gray-200 text-sm">Youth Participants</p>
                                                <p className="text-gray-300 text-xs mt-1">Ages 11-18 (4 male, 11 female)</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Institutions */}
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🏛️</div>
                                            <div className="text-purple-300 font-semibold text-lg">Institutions</div>
                                        </div>
                                        <p className="text-gray-200 mb-4">
                                            This work was conducted at the following institutions. I am grateful for the support and resources provided:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <p className="text-white font-semibold mb-1">C Design Lab</p>
                                                <p className="text-gray-200 text-sm">Purdue University</p>
                                                <p className="text-gray-300 text-xs mt-1">West Lafayette, IN, USA</p>
                                            </div>
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <p className="text-white font-semibold mb-1">The Creativity Labs</p>
                                                <p className="text-gray-200 text-sm">University of California, Irvine</p>
                                                <p className="text-gray-300 text-xs mt-1">Irvine, CA, USA</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Funding */}
                                    <div className="glass rounded-xl p-6 border-yellow-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">💰</div>
                                            <div className="text-yellow-300 font-semibold text-lg">Funding</div>
                                        </div>
                                        <p className="text-gray-200">
                                            This research was supported by funding from Purdue University and the University of California, Irvine, through their respective research programs and facilities.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Final Summary - Visual */}
                            <div className="pt-8 border-t border-white/10">
                                <div className="glass rounded-xl p-8 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10">
                                    <div className="text-center mb-4">
                                        <div className="text-6xl mb-4">✨</div>
                                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                            Final Thoughts
                                        </h3>
                                    </div>
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto text-lg">
                                        IoT Maker represents a significant advancement in IoT education for youth, combining live programming, block-based programming, and wireless hardware control into a cohesive platform. Through evaluation with experts and youth users, I demonstrated that the system successfully lowers barriers to entry while providing a higher entry point to physical computing, enabling novice users to create complex electro-mechanical devices that would otherwise require advanced skills. The system's utility for teaching, ease of use, and support for complex device creation positions it as a valuable tool for educational settings and creative play.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

export default IoTMaker;

