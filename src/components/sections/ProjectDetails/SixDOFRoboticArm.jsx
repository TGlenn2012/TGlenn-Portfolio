import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../RevealOnScroll";

// Code Snippet Component
const CodeSnippet = ({ title, language, code, description }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass rounded-xl p-6 border-white/10 border mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
                    {description && <p className="text-sm text-gray-400">{description}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">{language}</span>
                    <button
                        onClick={copyToClipboard}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                        aria-label="Copy code to clipboard"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{code}</code>
            </pre>
        </div>
    );
};

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
    const isGIF = currentImage.src.toLowerCase().endsWith('.gif');

    return (
        <div className="relative mt-4" role="region" aria-label="Image carousel">
            <div className="glass rounded-xl p-6 border-white/10 border overflow-hidden">
                <div className={`relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center rounded-lg overflow-hidden w-full ${
                    isPNG ? 'bg-white' : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
                }`}>
                    <img 
                        src={currentImage.src} 
                        alt={currentImage.caption || `Image ${currentIndex + 1} of ${images.length}`}
                        className="w-full h-auto max-w-full max-h-[400px] sm:max-h-[450px] md:max-h-[500px] object-contain rounded-lg"
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                        onError={(e) => {
                            console.error(`Failed to load image: ${currentImage.src}`);
                            e.target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                            // Ensure image is visible on mobile
                            e.target.style.display = 'block';
                        }}
                    />
                    
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

                {images[currentIndex].caption && (
                    <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
                        <p className="text-gray-200 text-sm leading-relaxed">
                            {images[currentIndex].caption}
                        </p>
                    </div>
                )}

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

export const SixDOFRoboticArm = () => {
    return (
        <main className="min-h-screen">
            {/* Skip to content link */}
            <a href="#overview" className="skip-link">
                Skip to main content
            </a>
            
            {/* Overview/Project Summary Section */}
            <section 
                id="overview" 
                className="min-h-screen pt-24 sm:pt-28 md:pt-20 py-8 sm:py-12 md:py-20 scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-20"
                aria-label="Overview and Project Summary"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="h-4 sm:h-6 md:h-0"></div>
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-center block relative z-10" style={{ 
                                background: 'linear-gradient(to right, #f97316, #0284c7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: '#f97316',
                                display: 'block',
                                visibility: 'visible',
                                opacity: 1
                            }}>
                                6DOF Robotic Arm
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> Tele-Operation of a 6 DOF Robotic Arm Using ESP32 Over WiFi
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Course Project (IE 590 Final Project)
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/6dof-header.png" 
                                            alt="6DOF Robotic Arm system showing the robotic arm mounted on a car chassis with ESP32 control, WiFi communication, and Unity interface" 
                                            className="w-full h-auto rounded-lg mb-2"
                                            loading="eager"
                                            decoding="async"
                                            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/6dof-header.png`);
                                                e.target.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                e.target.style.display = 'block';
                                            }}
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            A 6-degree-of-freedom robotic arm mounted on a mobile chassis, controlled remotely via WiFi using a Unity 3D interface. The system integrates ESP32 microcontroller, servo motors, computer vision, and real-time video streaming for tele-operation.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> I designed and implemented a tele-operated 6-degree-of-freedom (6DOF) robotic arm system mounted on a mobile car-like chassis. The system integrates hardware and software components: an ESP32 microcontroller controls six servo motors for the robotic arm and two DC motors for chassis movement, a smartphone streams live video feed via WiFi using IP Webcam, a Python-based computer vision system performs color detection and tracking, and a Unity 3D interface sends UDP commands over WiFi to control the robot remotely. This project demonstrates the integration of embedded systems, wireless communication, computer vision, and human-robot interaction in a complete tele-operation system.
                                </p>
                                
                                {/* Video Embed */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Project Video</h3>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/vpg0vclQi2Y?si=TCPfVPq23EVROOv8"
                                            title="6DOF Robotic Arm Project Video"
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
                                        <div className="text-5xl mb-3">⚙️</div>
                                        <div className="text-xl font-bold text-white mb-2">Hardware Design</div>
                                        <div className="text-sm text-gray-300">Designed and assembled the 6DOF robotic arm mechanism, integrated ESP32 microcontroller, configured servo motors for precise joint control, and built the mobile chassis with DC motors for locomotion.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">💻</div>
                                        <div className="text-xl font-bold text-white mb-2">Software Development</div>
                                        <div className="text-sm text-gray-300">Developed Arduino firmware for ESP32 servo and motor control, created Python computer vision system for color detection, and built Unity 3D control interface with UDP networking.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🔗</div>
                                        <div className="text-xl font-bold text-white mb-2">System Integration</div>
                                        <div className="text-sm text-gray-300">Integrated WiFi communication protocols, synchronized video streaming with robot control, and implemented real-time tele-operation system connecting Unity interface to ESP32 hardware.</div>
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
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="The Problem"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                The Problem
                            </h2>
                            
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                                    Tele-operation of robotic systems requires seamless integration of hardware control, wireless communication, and visual feedback. Traditional robotic control systems often rely on wired connections or complex proprietary protocols, limiting mobility and accessibility. This project addresses the challenge of creating a wireless, real-time tele-operation system for a multi-degree-of-freedom robotic arm.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🔌</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Wired Limitations</h3>
                                        <p className="text-sm text-gray-200">
                                            Traditional robotic control systems require physical connections, restricting mobility and range of operation.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">👁️</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Visual Feedback</h3>
                                        <p className="text-sm text-gray-200">
                                            Effective tele-operation requires real-time visual feedback from the robot's perspective to enable precise control.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🎮</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Intuitive Control</h3>
                                        <p className="text-sm text-gray-200">
                                            Complex multi-DOF robotic systems need intuitive interfaces that allow operators to control multiple joints simultaneously.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Solution Opportunity */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The Solution Opportunity</h3>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                        Modern wireless technologies and accessible hardware platforms enable the creation of cost-effective tele-operation systems. By combining ESP32's WiFi capabilities, smartphone cameras for visual feedback, Python for computer vision processing, and Unity 3D for intuitive control interfaces, I can create a complete wireless tele-operation system that demonstrates practical applications in robotics and human-robot interaction.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🤖</div>
                                            <p className="text-sm text-gray-200">6DOF Robotic Arm</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">📡</div>
                                            <p className="text-sm text-gray-200">WiFi Control</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">👁️</div>
                                            <p className="text-sm text-gray-200">Computer Vision</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">=</div>
                                        <div className="glass rounded-xl p-4 border-green-500/30 border bg-green-500/10 text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">✨</div>
                                            <p className="text-sm font-semibold text-green-300">Tele-Operation System</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* System Design Overview Section */}
            <section 
                id="rr" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="System Design Overview"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                System Design Overview
                            </h2>
                            
                            {/* System Architecture */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">System Architecture</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-5xl mb-3">🤖</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Robotic Arm</h4>
                                        <p className="text-sm text-gray-300">
                                            6 servo motors providing full 6-degree-of-freedom movement for precise manipulation
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-cyan-500/20 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-5xl mb-3">📱</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Mobile Chassis</h4>
                                        <p className="text-sm text-gray-300">
                                            Car-like platform with DC motors for forward, backward, left, and right movement
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/20 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-5xl mb-3">🔌</div>
                                        <h4 className="text-lg font-bold text-white mb-2">ESP32 Controller</h4>
                                        <p className="text-sm text-gray-300">
                                            Microcontroller handling servo control, motor control, and WiFi UDP communication
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-5xl mb-3">💻</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Control Interface</h4>
                                        <p className="text-sm text-gray-300">
                                            Unity 3D application sending UDP commands and receiving video feed for tele-operation
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hardware Components */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Hardware Components</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Robotic Arm */}
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🦾</div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white">6DOF Robotic Arm</h4>
                                                <p className="text-sm text-gray-400">Six servo motors for full articulation</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 1</div>
                                                <div className="text-xs text-gray-300">Base rotation</div>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 2</div>
                                                <div className="text-xs text-gray-300">Shoulder joint</div>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 3</div>
                                                <div className="text-xs text-gray-300">Elbow joint</div>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 4</div>
                                                <div className="text-xs text-gray-300">Wrist pitch</div>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 5</div>
                                                <div className="text-xs text-gray-300">Wrist roll</div>
                                            </div>
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Servo 6</div>
                                                <div className="text-xs text-gray-300">Gripper</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Chassis */}
                                    <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🚗</div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white">Mobile Chassis</h4>
                                                <p className="text-sm text-gray-400">Differential drive system</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <div className="text-sm font-semibold text-cyan-300 mb-1">Left Motor</div>
                                                <div className="text-xs text-gray-300">Pins: IN3 (19), IN4 (21)</div>
                                            </div>
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <div className="text-sm font-semibold text-cyan-300 mb-1">Right Motor</div>
                                                <div className="text-xs text-gray-300">Pins: IN1 (5), IN2 (18)</div>
                                            </div>
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <div className="text-sm font-semibold text-cyan-300 mb-1">Movement Modes</div>
                                                <div className="text-xs text-gray-300">Forward, Backward, Left, Right, Stop</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Software Components */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Software Components</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* ESP32 Firmware */}
                                    <div className="glass rounded-xl p-6 border-green-500/20 border hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-4 text-center">🔧</div>
                                        <h5 className="text-lg font-bold text-white mb-3 text-center">ESP32 Firmware</h5>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>UDP packet reception</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>Servo PWM control (50Hz)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>DC motor H-bridge control</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>WiFi connectivity</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Computer Vision */}
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-4 text-center">👁️</div>
                                        <h5 className="text-lg font-bold text-white mb-3 text-center">Computer Vision</h5>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400">•</span>
                                                <span>OpenCV color detection</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400">•</span>
                                                <span>HSV color space filtering</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400">•</span>
                                                <span>Multi-color tracking (RGBP)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400">•</span>
                                                <span>IP Webcam integration</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Unity Interface */}
                                    <div className="glass rounded-xl p-6 border-orange-500/20 border hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-4 text-center">🎮</div>
                                        <h5 className="text-lg font-bold text-white mb-3 text-center">Unity 3D Interface</h5>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-orange-400">•</span>
                                                <span>UDP client implementation</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-orange-400">•</span>
                                                <span>Real-time video display</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-orange-400">•</span>
                                                <span>Intuitive control sliders</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-orange-400">•</span>
                                                <span>Command encoding/decoding</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Communication Protocol */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Communication Protocol</h3>
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-3">UDP Command Format</h4>
                                            <div className="space-y-3">
                                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <div className="text-sm font-semibold text-cyan-300 mb-1">Servo Control</div>
                                                    <div className="text-xs text-gray-300 font-mono">Format: [a-f][0-9999]</div>
                                                    <div className="text-xs text-gray-400 mt-1">Example: "a150" = Servo 1 to position 150</div>
                                                </div>
                                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <div className="text-sm font-semibold text-cyan-300 mb-1">Chassis Control</div>
                                                    <div className="text-xs text-gray-300 font-mono">Format: [F|B|L|R|S]</div>
                                                    <div className="text-xs text-gray-400 mt-1">F=Forward, B=Backward, L=Left, R=Right, S=Stop</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-3">Network Configuration</h4>
                                            <div className="space-y-3">
                                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <div className="text-sm font-semibold text-cyan-300 mb-1">ESP32 Listen Port</div>
                                                    <div className="text-xs text-gray-300 font-mono">Port 1000</div>
                                                </div>
                                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <div className="text-sm font-semibold text-cyan-300 mb-1">Video Stream</div>
                                                    <div className="text-xs text-gray-300 font-mono">IP Webcam: Port 8080</div>
                                                </div>
                                                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                    <div className="text-sm font-semibold text-cyan-300 mb-1">Protocol</div>
                                                    <div className="text-xs text-gray-300 font-mono">UDP over WiFi</div>
                                                </div>
                                            </div>
                                        </div>
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
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Process and Solution"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Implementation Details
                        </h2>

                        {/* ESP32 Firmware */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">ESP32 Firmware (Arduino)</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                                The ESP32 firmware handles all hardware control and WiFi communication. It uses the ESP32's LEDC (LED Controller) peripheral for precise servo PWM control and GPIO pins for DC motor H-bridge control.
                            </p>
                            
                            <CodeSnippet
                                title="Servo and Motor Setup"
                                language="Arduino"
                                description="Initialization of 6 servo motors and 2 DC motors with proper pin assignments"
                                code={`// Servo Configuration
const int channel1 = 1;
const int servo1 = 13;  // Base rotation

const int channel2 = 2;
const int servo2 = 12;  // Shoulder joint

const int channel3 = 3;
const int servo3 = 14;  // Elbow joint

const int channel4 = 4;
const int servo4 = 27;  // Wrist pitch

const int channel5 = 5;
const int servo5 = 33;  // Wrist roll

const int channel6 = 6;
const int servo6 = 32;  // Gripper

// Servo PWM: 50Hz frequency, 16-bit resolution
const int freq = 50;
const int width = 16;

// DC Motor Pins
int in1 = 5;   // Right motor pin 1
int in2 = 18;  // Right motor pin 2
int in3 = 19;  // Left motor pin 1
int in4 = 21;  // Left motor pin 2

void setup() {
  // Configure servo channels
  ledcSetup(channel1, freq, width);
  ledcAttachPin(servo1, channel1);
  // ... repeat for all 6 servos
  
  // Configure motor pins
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, pass);
  Udp.begin(listenPort);
}`}
                            />

                            <CodeSnippet
                                title="UDP Packet Processing"
                                language="Arduino"
                                description="Parses incoming UDP packets to control servos and motors"
                                code={`void readPacket() {
  int packetSize = Udp.parsePacket();
  
  if(packetSize) {
    Udp.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);
    
    // Single character = chassis control
    if (packetSize == 1) {
      if(packetBuffer[0] == 'F') forward();
      else if(packetBuffer[0] == 'B') backward();
      else if(packetBuffer[0] == 'L') left();
      else if(packetBuffer[0] == 'R') right();
      else if(packetBuffer[0] == 'S') stop();
    }
    // 2-5 characters = servo control
    // Format: [a-f][position]
    // a=servo1, b=servo2, c=servo3, d=servo4, e=servo5, f=servo6
    else if (packetSize >= 2 && packetSize <= 5) {
      int pos = 0;
      char servo = packetBuffer[0];
      
      // Parse position value
      for(int i = 1; i < packetSize; i++) {
        pos = pos * 10 + (packetBuffer[i] - '0');
      }
      
      // Control appropriate servo
      if (servo == 'a') ledcWrite(channel1, pos);
      else if (servo == 'b') ledcWrite(channel2, pos);
      else if (servo == 'c') ledcWrite(channel3, pos);
      else if (servo == 'd') ledcWrite(channel4, pos);
      else if (servo == 'e') ledcWrite(channel5, pos);
      else if (servo == 'f') ledcWrite(channel6, pos);
    }
  }
}`}
                            />
                        </div>

                        {/* Computer Vision System */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Computer Vision System (Python)</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                                The Python computer vision system connects to an Android phone's IP Webcam app, performs real-time color detection and tracking using OpenCV, and can identify red, blue, green, and purple objects in the video stream.
                            </p>
                            
                            <CodeSnippet
                                title="Color Detection and Tracking"
                                language="Python"
                                description="Real-time color detection using OpenCV and HSV color space filtering"
                                code={`import cv2
