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
                <div className={`relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center rounded-lg overflow-hidden w-full ${
                    isPNG ? 'bg-white' : 'bg-gradient-to-br from-orange-500/10 to-amber-500/10'
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
                            e.target.style.display = 'block';
                        }}
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
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/30 focus:bg-orange-500/40 text-white p-3 sm:p-4 rounded-full transition-all border-2 border-orange-500/30 focus:border-orange-500 z-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/30 focus:bg-orange-500/40 text-white p-3 sm:p-4 rounded-full transition-all border-2 border-orange-500/30 focus:border-orange-500 z-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${
                                    index === currentIndex
                                        ? "bg-orange-500 w-8"
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

// Tech Stack Carousel Component
const TechStackCarousel = () => {
    const categories = [
        {
            name: "Frontend",
            icon: "🎨",
            technologies: [
                { name: "React 18", desc: "UI framework with hooks" },
                { name: "TypeScript", desc: "Type safety" },
                { name: "Vite", desc: "Fast build tooling" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "shadcn/ui", desc: "Accessible components" },
                { name: "React Router v7", desc: "Client-side routing" }
            ]
        },
        {
            name: "Vector Processing",
            icon: "✏️",
            technologies: [
                { name: "opentype.js", desc: "Font parsing & text-to-path" },
                { name: "Paper.js", desc: "Path boolean operations" },
                { name: "jsPDF", desc: "PDF generation" },
                { name: "svg2pdf.js", desc: "Vector PDF conversion" },
                { name: "html-to-image", desc: "Design capture" }
            ]
        },
        {
            name: "Backend & Auth",
            icon: "🔒",
            technologies: [
                { name: "Node.js / Express", desc: "RESTful API" },
                { name: "Firebase Auth", desc: "Email + Google OAuth" },
                { name: "Firestore", desc: "NoSQL database" },
                { name: "Replicate API", desc: "AI image generation" },
                { name: "Etsy OAuth", desc: "Purchase verification" }
            ]
        },
        {
            name: "Analytics & Deploy",
            icon: "📊",
            technologies: [
                { name: "Google Analytics 4", desc: "User tracking" },
                { name: "GitHub Pages", desc: "Frontend hosting" },
                { name: "Vercel", desc: "Speed insights" }
            ]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCategory = () => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
    };

    const prevCategory = () => {
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    };

    return (
        <div className="relative">
            <div className="glass rounded-xl p-8 border-white/10 border overflow-hidden">
                <div className="relative">
                    <div className="text-center min-h-[280px] flex flex-col justify-start">
                        <div className="text-5xl mb-4">{categories[currentIndex].icon}</div>
                        <h4 className="text-2xl font-bold text-white mb-6">
                            {categories[currentIndex].name}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                            {categories[currentIndex].technologies.map((tech, idx) => (
                                <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-left">
                                    <div className="font-semibold text-orange-300">{tech.name}</div>
                                    <div className="text-sm text-gray-400">{tech.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevCategory}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/30 text-white p-3 rounded-full transition-all border border-orange-500/30"
                        aria-label="Previous category"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextCategory}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500/20 hover:bg-orange-500/30 text-white p-3 rounded-full transition-all border border-orange-500/30"
                        aria-label="Next category"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? "bg-orange-500 w-8"
                                    : "bg-gray-600 hover:bg-gray-500"
                            }`}
                            aria-label={`Go to ${cat.name}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Data Flow Component
const DataFlowDiagram = () => {
    const [activeFlow, setActiveFlow] = useState(0);
    const [hoveredStep, setHoveredStep] = useState(null);

    const flows = [
        {
            id: "design",
            title: "Design → Export Flow",
            icon: "🎨",
            color: "orange",
            description: "How user customizations become production-ready vector files",
            steps: [
                { icon: "👤", label: "User Input", detail: "Customer enters family names and customization options" },
                { icon: "⚛️", label: "React State", detail: "Changes managed via React hooks with real-time updates" },
                { icon: "🖼️", label: "SVG Render", detail: "Dynamic SVG generation with layer-based architecture" },
                { icon: "🔤", label: "opentype.js", detail: "Text converted to bezier curves (font → paths)" },
                { icon: "📐", label: "Paper.js", detail: "Path union operations for continuous outlines" },
                { icon: "⬇️", label: "Download", detail: "Clean SVG/PDF with no font dependencies" }
            ]
        },
        {
            id: "auth",
            title: "Authentication Flow",
            icon: "🔐",
            color: "green",
            description: "How customers verify their Etsy purchase to access the tool",
            steps: [
                { icon: "🔑", label: "Login", detail: "Email/password or Google OAuth via Firebase" },
                { icon: "🔥", label: "Firebase Auth", detail: "JWT token issued, session established" },
                { icon: "📋", label: "Check Firestore", detail: "Query user verification status in database" },
                { icon: "🛒", label: "Etsy OAuth", detail: "PKCE flow to verify order exists" },
                { icon: "✅", label: "Verified", detail: "Update Firestore, grant access to editor" },
                { icon: "🎨", label: "Editor Access", detail: "Protected routes now accessible" }
            ]
        },
        {
            id: "ai",
            title: "AI Mockup Flow",
            icon: "🤖",
            color: "purple",
            description: "How the design becomes a realistic product visualization",
            steps: [
                { icon: "📸", label: "Capture", detail: "html-to-image captures design as PNG" },
                { icon: "📤", label: "Upload", detail: "Image sent to Express.js backend" },
                { icon: "🧠", label: "Replicate API", detail: "Flux-Pro model processes with reference images" },
                { icon: "🖼️", label: "Generate", detail: "AI creates photorealistic mockup" },
                { icon: "⬇️", label: "Return URL", detail: "Generated image URL sent to client" },
                { icon: "✨", label: "Display", detail: "Modal shows mockup with download option" }
            ]
        }
    ];

    const colorClasses = {
        orange: {
            bg: "bg-orange-500/20",
            border: "border-orange-500",
            text: "text-orange-400",
            glow: "shadow-[0_0_20px_rgba(249,115,22,0.3)]",
            line: "bg-gradient-to-r from-orange-500 to-amber-500"
        },
        green: {
            bg: "bg-green-500/20",
            border: "border-green-500",
            text: "text-green-400",
            glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
            line: "bg-gradient-to-r from-green-500 to-emerald-500"
        },
        purple: {
            bg: "bg-purple-500/20",
            border: "border-purple-500",
            text: "text-purple-400",
            glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
            line: "bg-gradient-to-r from-purple-500 to-pink-500"
        }
    };

    const activeFlowData = flows[activeFlow];
    const colors = colorClasses[activeFlowData.color];

    return (
        <div className="space-y-6">
            {/* Flow Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
                {flows.map((flow, index) => (
                    <button
                        key={flow.id}
                        onClick={() => setActiveFlow(index)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            activeFlow === index
                                ? `${colorClasses[flow.color].bg} ${colorClasses[flow.color].border} border-2 ${colorClasses[flow.color].glow}`
                                : 'glass border border-white/10 hover:border-white/30'
                        }`}
                    >
                        <span className="text-xl">{flow.icon}</span>
                        <span className={activeFlow === index ? colorClasses[flow.color].text : 'text-white'}>
                            {flow.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Flow Description */}
            <p className="text-center text-gray-400 text-sm">{activeFlowData.description}</p>

            {/* Interactive Flow Pipeline */}
            <div className="glass rounded-xl p-6 border-white/10 border overflow-hidden">
                {/* Desktop Flow (horizontal) */}
                <div className="hidden md:block">
                    <div className="flex items-center justify-between relative">
                        {/* Animated connecting line */}
                        <div className={`absolute top-1/2 left-0 right-0 h-1 ${colors.line} opacity-30 -translate-y-1/2 z-0`}>
                            <div className={`h-full ${colors.line} animate-pulse`} style={{ 
                                animation: 'flowPulse 2s ease-in-out infinite',
                                background: `linear-gradient(90deg, transparent, ${activeFlowData.color === 'orange' ? '#f97316' : activeFlowData.color === 'green' ? '#22c55e' : '#a855f7'}, transparent)`,
                                backgroundSize: '200% 100%'
                            }}></div>
                        </div>
                        
                        {activeFlowData.steps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center">
                                {/* Step node */}
                                <div
                                    onMouseEnter={() => setHoveredStep(index)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ${
                                        hoveredStep === index
                                            ? `${colors.bg} ${colors.border} border-2 ${colors.glow} scale-110`
                                            : 'glass border border-white/20 hover:border-white/40'
                                    }`}
                                >
                                    {step.icon}
                                </div>
                                
                                {/* Label */}
                                <div className={`mt-2 text-xs font-medium text-center transition-colors ${
                                    hoveredStep === index ? colors.text : 'text-gray-400'
                                }`}>
                                    {step.label}
                                </div>

                                {/* Arrow (except last) */}
                                {index < activeFlowData.steps.length - 1 && (
                                    <div className={`absolute top-1/2 -right-4 transform -translate-y-1/2 ${colors.text} opacity-60`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}

                                {/* Tooltip on hover */}
                                <div className={`absolute top-full mt-8 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg glass border ${colors.border}/30 transition-all duration-300 ${
                                    hoveredStep === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}>
                                    <div className={`text-sm font-semibold ${colors.text} mb-1`}>{step.label}</div>
                                    <div className="text-xs text-gray-400">{step.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Flow (vertical) */}
                <div className="md:hidden space-y-4">
                    {activeFlowData.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                            {/* Step node and line */}
                            <div className="flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${colors.bg} ${colors.border} border`}>
                                    {step.icon}
                                </div>
                                {index < activeFlowData.steps.length - 1 && (
                                    <div className={`w-0.5 h-8 ${colors.line} opacity-50 mt-2`}></div>
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 pt-2">
                                <div className={`font-semibold ${colors.text}`}>{step.label}</div>
                                <div className="text-sm text-gray-400">{step.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover instruction */}
            <p className="text-center text-gray-500 text-xs hidden md:block">Hover over each step to learn more</p>
        </div>
    );
};

export const FamilyTreeApp = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

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

    // Timeline data
    const timelinePhases = [
        {
            phase: "Day 1",
            title: "Design & Planning",
            duration: "Monday",
            description: "Created Figma designs, established color palette and typography, planned layer architecture and user flow.",
            icon: "🎨"
        },
        {
            phase: "Day 2",
            title: "Core Editor",
            duration: "Tuesday",
            description: "Built the 3-layer design editor with SVG rendering, real-time preview, and responsive layout system.",
            icon: "🖥️"
        },
        {
            phase: "Day 3",
            title: "Vector Export",
            duration: "Wednesday",
            description: "Integrated opentype.js for text-to-path conversion, Paper.js for path operations, and built SVG/PDF export pipeline.",
            icon: "📐"
        },
        {
            phase: "Day 4",
            title: "Auth & Backend",
            duration: "Thursday",
            description: "Set up Firebase Auth, Firestore database, Express.js backend, and Etsy OAuth order verification system.",
            icon: "🔐"
        },
        {
            phase: "Day 5",
            title: "AI & Launch",
            duration: "Friday",
            description: "Integrated Replicate API for AI mockups, added GA4 analytics, final polish, and deployed to GitHub Pages.",
            icon: "🚀"
        }
    ];

    // Feature data for the interactive component grid
    const features = [
        {
            name: "Layer System",
            icon: "📐",
            description: "Three-layer design system matching physical manufacturing: Top (dedication text), Middle (family tree), Bottom (frame).",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-main-page.png", caption: "Top Layer: Customize dedication text with preset phrases or custom messages" },
                { src: "/assets/images/familytreeapp/screenshot-middle-layer.png", caption: "Middle Layer: Heart-shaped family tree with 3-18 customizable names" },
                { src: "/assets/images/familytreeapp/screenshot-bottom-layer.png", caption: "Bottom Layer: Frame and background with wood tone selection" }
            ]
        },
        {
            name: "Name Editor",
            icon: "✏️",
            description: "Smart name management supporting 3-18 family names with individual font sizing and real-time preview.",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-custom-name.png", caption: "Individual name sizing controls for perfect fit on any name length" },
                { src: "/assets/images/familytreeapp/screenshot-middle-layer.png", caption: "Names dynamically positioned within heart shapes using layout algorithms" }
            ]
        },
        {
            name: "Vector Export",
            icon: "⬇️",
            description: "Production-ready SVG/PDF export with text converted to vector paths for laser cutting compatibility.",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-bottom-layer.png", caption: "Export options with layer selection and material preview for manufacturing" }
            ]
        },
        {
            name: "AI Mockups",
            icon: "🤖",
            description: "Integrated AI visualization using Replicate's Flux-Pro model to preview the final laser-cut product.",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-main-page.png", caption: "Generate realistic mockups of your design before manufacturing" }
            ]
        },
        {
            name: "Authentication",
            icon: "🔒",
            description: "Multi-layer security with Firebase Auth and Etsy order verification to ensure only customers can access the tool.",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-oauth.png", caption: "Secure login with email/password or Google OAuth, plus Etsy purchase verification" }
            ]
        },
        {
            name: "Mobile Ready",
            icon: "📱",
            description: "Fully responsive design allowing customers to create their family tree on any device.",
            images: [
                { src: "/assets/images/familytreeapp/screenshot-mobile.jpg", caption: "Complete design functionality on mobile devices with touch-optimized controls" }
            ]
        }
    ];

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
                                background: 'linear-gradient(to right, #f97316, #eab308)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: '#f97316',
                                display: 'block',
                                visibility: 'visible',
                                opacity: 1
                            }}>
                                Family Tree Generator
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> Family Tree Generator: A Full-Stack Design Tool for Laser-Ready Customizable Signs
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Full-Stack Web Application / Product Design Tool
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/familytreeapp/Family-Tree-Generator-Thumbnail.png" 
                                            alt="Family Tree Generator App Overview - Design interface showing the web application and final laser-cut product" 
                                            className="w-full h-auto rounded-lg mb-2"
                                            loading="eager"
                                            decoding="async"
                                            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                            onError={(e) => {
                                                console.error(`Failed to load image`);
                                                e.target.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                e.target.style.display = 'block';
                                            }}
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            Family Tree Generator enables customers to design personalized family tree signs with instant machine-ready SVG/PDF export for laser cutting.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> Family Tree Generator is a sophisticated full-stack web application that enables customers to design personalized, laser-ready family tree signs. Built for FlareTech Laser & Design, this tool transforms a complex customization process into an intuitive, real-time design experience. The application features a three-layer design system mirroring physical manufacturing, smart name management for 3-18 family members, production-ready vector export with text-to-path conversion, AI-powered mockup generation, and secure Etsy order verification. The system reduced customization time by 83% and error rates by 93% while enabling unlimited concurrent users.
                                </p>
                                
                                {/* Video Embed */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4 text-orange-400">Project Video</h3>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/cpNamtpg2lY"
                                            title="Family Tree Generator Project Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                </div>

                                {/* Try Demo Button */}
                                <div className="mt-8 text-center">
                                    <a
                                        href="https://tglenn2012.github.io/Family-Tree-Generator/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(249,115,22,0.3)] text-lg"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Try Live Demo
                                    </a>
                                    <p className="text-gray-400 text-sm mt-2">Downloads disabled in demo mode</p>
                                </div>
                            </div>

                            {/* My Role Cards */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">My Role</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🎨</div>
                                        <div className="text-lg font-bold text-white mb-2">UI/UX Designer</div>
                                        <div className="text-sm text-gray-300">Figma designs & component library</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">💻</div>
                                        <div className="text-lg font-bold text-white mb-2">Frontend Developer</div>
                                        <div className="text-sm text-gray-300">React + TypeScript + SVG manipulation</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">⚙️</div>
                                        <div className="text-lg font-bold text-white mb-2">Backend Developer</div>
                                        <div className="text-sm text-gray-300">Express.js API & AI integration</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">📊</div>
                                        <div className="text-lg font-bold text-white mb-2">Product Owner</div>
                                        <div className="text-sm text-gray-300">Analytics & business strategy</div>
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
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent text-center">
                                The Problem
                            </h2>
                            
                            {/* Business Challenge */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center">Business Challenge</h3>
                                <p className="text-gray-200 text-center mb-6 max-w-3xl mx-auto">
                                    FlareTech Laser & Design sells customizable family tree signs on Etsy. The traditional workflow was manual, time-consuming, and couldn't scale.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-red-500/30 border text-center">
                                        <div className="text-4xl mb-3">⏰</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Time-Consuming</h4>
                                        <p className="text-sm text-gray-300">~30 minutes per order for manual customization</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-red-500/30 border text-center">
                                        <div className="text-4xl mb-3">💬</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Communication Overhead</h4>
                                        <p className="text-sm text-gray-300">3-5 message rounds for revisions per order</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-red-500/30 border text-center">
                                        <div className="text-4xl mb-3">❌</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Error-Prone</h4>
                                        <p className="text-sm text-gray-300">~15% error rate from typos and miscommunication</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-red-500/30 border text-center">
                                        <div className="text-4xl mb-3">📉</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Limited Scalability</h4>
                                        <p className="text-sm text-gray-300">Business growth bottlenecked by seller time</p>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Challenge */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center">Technical Challenge</h3>
                                <p className="text-gray-200 text-center mb-6 max-w-3xl mx-auto">
                                    Creating a design tool for laser cutting presents unique requirements beyond typical web applications.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">📐</div>
                                            <h4 className="text-lg font-bold text-white">Vector Precision</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">Output must be mathematically precise vector paths, not rasterized images. Laser cutters follow paths exactly.</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">🔤</div>
                                            <h4 className="text-lg font-bold text-white">Font Independence</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">Text must be converted to paths so files work on any machine without requiring font installation.</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">📚</div>
                                            <h4 className="text-lg font-bold text-white">Multi-layer Manufacturing</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">Physical laser-cut signs use stacked layers of different materials, requiring separate exportable layers.</p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">🌐</div>
                                            <h4 className="text-lg font-bold text-white">Cross-browser Consistency</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">Design must render identically across all platforms and browsers for reliable output.</p>
                                    </div>
                                </div>
                            </div>

                            {/* The Solution */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">The Solution</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-green-500/30 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-4xl mb-3">🛠️</div>
                                        <h4 className="text-lg font-bold text-white mb-3">Self-Service Tool</h4>
                                        <p className="text-sm text-gray-200">
                                            Customers design their own family trees with real-time preview and instant export.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/30 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-4xl mb-3">⚡</div>
                                        <h4 className="text-lg font-bold text-white mb-3">Vector Export Pipeline</h4>
                                        <p className="text-sm text-gray-200">
                                            Text-to-path conversion using opentype.js and Paper.js for production-ready output.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/30 border hover:-translate-y-1 transition-all text-center">
                                        <div className="text-4xl mb-3">🔒</div>
                                        <h4 className="text-lg font-bold text-white mb-3">Secure Access</h4>
                                        <p className="text-sm text-gray-200">
                                            Etsy order verification ensures only paying customers can access the tool.
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
                id="role" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="My Role and Responsibilities"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent text-center">
                                My Role & Responsibilities
                            </h2>

                            <p className="text-gray-200 text-center mb-8 max-w-3xl mx-auto text-lg">
                                As the <strong className="text-orange-400">sole developer and designer</strong>, I independently built this entire application from concept to deployment in an intensive <strong className="text-orange-400">5-day design sprint</strong>.
                            </p>

                            {/* Development Timeline */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">5-Day Design Sprint</h3>
                                <div className="relative">
                                    {/* Timeline line - hidden on mobile */}
                                    <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/20 via-orange-500 to-orange-500/20"></div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        {timelinePhases.map((phase, index) => (
                                            <div 
                                                key={index}
                                                role="button"
                                                tabIndex={0}
                                                aria-expanded={expandedCard === index}
                                                onClick={() => handleCardClick(index)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleCardClick(index);
                                                    }
                                                }}
                                                className={`relative cursor-pointer transition-all duration-300 ${
                                                    expandedCard === index ? 'md:col-span-2 md:-mx-4' : ''
                                                }`}
                                            >
                                                {/* Timeline dot - hidden on mobile */}
                                                <div className="hidden md:flex absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full items-center justify-center z-10 border-4 border-black">
                                                    <span className="text-xs">{phase.icon}</span>
                                                </div>
                                                
                                                <div className={`glass rounded-xl p-4 border-orange-500/30 border mt-0 md:mt-10 hover:-translate-y-1 transition-all ${
                                                    expandedCard === index ? 'bg-orange-500/10' : ''
                                                }`}>
                                                    <div className="text-center">
                                                        <div className="md:hidden text-3xl mb-2">{phase.icon}</div>
                                                        <div className="text-xs text-orange-400 font-semibold">{phase.phase}</div>
                                                        <div className="text-sm font-bold text-white">{phase.title}</div>
                                                        <div className="text-xs text-gray-400">{phase.duration}</div>
                                                    </div>
                                                    
                                                    {/* Expanded content */}
                                                    <div className={`overflow-hidden transition-all duration-300 ${
                                                        expandedCard === index ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}>
                                                        <p className="text-sm text-gray-300">{phase.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-center text-gray-400 text-sm mt-4">Click on a day to learn more</p>
                            </div>

                            {/* Responsibilities Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                                        <span>🎨</span> Design & UX
                                    </h4>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Designed all interfaces in Figma</li>
                                        <li>• Created reusable component library</li>
                                        <li>• Implemented responsive, mobile-first layouts</li>
                                        <li>• Built 50+ accessible UI components</li>
                                    </ul>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                                        <span>💻</span> Frontend Development
                                    </h4>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Built React + TypeScript application</li>
                                        <li>• Implemented complex SVG manipulation</li>
                                        <li>• Created real-time preview system</li>
                                        <li>• Optimized rendering with memoization</li>
                                    </ul>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                                        <span>⚙️</span> Backend & Integration
                                    </h4>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Developed Express.js API server</li>
                                        <li>• Integrated Replicate AI for mockups</li>
                                        <li>• Implemented Etsy OAuth flow with PKCE</li>
                                        <li>• Configured Firebase Auth & Firestore</li>
                                    </ul>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                                        <span>📊</span> Analytics & DevOps
                                    </h4>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Integrated GA4 with custom events</li>
                                        <li>• Designed conversion funnel tracking</li>
                                        <li>• Set up CI/CD with GitHub Pages</li>
                                        <li>• Implemented feedback survey system</li>
                                    </ul>
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
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent text-center">
                                Process & Solution
                            </h2>

                            {/* System Architecture - Interactive Data Flows */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-orange-400 text-center">System Architecture</h3>
                                <DataFlowDiagram />
                            </div>

                            {/* Tech Stack Carousel */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center">Technology Stack</h3>
                                <TechStackCarousel />
                            </div>

                            {/* Feature Component Grid */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center">Key Features</h3>
                                
                                {/* Feature Selection Buttons */}
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                                    {features.map((feature, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveFeature(index)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setActiveFeature(index);
                                                }
                                            }}
                                            className={`p-3 rounded-xl text-center transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                                activeFeature === index
                                                    ? 'bg-orange-500/30 border-2 border-orange-500'
                                                    : 'glass border border-white/10 hover:border-orange-500/50'
                                            }`}
                                            aria-pressed={activeFeature === index}
                                        >
                                            <div className="text-2xl mb-1">{feature.icon}</div>
                                            <div className="text-xs text-white font-medium">{feature.name}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Active Feature Details */}
                                <div className="glass rounded-xl p-6 border-orange-500/30 border">
                                    <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <span className="text-3xl">{features[activeFeature].icon}</span>
                                        {features[activeFeature].name}
                                    </h4>
                                    <p className="text-gray-300 mb-4">{features[activeFeature].description}</p>
                                    
                                    <ImageCarouselWithCaptions images={features[activeFeature].images} />
                                </div>
                            </div>

                            {/* Key Technical Decisions */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center">Key Technical Decisions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="font-bold text-white mb-2">opentype.js for fonts</div>
                                        <p className="text-sm text-gray-400">Client-side font parsing enables text-to-path without backend processing, keeping all rendering local and fast.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="font-bold text-white mb-2">Paper.js for paths</div>
                                        <p className="text-sm text-gray-400">Boolean operations needed to create continuous outlines for laser cutting—letters like 'O' have holes that need correct winding rules.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="font-bold text-white mb-2">Layer-based architecture</div>
                                        <p className="text-sm text-gray-400">Mirrors physical manufacturing process exactly, enabling independent layer export for multi-material laser cutting.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="font-bold text-white mb-2">shadcn/ui over MUI</div>
                                        <p className="text-sm text-gray-400">Lightweight, customizable, accessible components that don't bloat the bundle—critical for a design tool with complex SVG rendering.</p>
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
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                aria-label="Results and Outcomes"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent text-center">
                                Results & Outcomes
                            </h2>

                            {/* Business Impact Metrics */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Business Impact</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">83%</div>
                                        <div className="text-sm text-gray-300">Time Reduction</div>
                                        <div className="text-xs text-gray-500 mt-1">30min → 5min per order</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">100%</div>
                                        <div className="text-sm text-gray-300">Self-Service</div>
                                        <div className="text-xs text-gray-500 mt-1">0 messages needed</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">93%</div>
                                        <div className="text-sm text-gray-300">Error Reduction</div>
                                        <div className="text-xs text-gray-500 mt-1">15% → &lt;1% error rate</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                        <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">∞</div>
                                        <div className="text-sm text-gray-300">Scalability</div>
                                        <div className="text-xs text-gray-500 mt-1">Unlimited concurrent users</div>
                                    </div>
                                </div>
                            </div>

                            {/* Before/After Comparison */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Before vs After</h3>
                                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                                    <table role="table" aria-label="Before and After Comparison" className="w-full min-w-[500px] text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b border-white/20">
                                                <th scope="col" className="text-left py-3 px-4 text-gray-400 font-semibold">Metric</th>
                                                <th scope="col" className="text-center py-3 px-4 text-red-400 font-semibold">Before</th>
                                                <th scope="col" className="text-center py-3 px-4 text-green-400 font-semibold">After</th>
                                                <th scope="col" className="text-center py-3 px-4 text-orange-400 font-semibold">Improvement</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-white/10">
                                                <th scope="row" className="text-left py-3 px-4 text-white">Customization Time</th>
                                                <td className="text-center py-3 px-4 text-gray-300">~30 min/order</td>
                                                <td className="text-center py-3 px-4 text-gray-300">~5 min/order</td>
                                                <td className="text-center py-3 px-4 text-green-400 font-bold">83% faster</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <th scope="row" className="text-left py-3 px-4 text-white">Communication</th>
                                                <td className="text-center py-3 px-4 text-gray-300">3-5 messages</td>
                                                <td className="text-center py-3 px-4 text-gray-300">0 messages</td>
                                                <td className="text-center py-3 px-4 text-green-400 font-bold">100% eliminated</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <th scope="row" className="text-left py-3 px-4 text-white">Error Rate</th>
                                                <td className="text-center py-3 px-4 text-gray-300">~15%</td>
                                                <td className="text-center py-3 px-4 text-gray-300">&lt;1%</td>
                                                <td className="text-center py-3 px-4 text-green-400 font-bold">93% reduction</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="text-left py-3 px-4 text-white">Capacity</th>
                                                <td className="text-center py-3 px-4 text-gray-300">Limited by seller</td>
                                                <td className="text-center py-3 px-4 text-gray-300">Unlimited</td>
                                                <td className="text-center py-3 px-4 text-green-400 font-bold">∞ improvement</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Technical Achievements */}
                            <div>
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Technical Achievements</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-5 border-white/10 border flex items-start gap-4">
                                        <div className="text-3xl">✅</div>
                                        <div>
                                            <div className="font-bold text-white mb-1">100% Vector Output</div>
                                            <p className="text-sm text-gray-400">Compatible with all major laser cutting software (LightBurn, LaserGRBL, etc.)</p>
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border flex items-start gap-4">
                                        <div className="text-3xl">⚡</div>
                                        <div>
                                            <div className="font-bold text-white mb-1">Sub-second Updates</div>
                                            <p className="text-sm text-gray-400">Optimized React rendering with memoization for instant preview</p>
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border flex items-start gap-4">
                                        <div className="text-3xl">📱</div>
                                        <div>
                                            <div className="font-bold text-white mb-1">Fully Responsive</div>
                                            <p className="text-sm text-gray-400">Complete functionality on mobile devices (iOS Safari, Android Chrome)</p>
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border flex items-start gap-4">
                                        <div className="text-3xl">♿</div>
                                        <div>
                                            <div className="font-bold text-white mb-1">WCAG 2.1 AA Compliant</div>
                                            <p className="text-sm text-gray-400">Keyboard navigation, screen reader support, focus management</p>
                                        </div>
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
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent text-center">
                                Conclusion
                            </h2>

                            {/* Key Takeaways */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Key Takeaways</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border text-center">
                                        <div className="text-4xl mb-3">🎯</div>
                                        <h4 className="text-lg font-bold text-white mb-2">User-Centered Design</h4>
                                        <p className="text-sm text-gray-300">
                                            Understanding the end-to-end customer journey—from Etsy purchase to final laser cut—informed every design decision.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border text-center">
                                        <div className="text-4xl mb-3">🔧</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Technical Problem Solving</h4>
                                        <p className="text-sm text-gray-300">
                                            Vector graphics for manufacturing required deep understanding of font rendering, path operations, and coordinate systems.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border text-center">
                                        <div className="text-4xl mb-3">📈</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Business Impact</h4>
                                        <p className="text-sm text-gray-300">
                                            Technology transformed a bottleneck into a competitive advantage, enabling unlimited scale with better customer experience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Future Work */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Future Enhancements</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">🌳</span>
                                            <span className="font-bold text-white">Additional Tree Designs</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Expand template library with more tree shapes and layout options.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">💾</span>
                                            <span className="font-bold text-white">Design Saving</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Allow customers to save and return to their designs across sessions.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">🖼️</span>
                                            <span className="font-bold text-white">More AI Mockup Styles</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Add different room settings and lighting options for mockup generation.</p>
                                    </div>
                                    <div className="glass rounded-xl p-5 border-white/10 border">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">🛒</span>
                                            <span className="font-bold text-white">Direct Ordering</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Enable customers to order the physical product directly from the app.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Acknowledgements */}
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-6 text-center text-orange-400">Acknowledgements</h3>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-white mb-3">Open Source Libraries</h4>
                                            <ul className="space-y-1 text-sm text-gray-300">
                                                <li>• <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">shadcn/ui</a> - Component system</li>
                                                <li>• <a href="https://opentype.js.org/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">opentype.js</a> - Font parsing</li>
                                                <li>• <a href="http://paperjs.org/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Paper.js</a> - Path operations</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-3">Services</h4>
                                            <ul className="space-y-1 text-sm text-gray-300">
                                                <li>• <a href="https://replicate.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Replicate</a> - AI image generation</li>
                                                <li>• <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Firebase</a> - Auth & database</li>
                                                <li>• <a href="https://www.etsy.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Etsy</a> - E-commerce platform</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Final CTA */}
                            <div className="glass rounded-xl p-8 border-orange-500/30 border bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-center">
                                <h3 className="text-2xl font-bold text-white mb-4">Experience the Family Tree Generator</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                    This project demonstrates proficiency in full-stack development, UI/UX design, vector graphics processing, API integration, and solving real-world business problems through technology.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://tglenn2012.github.io/Family-Tree-Generator/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(249,115,22,0.3)]"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Try Live Demo
                                    </a>
                                    <a
                                        href="https://github.com/TGlenn2012/Family-Tree-Generator"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        View on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