import numpy as np
import requests

# IP Webcam URL
url = "http://192.168.1.2:8080/shot.jpg"

while True:
    # Get image from IP Webcam
    img_resp = requests.get(url)
    img_arr = np.array(bytearray(img_resp.content), dtype=np.uint8)
    img = cv2.imdecode(img_arr, -1)
    img = imutils.rotate(img, -90)  # Rotate for correct orientation
    
    # Convert to HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Define color ranges (HSV)
    red_lower = np.array([0, 100, 100], np.uint8)
    red_upper = np.array([10, 255, 255], np.uint8)
    
    blue_lower = np.array([110, 100, 100], np.uint8)
    blue_upper = np.array([130, 255, 255], np.uint8)
    
    green_lower = np.array([50, 100, 100], np.uint8)
    green_upper = np.array([70, 255, 255], np.uint8)
    
    purple_lower = np.array([129, 211, 230], np.uint8)
    purple_upper = np.array([149, 231, 250], np.uint8)
    
    # Create color masks
    red_mask = cv2.inRange(hsv, red_lower, red_upper)
    blue_mask = cv2.inRange(hsv, blue_lower, blue_upper)
    green_mask = cv2.inRange(hsv, green_lower, green_upper)
    purple_mask = cv2.inRange(hsv, purple_lower, purple_upper)
    
    # Morphological operations to reduce noise
    kernel = np.ones((5, 5), "uint8")
    red_mask = cv2.dilate(red_mask, kernel)
    
    # Find contours and draw bounding boxes
    contours, hierarchy = cv2.findContours(red_mask, 
                                          cv2.RETR_TREE, 
                                          cv2.CHAIN_APPROX_SIMPLE)
    
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 500:  # Filter small noise
            x, y, w, h = cv2.boundingRect(contour)
            img = cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 255), 2)
            cv2.putText(img, "Red color", (x, y), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255))
    
    # Display result
    cv2.imshow("AndroidCam", img)
    
    if cv2.waitKey(1) == 27:  # ESC to exit
        break`}
                            />
                        </div>

                        {/* System Workflow */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">System Workflow</h3>
                            
                            <div className="space-y-4">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">1</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-white mb-2">Hardware Setup</h5>
                                            <p className="text-sm text-gray-300 mb-3">Assemble 6DOF robotic arm with servo motors, mount on mobile chassis with DC motors, connect ESP32 microcontroller, and mount smartphone with IP Webcam app</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Servo Assembly</span>
                                                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Chassis Integration</span>
                                                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">ESP32 Wiring</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-xl font-bold text-white">2</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-white mb-2">Network Configuration</h5>
                                            <p className="text-sm text-gray-300 mb-3">Connect ESP32 and smartphone to same WiFi network, configure IP Webcam app, and establish UDP communication channels</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">WiFi Setup</span>
                                                <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">IP Configuration</span>
                                                <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Port Mapping</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white">3</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-white mb-2">Control & Operation</h5>
                                            <p className="text-sm text-gray-300 mb-3">Launch Unity interface, start Python vision system, use Unity sliders to control servo positions, use keyboard/buttons for chassis movement, and view real-time video feed with color detection overlay</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">Unity Interface</span>
                                                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">UDP Commands</span>
                                                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">Video Stream</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Results and Outcomes Section */}
            <section 
                id="results" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Results and Outcomes"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Results and Outcomes
                        </h2>

                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                                The 6DOF robotic arm tele-operation system successfully demonstrates the integration of embedded systems, wireless communication, computer vision, and human-robot interaction. The system provides real-time control with visual feedback, enabling precise manipulation tasks.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                    <div className="text-4xl mb-3">✅</div>
                                    <h4 className="text-lg font-bold text-white mb-3">System Functionality</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>6 servo motors controlled independently via UDP</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Mobile chassis responds to directional commands</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Real-time video streaming from smartphone camera</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Color detection and tracking functional</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="glass rounded-xl p-6 border-green-500/20 border">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Technical Achievements</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>WiFi-based wireless control eliminates cable constraints</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Low-latency UDP communication for responsive control</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Modular code architecture for easy expansion</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Cost-effective solution using accessible hardware</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-purple-400">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">📡</div>
                                    <h4 className="text-base font-bold text-white mb-2">Wireless Control</h4>
                                    <p className="text-xs text-gray-300">
                                        Full WiFi-based control eliminates physical connection requirements
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">👁️</div>
                                    <h4 className="text-base font-bold text-white mb-2">Visual Feedback</h4>
                                    <p className="text-xs text-gray-300">
                                        Real-time video streaming provides operator with robot's perspective
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">🎮</div>
                                    <h4 className="text-base font-bold text-white mb-2">Intuitive Interface</h4>
                                    <p className="text-xs text-gray-300">
                                        Unity 3D interface with sliders for precise servo control
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">🔍</div>
                                    <h4 className="text-base font-bold text-white mb-2">Computer Vision</h4>
                                    <p className="text-xs text-gray-300">
                                        Color detection enables object tracking and automated tasks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Conclusion Section */}
            <section 
                id="conclusion" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Conclusion"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Conclusion
                        </h2>

                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Summary</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                                This project successfully demonstrates a complete tele-operation system for a 6-degree-of-freedom robotic arm. By integrating ESP32 microcontroller, WiFi communication, computer vision, and Unity 3D interface, I created a wireless robotic control system that showcases practical applications in robotics, embedded systems, and human-robot interaction.
                            </p>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                The system's modular architecture and use of accessible, cost-effective components make it an excellent foundation for educational purposes and further development. The integration of multiple technologies—from low-level hardware control to high-level user interfaces—demonstrates comprehensive systems engineering skills and the ability to work across the full stack of robotic systems.
                            </p>
                        </div>

                        {/* Technical Skills Demonstrated */}
                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Technical Skills Demonstrated</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <div className="text-sm font-semibold text-blue-300 mb-2">Embedded Systems</div>
                                    <div className="text-xs text-gray-300">ESP32 programming, PWM control, GPIO management</div>
                                </div>
                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <div className="text-sm font-semibold text-cyan-300 mb-2">Network Programming</div>
                                    <div className="text-xs text-gray-300">UDP sockets, WiFi communication, protocol design</div>
                                </div>
                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <div className="text-sm font-semibold text-green-300 mb-2">Computer Vision</div>
                                    <div className="text-xs text-gray-300">OpenCV, color detection, object tracking</div>
                                </div>
                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <div className="text-sm font-semibold text-purple-300 mb-2">3D Interface Design</div>
                                    <div className="text-xs text-gray-300">Unity 3D, UI/UX design, real-time visualization</div>
                                </div>
                            </div>
                        </div>

                        {/* Future Enhancements */}
                        <div className="glass rounded-xl p-6 border-white/10 border">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Future Enhancements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div className="text-sm font-semibold text-orange-300 mb-2">Inverse Kinematics</div>
                                    <div className="text-xs text-gray-300">Implement IK solver for end-effector position control</div>
                                </div>
                                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div className="text-sm font-semibold text-orange-300 mb-2">Path Planning</div>
                                    <div className="text-xs text-gray-300">Add trajectory planning for smooth movements</div>
                                </div>
                                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div className="text-sm font-semibold text-orange-300 mb-2">Force Feedback</div>
                                    <div className="text-xs text-gray-300">Integrate force sensors for haptic feedback</div>
                                </div>
                                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div className="text-sm font-semibold text-orange-300 mb-2">Autonomous Modes</div>
                                    <div className="text-xs text-gray-300">Implement automated pick-and-place using computer vision</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

export default SixDOFRoboticArm;

