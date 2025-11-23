import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../RevealOnScroll";

// Statistical Visualization Component
const StatVisualization = ({ mean, stdDev, maxScale = 7, label }) => {
    const percentage = (mean / maxScale) * 100;
    let colorClass = "from-green-500 to-emerald-600";
    if (mean < 4) {
        colorClass = "from-red-500 to-orange-600";
    } else if (mean < 5.5) {
        colorClass = "from-yellow-500 to-orange-500";
    }
    
    return (
        <div className="mb-3">
            {label && <div className="text-xs text-gray-400 mb-1">{label}</div>}
            <div className="relative w-full h-6 bg-gray-700/50 rounded-full overflow-hidden">
                <div 
                    className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500 rounded-full`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={mean}
                    aria-valuemin={0}
                    aria-valuemax={maxScale}
                    aria-label={`${label || 'Value'}: ${mean.toFixed(2)}`}
                />
            </div>
            <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-300">Mean: {mean.toFixed(2)}</span>
                <span className="text-xs text-gray-400">σ = {stdDev.toFixed(2)}</span>
            </div>
        </div>
    );
};

// Visual Quote Card Component with Child SVG Icon
const QuoteCard = ({ quote, name, age, gender }) => {
    return (
        <div className="glass rounded-xl p-6 border-white/10 border relative overflow-hidden">
            <div className="absolute top-4 left-4 text-6xl text-blue-500/20">"</div>
            <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0">
                    <svg 
                        width="60" 
                        height="60" 
                        viewBox="0 0 60 60" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-400"
                    >
                        <circle cx="30" cy="30" r="28" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"/>
                        <circle cx="30" cy="22" r="8" fill="currentColor" fillOpacity="0.6"/>
                        <path d="M20 45 C20 35, 25 32, 30 32 C35 32, 40 35, 40 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" fillOpacity="0.6"/>
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-base sm:text-lg text-gray-200 italic mb-3 leading-relaxed">
                        {quote}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="font-semibold text-gray-300">{name}</span>
                        <span>•</span>
                        <span>{gender}, age {age}</span>
                    </div>
                </div>
            </div>
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

export const MicrokARts = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeComponent, setActiveComponent] = useState(0);
    const [gifPlaying, setGifPlaying] = useState(true);

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
                                MicrokARts
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> MicrokARts: An Interactive System for Co-Located AR-IoT Interactions with Children
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Research Project
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/microkarts-header.png" 
                                            alt="MicrokARts is an Augmented Reality platform designed to help children design and program electro-mechanical devices, while collaborating on tasks in a dynamic AR-IoT environment. Users (A) decide which electronics they want to put on their MicrokARt, (B) program their MicrokARt using our block-based live programming website, (C) dock the phone onto the MicrokARt, and (D) control their MicrokARt and play with others through AR-IoT interactions."
                                            className="w-full h-auto rounded-lg mb-2"
                                            loading="eager"
                                            decoding="async"
                                            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/microkarts-header.png`);
                                                e.target.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                e.target.style.display = 'block';
                                            }}
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            MicrokARts is an Augmented Reality platform designed to help children design and program electro-mechanical devices, while collaborating on tasks in a dynamic AR-IoT environment. Users (A) decide which electronics they want to put on their MicrokARt, (B) program their MicrokARt using our block-based live programming website, (C) dock the phone onto the MicrokARt, and (D) control their MicrokARt and play with others through AR-IoT interactions.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> Augmented Reality (AR) is a popular tool for children to engage with technology in exciting ways; coupled with the Internet of Things (IoT), these domains create unique opportunities for children to explore, learn, and play. However, many systems today enable such experiences without allowing end-users to customize the contents' looks or behavior. With MicrokARts, I designed a system that supports children in designing new, creative experiences with AR-IoT interactions. To this end, I developed MicrokARts, allowing children to (1) create an IoT kart, clad with actuators and sensors, (2) program using our block-based programming environment, and (3) interact wirelessly in a dynamic AR-IoT environment. I tested our initial system with 4 graduate student experts and 15 youth (age=11-18), before testing MicrokARts with 22 children (ages=9-15). I observed how children designed their interactions using AR and IoT devices, and their engagement with the technology.
                                </p>
                                
                                {/* Video Embed */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Project Video</h3>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/YeAr83zCgrY?si=SxcdQz43biOSt1PN"
                                            title="MicrokARts Project Video"
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
                                        <div className="text-xl font-bold text-white mb-2">Research Lead</div>
                                        <div className="text-sm text-gray-300">Led the expert pilot study with 4 graduate students and conducted user evaluations with 22 children (ages 9-15) to validate system design and usability. Analyzed feedback to inform system architecture and interaction design.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">💻</div>
                                        <div className="text-xl font-bold text-white mb-2">System Development</div>
                                        <div className="text-sm text-gray-300">Designed and developed the IoT kart hardware, IoT Maker block-based programming web application with live simulation, and the MicrokARts mobile AR application with multi-user AR-IoT interactions.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🎓</div>
                                        <div className="text-xl font-bold text-white mb-2">Curriculum Designer</div>
                                        <div className="text-sm text-gray-300">Created educational content and conducted workshops with youth participants to evaluate the system in creative play settings, integrating AR-IoT interactions into collaborative activities.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Paper Link Button */}
                            <div className="mt-8 flex justify-center">
                                <a
                                    href="/assets/papers/microkarts.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                    aria-label="View the MicrokARts Paper (opens in new tab)"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                    <span>View the MicrokARts Paper</span>
                                </a>
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
                            
                            {/* Summarized Introduction */}
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                                    Augmented Reality (AR) and Internet of Things (IoT) technologies each offer powerful capabilities for children to explore, learn, and play. However, existing AR-IoT systems have a critical gap: they do not allow users to create, program, or alter physical devices in an active way, limiting children's ability to customize and create their own dynamic AR-IoT experiences.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🔗</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Limited Customization</h3>
                                        <p className="text-sm text-gray-200">
                                            Many AR-IoT systems enable experiences without allowing end-users to customize the contents' looks or behavior, restricting creative expression.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">👥</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Static Physical Objects</h3>
                                        <p className="text-sm text-gray-200">
                                            Prior systems enable virtual content to interact with physical objects, but those physical objects aren't programmable or customizable by users.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🚧</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Pre-Defined Interactions</h3>
                                        <p className="text-sm text-gray-200">
                                            Existing technologies use static, pre-defined objects with fixed interactions, preventing children from creating their own dynamic AR-IoT environments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Background */}
                            <div className="mb-8">
                                <div className="space-y-6">
                                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                        Companies like Nintendo have already been pushing the boundaries of what AR can be and what it can do. Mario Kart Live: Home Circuit gives users the ability to drive a real Mario or Luigi Kart with a camera attached to it. The camera sends the video feed to the Nintendo Switch, where the AR content is rendered for the user to see. While playing, you can launch virtual shells, bananas, and other reminiscent Mario Kart items at other players to stop their karts and win the race.
                                    </p>
                                    
                                    <div className="my-6">
                                        <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 relative">
                                            <div className="relative w-full">
                                                {gifPlaying ? (
                                                    <img 
                                                        src="/assets/images/microkarts/mario-kart-live.gif" 
                                                        alt="Mario Kart Live: Home Circuit gameplay showing AR content overlaid on real kart video feed" 
                                                        className="w-full h-auto rounded-lg mb-2"
                                                        loading="lazy"
                                                        decoding="async"
                                                        style={{ width: '100%', height: 'auto', maxWidth: '100%', display: 'block' }}
                                                        onError={(e) => {
                                                            console.error(`Failed to load image: /assets/images/microkarts/mario-kart-live.gif`);
                                                            e.target.style.display = 'none';
                                                        }}
                                                        onLoad={(e) => {
                                                            e.target.style.display = 'block';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full aspect-video bg-black/50 rounded-lg flex items-center justify-center mb-2">
                                                        <div className="text-center">
                                                            <div className="text-4xl sm:text-6xl mb-4">⏸️</div>
                                                            <p className="text-gray-300 text-sm">Animation paused</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => setGifPlaying(!gifPlaying)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            setGifPlaying(!gifPlaying);
                                                        }
                                                    }}
                                                    className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
                                                    aria-label={gifPlaying ? "Pause animation" : "Play animation"}
                                                >
                                                    {gifPlaying ? (
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                        To understand the affordances and limitations of this technology, I acquired two Mario kits to study and play with, which helped me motivate our design and further understand the user experiences. After using this system, I devised a plan to enhance creative play by incorporating our electronics, computer programming with IoT Maker, and enabling users to design AR-IoT interactions.
                                    </p>
                                </div>
                            </div>

                            {/* The Intersection */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The Solution Opportunity</h3>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                        While AR and IoT technologies each offer tremendous opportunities individually, there exists a critical gap at their intersection. This gap prevents children from actively creating, programming, and customizing physical devices for dynamic AR-IoT interactions. MicrokARts fills this gap by empowering children to create dynamic environments where AR content can trigger reactions from wirelessly connected programmable devices in the real world.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔴</div>
                                            <p className="text-sm text-gray-200">Augmented Reality</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🟡</div>
                                            <p className="text-sm text-gray-200">Programmable IoT</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔵</div>
                                            <p className="text-sm text-gray-200">Creative Play</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">=</div>
                                        <div className="glass rounded-xl p-4 border-green-500/30 border bg-green-500/10 text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">✨</div>
                                            <p className="text-sm font-semibold text-green-300">MicrokARts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Our Contributions */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Contributions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">End-to-End Workflow</h4>
                                        <p className="text-sm text-gray-200">
                                            The MicrokARts system's complete workflow features plug-and-play electronics, a block-based programming application with live simulation tool, and a multi-user AR-IoT environment to control physical devices with AR-IoT interactions.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Block Programming Solution</h4>
                                        <p className="text-sm text-gray-200">
                                            A solution for children to create dynamic AR-IoT environments through block programming, enabling them to customize device behavior and interactions without extensive programming knowledge.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Design Recommendations</h4>
                                        <p className="text-sm text-gray-200">
                                            A series of recommendations based on study results to inform further work on interactive and creative play through physical computing and Augmented Reality.
                                        </p>
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
                            
                            
                            {/* Design Process Timeline */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Design Process</h3>
                                <div className="relative">
                                    {/* Timeline Container with Line and Dots */}
                                    <div className="relative mb-12 hidden md:block">
                                        <div className="relative flex justify-between items-center">
                                            <div className={`relative z-10 transition-all duration-300 ${
                                                expandedCard === 0 ? 'scale-150' : 'scale-100'
                                            }`}>
                                                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                                            </div>
                                            <div className="absolute top-1/2 left-[0.75rem] right-[0.75rem] h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 via-blue-500 to-cyan-500 -translate-y-1/2 z-0"></div>
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
                                            <div className={`relative z-10 transition-all duration-300 ${
                                                expandedCard === 3 ? 'scale-150' : 'scale-100'
                                            }`}>
                                                <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-black"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline Cards */}
                                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                        {[
                                            {
                                                title: "Research & Discovery",
                                                description: "I considered challenges faced by children when using physical computing devices at a novice level (e.g. syntax and incorrect wiring). I reviewed prior research and commercial products like Mario Kart Live to understand affordances and limitations, which helped motivate our design and further understand user experiences.",
                                                icon: "🔍",
                                                color: "blue"
                                            },
                                            {
                                                title: "Hardware Design",
                                                description: "I designed and tested the kARtridge PCB along with the initial version of IoT Maker. This was done intentionally to test the physical subsystems before testing the digital ones. I developed plug-and-play electronics with a chassis, DC motors, claw attachment with servo motor, ball castor wheel, and phone mount for AR-enabled devices.",
                                                icon: "🔧",
                                                color: "cyan"
                                            },
                                            {
                                                title: "Software Development",
                                                description: "I developed IoT Maker, a block-based programming web application built on Google's Blockly that enables users to create code by dragging and connecting blocks. The system includes a live simulator tool to allow users to see how their Kart will function in real-time, and generates Arduino code that users can view and learn from.",
                                                icon: "💻",
                                                color: "blue"
                                            },
                                            {
                                                title: "User Evaluation",
                                                description: "I conducted pilot studies with 4 expert users and 15 youth users (age 11-18) to test IoT Maker and validate the system. Findings were used to improve the final system design and inform the design of our final user study with 22 children (ages 9-15) to understand how children use the system for creative play.",
                                                icon: "📊",
                                                color: "cyan"
                                            }
                                        ].map((phase, index) => (
                                            <div key={index} className="relative flex-1 max-w-xs w-full">
                                                <button
                                                    onClick={() => handleCardClick(index)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            handleCardClick(index);
                                                        }
                                                    }}
                                                    className={`w-full glass rounded-2xl border-white/10 border transition-all duration-300 cursor-pointer relative overflow-hidden group bg-black/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                        expandedCard === index 
                                                            ? (phase.color === 'blue' ? 'p-6 border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105' : 'p-6 border-cyan-500/50 shadow-lg shadow-cyan-500/20 scale-105')
                                                            : 'p-5 hover:border-blue-500/30 hover:scale-105'
                                                    }`}
                                                    aria-expanded={expandedCard === index}
                                                    aria-label={`Expand ${phase.title} card`}
                                                >
                                                    <div className={`absolute inset-0 ${
                                                        phase.color === 'blue' ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5' : 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5'
                                                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                        expandedCard === index ? 'opacity-100' : ''
                                                    }`}></div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-center gap-3 mb-2">
                                                            <span className="text-2xl">{phase.icon}</span>
                                                            <h4 className="text-lg font-bold text-white">{phase.title}</h4>
                                                        </div>
                                                        <div className={`overflow-hidden transition-all duration-300 ${
                                                            expandedCard === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                        }`}>
                                                            <p className="text-sm text-gray-200 leading-relaxed">
                                                                {phase.description}
                                                            </p>
                                                        </div>
                                                        {expandedCard !== index && (
                                                            <div className="flex items-center justify-center mt-2">
                                                                <span className="text-xs text-blue-400 opacity-70 animate-pulse">Click to expand</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pilot Studies Section */}
                            <div className="mb-12 mt-12">
                                <h3 className="text-xl font-bold mb-8 text-center text-blue-400">Pilot Studies</h3>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                                    I tested IoT Maker with 4 expert users for feedback and validation of the system, and 15 youth users to learn how youth might benefit from the system. Given our curated design goals, I set out to develop an initial prototype of the MicrokARts system without the AR. I first designed and tested our kARtridge PCB along with the initial version of IoT Maker. This was done intentionally to test the physical subsystems before testing the digital ones. Our findings were used to improve our final system design for MicrokARts and to inform the design of our final user study.
                                </p>
                                
                                {/* Expert Pilot Study */}
                                <div className="glass rounded-xl p-6 border-blue-500/20 border mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl">👨‍🔬</div>
                                        <div className="text-blue-300 font-semibold text-lg">Expert Pilot Study</div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Participants:</strong> 4 graduate students (3 male, 1 female)</p>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Expertise:</strong> Building & Using Electro-Mechanical Devices, Electronics & Circuitry, or Programming Physical Computing Devices</p>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Experience:</strong> 3+ years of academic and/or professional experience</p>
                                            <p className="text-sm text-gray-300"><strong className="text-white">Duration:</strong> ~90 minutes per participant</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Objective:</strong> Gain validity of the system and methodology before testing with youth</p>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Method:</strong> Usage evaluation strategy with coding challenges, observations, Likert scale questionnaires, and open-ended interviews</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-3">Key Findings</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-3">System Effectiveness</p>
                                                <StatVisualization 
                                                    mean={4.75} 
                                                    stdDev={0.433} 
                                                    maxScale={5} 
                                                    label="Helps build electro-mechanical devices"
                                                />
                                                <StatVisualization 
                                                    mean={4.5} 
                                                    stdDev={0.500} 
                                                    maxScale={5} 
                                                    label="System met expectations"
                                                />
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-2">Design Feedback</p>
                                                <p className="text-gray-200 text-sm">
                                                    Experts suggested that complex functions with many variables and logic may be challenging for novices in the Blockly UI, but overall validated the system's approach.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Youth Pilot Study */}
                                <div className="glass rounded-xl p-6 border-green-500/20 border mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl">👥</div>
                                        <div className="text-green-300 font-semibold text-lg">Youth Pilot Study</div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Participants:</strong> 15 youth users (4 male, 11 female)</p>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Age Range:</strong> 11-18 years (mean age = 15.73 years)</p>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Format:</strong> 7 workshops (individual and small groups)</p>
                                            <p className="text-sm text-gray-300"><strong className="text-white">Duration:</strong> ~90 minutes per participant/group</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300 mb-2"><strong className="text-white">Objective:</strong> Test workflow and usability of IoT Maker by youth, assess which hardware components they use most, and validate scaffolding pseudo-code methodology</p>
                                            <p className="text-sm text-gray-300"><strong className="text-white">Method:</strong> Coding challenges with pseudo-code scaffolding, observations, Likert scale questionnaires, and interviews</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <h4 className="text-lg font-bold text-white mb-3">Key Findings</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <p className="text-sm text-green-300 font-semibold mb-3">Easy Electronics Connection</p>
                                                <StatVisualization 
                                                    mean={6.4} 
                                                    stdDev={0.712} 
                                                    maxScale={7} 
                                                    label="Easy to connect external electronics"
                                                />
                                                <StatVisualization 
                                                    mean={6.067} 
                                                    stdDev={0.772} 
                                                    maxScale={7} 
                                                    label="Happy no prior electronics knowledge required"
                                                />
                                            </div>
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-3">Pseudo-Code Effectiveness</p>
                                                <StatVisualization 
                                                    mean={6.2} 
                                                    stdDev={1.166} 
                                                    maxScale={7} 
                                                    label="Pseudo-code helped understand blocks"
                                                />
                                                <StatVisualization 
                                                    mean={6.33} 
                                                    stdDev={0.943} 
                                                    maxScale={7} 
                                                    label="Clear and easy to follow step-by-step"
                                                />
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-3">Live Simulator Value</p>
                                                <StatVisualization 
                                                    mean={6.7} 
                                                    stdDev={0.718} 
                                                    maxScale={7} 
                                                    label="Simulator helped visualize code execution"
                                                />
                                            </div>
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <p className="text-sm text-purple-300 font-semibold mb-3">Programming Ease</p>
                                                <StatVisualization 
                                                    mean={5.93} 
                                                    stdDev={0.929} 
                                                    maxScale={7} 
                                                    label="Programming devices with blocks was easy"
                                                />
                                                <StatVisualization 
                                                    mean={6.33} 
                                                    stdDev={0.869} 
                                                    maxScale={7} 
                                                    label="Would like to use IoT Maker for complex projects"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                            <p className="text-sm text-yellow-300 font-semibold mb-2">Key Insight</p>
                                            <p className="text-gray-200 text-sm italic">
                                                "IoT Maker is different from other programming software because the model on the screen helps visualize functions without needing to actually carry them out." - Erica (Female, 14)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pilot Study Outcomes */}
                                <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl">💡</div>
                                        <div className="text-purple-300 font-semibold text-lg">Pilot Study Outcomes</div>
                                    </div>
                                    <p className="text-gray-200 leading-relaxed mb-4">
                                        Overall, I found that IoT Maker and our electronics toolkit helped eliminate some unnecessary barriers to physical computing and for creating complex electro-mechanical devices. The pilot studies enlightened me of several key modifications for the next version of MicrokARts:
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">1. Unified AR-IoT Programming</p>
                                            <p className="text-gray-200 text-sm">
                                                Programming AR-IoT interactions should be as easy as programming devices. I propose using IoT Maker to author AR-IoT interactions directly, avoiding disjointed workflows from separate interfaces.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">2. Servo Motor Integration</p>
                                            <p className="text-gray-200 text-sm">
                                                To encourage servo motor use, I fabricated a "claw" attachment with the servo motor, making participants more likely to utilize it for their MicrokARts.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">3. Component Diversity</p>
                                            <p className="text-gray-200 text-sm">
                                                I replaced one coding challenge in the pseudo-code with different sensors and actuators to introduce users to more electronic components and encourage greater diversity in kart design.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Design Goals */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Design Goals</h3>
                                <p className="text-center text-gray-200 mb-6 max-w-2xl mx-auto">
                                    Based on the results of our pilot studies and analysis of existing systems, I developed the following design goals for MicrokARts:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🎯</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Open-Ended</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Enable children to explore options to customize their creations and iterate on them. MicrokARts offers customized electronics and AR-IoT interactions through block-programming and electronics toolkit.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🔌</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Low Floors, Wide Walls, High Ceilings</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Not difficult for children to use, supports a wide variety of projects, and robust enough to scaffold on top of basic features. Achieved through plug-and-play electronics, block programming, and live programming.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🤝</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Increased Engagement</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Effectively engage users through the design, build, and play phases. MicrokARts is hands-on and dynamic by utilizing barrier-reducing technologies to maintain user interest and creativity.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🎨</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Quick Iterations</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Offer a simplified way to create modular code that can be compiled and uploaded to the electronics board quickly and easily, reducing the steps from initial design to playing with the device.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* System Overview */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Overview</h3>
                                <p className="text-center text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                                    MicrokARts is an end-to-end system that enables children to create karts powered by Augmented Reality and connected via WiFi. The system offers plug-and-play electronics, block programming with live simulation, and web/mobile interfaces for seamless AR-IoT interactions.
                                </p>

                                {/* Hardware Section */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold mb-6 text-center text-blue-400">Hardware</h4>
                                    
                                    {/* kARtridge PCB Card */}
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border mb-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-5xl">🔌</div>
                                            <div>
                                                <h5 className="text-xl font-bold text-white">kARtridge PCB</h5>
                                                <p className="text-sm text-gray-400">Custom-designed plug-and-play circuit board</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                                                <div className="text-2xl font-bold text-blue-300 mb-1">5</div>
                                                <div className="text-xs text-gray-300">Output Ports</div>
                                            </div>
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
                                                <div className="text-2xl font-bold text-cyan-300 mb-1">2</div>
                                                <div className="text-xs text-gray-300">Input Ports</div>
                                            </div>
                                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                <div className="text-2xl font-bold text-green-300 mb-1">3</div>
                                                <div className="text-xs text-gray-300">I2C Ports</div>
                                            </div>
                                            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
                                                <div className="text-2xl font-bold text-purple-300 mb-1">3</div>
                                                <div className="text-xs text-gray-300">Power Sources</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm font-semibold text-blue-300 mb-1">Power System</div>
                                                <div className="text-xs text-gray-300">3.7V LiPo + 2x 9V Li-Ion batteries for varying loads</div>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm font-semibold text-cyan-300 mb-1">Design Philosophy</div>
                                                <div className="text-xs text-gray-300">Gestalt principles for intuitive component placement</div>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm font-semibold text-green-300 mb-1">Safety First</div>
                                                <div className="text-xs text-gray-300">Shock-resistant design for ages 9-15</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Electronics Toolkit Image */}
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 mb-6">
                                        <div className="bg-white rounded-lg p-4 mb-2">
                                            <img 
                                                src="/assets/images/microkarts/Electronics_Toolkit.PNG" 
                                                alt="MicrokARts Electronics Toolkit showing sensors, actuators, LEDs, kARtridge PCB, and claw attachment" 
                                                className="w-full h-auto rounded-lg"
                                                loading="lazy"
                                                decoding="async"
                                                style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                                onError={(e) => {
                                                    console.error(`Failed to load image: /assets/images/microkarts/Electronics_Toolkit.PNG`);
                                                    e.target.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    e.target.style.display = 'block';
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-300 italic text-center mt-2">
                                            Electronics Toolkit: sensors, actuators, LEDs, kARtridge PCB, and claw attachment for dynamic gameplay
                                        </p>
                                    </div>
                                </div>

                                {/* Software Implementation Section */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold mb-6 text-center text-blue-400">Software Components</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        {/* Desktop Interface Card */}
                                        <div className="glass rounded-xl p-6 border-blue-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-5xl mb-4 text-center">💻</div>
                                            <h5 className="text-lg font-bold text-white mb-3 text-center">Desktop Interface</h5>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    <span>QR code sync with mobile</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    <span>Live video feed from kart</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    <span>Keyboard controls</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    <span>AR dart shooting</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Mobile Interface Card */}
                                        <div className="glass rounded-xl p-6 border-cyan-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-5xl mb-4 text-center">📱</div>
                                            <h5 className="text-lg font-bold text-white mb-3 text-center">Mobile Interface</h5>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cyan-400">•</span>
                                                    <span>Unity ARFoundation framework</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cyan-400">•</span>
                                                    <span>Cloud Anchors for sync</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cyan-400">•</span>
                                                    <span>Multiplayer networking</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cyan-400">•</span>
                                                    <span>Mixed Reality "eyes"</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Debug Mode Card */}
                                        <div className="glass rounded-xl p-6 border-green-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-5xl mb-4 text-center">🐛</div>
                                            <h5 className="text-lg font-bold text-white mb-3 text-center">Debug Mode</h5>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span>Firebase function access</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span>Test before play</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span>Multiple UI controls</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span>Problem-solving skills</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Debug App Image */}
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30 mb-6">
                                        <div className="bg-white rounded-lg p-4 mb-2">
                                            <img 
                                                src="/assets/images/microkarts/Debug_app.png" 
                                                alt="MicrokARts debug tool showing Firebase database access and function testing interface" 
                                                className="w-full h-auto rounded-lg"
                                                loading="lazy"
                                                decoding="async"
                                                style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                                onError={(e) => {
                                                    console.error(`Failed to load image: /assets/images/microkarts/Debug_app.png`);
                                                    e.target.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    e.target.style.display = 'block';
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-300 italic text-center mt-2">
                                            Debug mode: Test custom functions via Firebase before docking the phone
                                        </p>
                                    </div>
                                </div>

                                {/* AR-IoT Interactions */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold mb-6 text-center text-blue-400">AR-IoT Interactions</h4>
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-5xl">🎯</div>
                                            <div className="flex-1">
                                                <h5 className="text-xl font-bold text-white mb-2">Virtual Dart System</h5>
                                                <p className="text-sm text-gray-400">AR-centric code blocks enable intuitive AR-IoT interactions</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <div className="text-2xl mb-2">📝</div>
                                                <div className="text-sm font-semibold text-purple-300 mb-1">Program in IoT Maker</div>
                                                <div className="text-xs text-gray-300">Create AR interaction functions with visual blocks</div>
                                            </div>
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <div className="text-2xl mb-2">🎮</div>
                                                <div className="text-sm font-semibold text-purple-300 mb-1">Shoot & Hit</div>
                                                <div className="text-xs text-gray-300">Virtual darts sync via Cloud Anchors across devices</div>
                                            </div>
                                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                <div className="text-2xl mb-2">⚡</div>
                                                <div className="text-sm font-semibold text-purple-300 mb-1">Trigger Events</div>
                                                <div className="text-xs text-gray-300">Kart stops and executes custom programmed functions</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* System Workflow */}
                                <div>
                                    <h4 className="text-xl font-bold mb-6 text-center text-blue-400">System Workflow</h4>
                                    
                                    {/* Workflow Steps */}
                                    <div className="space-y-4 mb-6">
                                        <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">1</div>
                                                <div className="flex-1">
                                                    <h5 className="text-lg font-bold text-white mb-2">Design & Program</h5>
                                                    <p className="text-sm text-gray-300 mb-3">Use IoT Maker to drag-and-drop blocks, test with live simulator, then compile and upload via OTA to kARtridge</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Block Programming</span>
                                                        <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">Live Simulator</span>
                                                        <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">OTA Upload</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-xl font-bold text-white">2</div>
                                                <div className="flex-1">
                                                    <h5 className="text-lg font-bold text-white mb-2">Connect & Sync</h5>
                                                    <p className="text-sm text-gray-300 mb-3">Turn on kARtridge, open mobile app and web interface, scan QR code, mount phone to kart</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">QR Code Sync</span>
                                                        <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Cloud Anchors</span>
                                                        <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Multiplayer</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white">3</div>
                                                <div className="flex-1">
                                                    <h5 className="text-lg font-bold text-white mb-2">Play & Interact</h5>
                                                    <p className="text-sm text-gray-300 mb-3">Control kart with keyboard, shoot AR darts, trigger custom functions when hit</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">Keyboard Control</span>
                                                        <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">AR Darts</span>
                                                        <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">Custom Events</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Architecture Diagram */}
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <div className="bg-white rounded-lg p-4 mb-2">
                                            <img 
                                                src="/assets/images/microkarts/System_Chart_V2.2.PNG" 
                                                alt="MicrokARts system architecture diagram showing Firebase, remote compiler, OTA updates, and QR code connection flow" 
                                                className="w-full h-auto rounded-lg"
                                                loading="lazy"
                                                decoding="async"
                                                style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                                onError={(e) => {
                                                    console.error(`Failed to load image: /assets/images/microkarts/System_Chart_V2.2.PNG`);
                                                    e.target.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    e.target.style.display = 'block';
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-300 italic text-center mt-2">
                                            System architecture: (a) Firebase code storage, (b) Remote compilation & OTA upload, (c) Device registration, (d) QR code connection
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
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Process and Solution"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Process and Solution
                        </h2>

                        {/* User Study Overview */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-blue-400">User Study with Children</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                                I evaluated MicrokARts in seven workshops with 22 total participants to assess how well the system enables children to create collaborative AR-IoT experiences. Driven by Constructionism learning theory, the study explored children's interactions with physical computing and AR-IoT systems.
                            </p>

                            {/* Participants Stats */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold mb-4 text-center text-cyan-400">Participants</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="glass rounded-xl p-4 border-blue-500/20 border text-center">
                                        <div className="text-3xl font-bold text-blue-300 mb-1">22</div>
                                        <div className="text-xs text-gray-300">Total Participants</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-cyan-500/20 border text-center">
                                        <div className="text-3xl font-bold text-cyan-300 mb-1">7</div>
                                        <div className="text-xs text-gray-300">Workshops</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-green-500/20 border text-center">
                                        <div className="text-3xl font-bold text-green-300 mb-1">9-15</div>
                                        <div className="text-xs text-gray-300">Age Range</div>
                                    </div>
                                    <div className="glass rounded-xl p-4 border-purple-500/20 border text-center">
                                        <div className="text-3xl font-bold text-purple-300 mb-1">2hr</div>
                                        <div className="text-xs text-gray-300">Per Workshop</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md mx-auto">
                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <div className="text-sm font-semibold text-blue-300 mb-2">Gender Distribution</div>
                                        <div className="space-y-1 text-xs text-gray-300">
                                            <div className="flex justify-between">
                                                <span>Male:</span>
                                                <span className="text-blue-300 font-semibold">6</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Female:</span>
                                                <span className="text-blue-300 font-semibold">13</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Prefer not to answer:</span>
                                                <span className="text-blue-300 font-semibold">3</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Workshop Setup */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold mb-4 text-center text-cyan-400">Workshop Setup</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🏫</div>
                                            <div>
                                                <h5 className="text-lg font-bold text-white">Environment</h5>
                                                <p className="text-sm text-gray-400">Large open room with tables</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>Groups of 2-3 participants per table</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>Maximum 5 students per time slot</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>Social distancing & mask protocols</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🛠️</div>
                                            <div>
                                                <h5 className="text-lg font-bold text-white">Equipment</h5>
                                                <p className="text-sm text-gray-400">Per participant setup</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>Computer with web interface</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>AR-capable smartphone</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>Custom MicrokARt with kARtridge PCB</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>All surfaces sanitized before/after</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Methodology Timeline */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold mb-6 text-center text-cyan-400">2-Hour Workshop Flow</h4>
                                <div className="space-y-4">
                                    {/* Step 1 */}
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-white">1</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">Pre-Workshop Survey</h5>
                                                <p className="text-sm text-gray-300 mb-3">Demographic information and experience levels in AR, Electronics & Circuitry, Programming Physical Computing Devices, and Designing Electro-Mechanical Devices</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-lg font-bold text-white">2</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">Tutorial Exercise (~10 min)</h5>
                                                <p className="text-sm text-gray-300 mb-3">Participants learn to navigate, activate functions, change speed, and shoot AR darts</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">QR Code Sync</span>
                                                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">Keyboard Controls</span>
                                                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">AR Darts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="glass rounded-xl p-6 border-green-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-lg font-bold text-white">3</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">IoT Maker Tutorial</h5>
                                                <p className="text-sm text-gray-300 mb-3">Learn to drag-and-drop blocks, create functions, view generated code, and use the simulator</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-lg font-bold text-white">4</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">Four Coding Challenges</h5>
                                                <p className="text-sm text-gray-300 mb-4">
                                                    Participants completed four coding challenges adapted from the pilot study. These challenges progressively introduced key concepts: basic block programming, sensor integration, debugging tools (Laboratory Mode and "Test My Code" function), and AR-IoT interactions using the AR Dart block. Each challenge was designed with pseudo-code scaffolding to help participants understand the step-by-step process of building their programs.
                                                </p>
                                                <div className="mb-4">
                                                    <p className="text-sm text-gray-300 mb-3">
                                                        The coding challenges guided participants through:
                                                    </p>
                                                    <ul className="space-y-2 text-sm text-gray-300 mb-4">
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-purple-400">•</span>
                                                            <span>Creating functions with drag-and-drop blocks</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-purple-400">•</span>
                                                            <span>Connecting sensors and actuators to the kARtridge PCB</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-purple-400">•</span>
                                                            <span>Using debugging tools to test code before uploading</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-purple-400">•</span>
                                                            <span>Programming AR-IoT interactions with virtual darts</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a
                                                    href="/assets/papers/pseudocode.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    View Coding Challenges Pseudocode
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg font-bold text-white">5</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">Final Activity: Block Collection Game</h5>
                                                <p className="text-sm text-gray-300 mb-3">Participants program claw functions and AR dart interactions, then play a collaborative game collecting blocks while using AR darts to stop opponents</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 6 */}
                                    <div className="glass rounded-xl p-6 border-red-500/20 border">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-lg font-bold text-white">6</div>
                                            <div className="flex-1">
                                                <h5 className="text-lg font-bold text-white mb-2">Post-Workshop Interviews</h5>
                                                <p className="text-sm text-gray-300 mb-3">Semi-structured interviews about impressions, challenges, and learning outcomes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Collection & Analysis */}
                            <div>
                                <h4 className="text-lg font-bold mb-4 text-center text-cyan-400">Data Collection & Analysis</h4>
                                
                                {/* Summary */}
                                <div className="mb-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                                    <p className="text-sm text-gray-200 leading-relaxed">
                                        I collected comprehensive qualitative and quantitative data through multiple methods. All 22 interviews were recorded and fully transcribed, with group interviews conducted unless participants requested individual sessions. Observational field notes were taken by researchers using structured observation forms. The data was analyzed using a deductive thematic coding approach based on grounded theory, with codes developed through virtual collaboration sessions. Affinity diagrams were created using Miro boards to consolidate and visualize observational and interview data, followed by joint data interpretation sessions to extract common themes aligned with our design goals.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">📊</div>
                                            <div>
                                                <h5 className="text-lg font-bold text-white">Data Sources</h5>
                                                <p className="text-sm text-gray-400">Multiple collection methods</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>22 fully transcribed interviews</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>Observational field notes</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>Pre-study surveys</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-4xl">🔍</div>
                                            <div>
                                                <h5 className="text-lg font-bold text-white">Analysis Method</h5>
                                                <p className="text-sm text-gray-400">Deductive thematic coding</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>Affinity diagrams (Miro board)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>Grounded theory approach</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-cyan-400">•</span>
                                                <span>Joint interpretation sessions</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Coding Themes as Individual Cards */}
                                <div>
                                    <h5 className="text-lg font-bold mb-4 text-center text-purple-400">Coding Themes</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-5 border-blue-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-3xl mb-3 text-center">🔍</div>
                                            <h6 className="text-base font-bold text-white mb-2 text-center">1. Exploratory/Inquisitive/Curious</h6>
                                            <p className="text-xs text-gray-300 text-center">
                                                Participants demonstrated curiosity and exploration when engaging with MicrokARts, asking questions and experimenting with different features and capabilities.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-cyan-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-3xl mb-3 text-center">🔗</div>
                                            <h6 className="text-base font-bold text-white mb-2 text-center">2. Making Connections to Prior Experiences</h6>
                                            <p className="text-xs text-gray-300 text-center">
                                                Children connected their MicrokARts experiences to prior knowledge, observations, and real-world experiences, building on existing understanding.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-green-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-3xl mb-3 text-center">🎨</div>
                                            <h6 className="text-base font-bold text-white mb-2 text-center">3. Fosters Creativity</h6>
                                            <p className="text-xs text-gray-300 text-center">
                                                The open-ended nature of MicrokARts enabled participants to express creativity in designing and programming their karts and AR-IoT interactions.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all">
                                            <div className="text-3xl mb-3 text-center">🧩</div>
                                            <h6 className="text-base font-bold text-white mb-2 text-center">4. Develops Problem Solving Skills</h6>
                                            <p className="text-xs text-gray-300 text-center">
                                                Participants engaged in problem-solving activities when debugging code, troubleshooting hardware connections, and designing solutions for coding challenges.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-orange-500/20 border hover:-translate-y-1 transition-all md:col-span-2 lg:col-span-1">
                                            <div className="text-3xl mb-3 text-center">💭</div>
                                            <h6 className="text-base font-bold text-white mb-2 text-center">5. Participants' Interpretation of Their Own Learning</h6>
                                            <p className="text-xs text-gray-300 text-center">
                                                Children reflected on and articulated their own learning experiences, describing what they learned and how they understood the system and programming concepts.
                                            </p>
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

                        {/* Overview */}
                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed text-center max-w-3xl mx-auto">
                                Overall, participants had positive impressions of MicrokARts after completing the study. I collected both quantitative and qualitative data through surveys, observations, and interviews, revealing key insights about how children engage with AR-IoT systems.
                            </p>
                        </div>

                        {/* Detailed Findings by Theme */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-blue-400">Key Findings</h3>
                            
                            {/* Exploratory/Inquisitive/Curious */}
                            <div className="glass rounded-xl p-6 border-blue-500/20 border mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">🔍</div>
                                    <h4 className="text-xl font-bold text-white">Exploratory/Inquisitive/Curious</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">
                                    Participants displayed curiosity by asking questions and exploring system features beyond the structured coding challenges. Most asked clarifying questions about how the system worked, while some probed deeper into the underlying concepts.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <p className="text-xs text-blue-300 font-semibold mb-2">Systemic Questions (SQ)</p>
                                        <p className="text-xs text-gray-300">"Where is the function block located?" - Expected when learning new systems</p>
                                    </div>
                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                        <p className="text-xs text-cyan-300 font-semibold mb-2">Conceptual Questions (CQ)</p>
                                        <p className="text-xs text-gray-300">"Why does the light not turn off?" - Deeper understanding of concepts</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <QuoteCard 
                                        quote="I wanted to do what [he] is doing when [I] go to College because this is so cool."
                                        name="Molly"
                                        age={12}
                                        gender="Female"
                                    />
                                </div>
                            </div>

                            {/* Making Connections */}
                            <div className="glass rounded-xl p-6 border-cyan-500/20 border mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">🔗</div>
                                    <h4 className="text-xl font-bold text-white">Making Connections to Prior Experiences</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">
                                    Participants connected MicrokARts to prior experiences, with 20 participants indicating live programming experience. Many found MicrokARts easier and more engaging than school-based coding activities.
                                </p>
                                <QuoteCard 
                                    quote="Well, I like doing the code and the robots because at school when we do coding...it's kind of like games, but differently, and I kind of don't like the one at school but then when we did [MicrokARts], it was amazing and I liked it a lot."
                                    name="Blaine"
                                    age={9}
                                    gender="Male"
                                />
                            </div>

                            {/* Creativity */}
                            <div className="glass rounded-xl p-6 border-green-500/20 border mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">🎨</div>
                                    <h4 className="text-xl font-bold text-white">Creativity</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">
                                    While most participants used simple programs (buzzer + 1 LED), some demonstrated exceptional creativity. Three participants used more than two devices, with one creating a complex song and light combination using a for loop.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <p className="text-xs text-green-300 font-semibold mb-2">Simple Programs</p>
                                        <p className="text-xs text-gray-300">N = 19 used buzzer + 1 additional device</p>
                                    </div>
                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <p className="text-xs text-green-300 font-semibold mb-2">Complex Programs</p>
                                        <p className="text-xs text-gray-300">N = 3 used multiple devices creatively</p>
                                    </div>
                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <p className="text-xs text-green-300 font-semibold mb-2">Notable Example</p>
                                        <p className="text-xs text-gray-300">Matt (9) created song + light combo with for loop</p>
                                    </div>
                                </div>
                            </div>

                            {/* Problem Solving */}
                            <div className="glass rounded-xl p-6 border-purple-500/20 border mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">🧩</div>
                                    <h4 className="text-xl font-bold text-white">Problem Solving</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">
                                    Sixteen participants completed all coding challenges with minimal help (3 or fewer questions). Some participants needed more support, often due to limited prior experience or not fully reading instructions.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <QuoteCard 
                                        quote="The circuits didn't go together. And then you had to find out how they went together."
                                        name="Brittany"
                                        age={13}
                                        gender="Female"
                                    />
                                    <QuoteCard 
                                        quote="I like that it actually made me have to think, because usually I come by things easily. But with this, that wasn't the case... not to where it was frustrating necessarily."
                                        name="Alaina"
                                        age={12}
                                        gender="No Response"
                                    />
                                </div>
                            </div>

                            {/* Participants' Interpretation of Learning */}
                            <div className="glass rounded-xl p-6 border-orange-500/20 border mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">💭</div>
                                    <h4 className="text-xl font-bold text-white">Participants' Interpretation of Their Own Learning</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">
                                    Participants improved at operating MicrokARts and programming throughout the workshops, grasping foundational concepts like functions. However, some participants (N = 4) reported not knowing what they learned, likely due to limited iteration time and instruction focus on system use rather than concept names.
                                </p>
                            </div>
                        </div>

                        {/* Emerging Themes */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-purple-400">Emerging Themes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Interest-Driven Design and Making</h4>
                                    <p className="text-sm text-gray-300 mb-3">
                                        Every child enjoyed using electronics that invoked their senses (LEDs, buzzer). Half of participants (N = 11) showed enthusiasm five or more times. Fifteen of 19 participants with multiple electronics used the claw, showing interest in customization beyond basic functionality.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3">✨</div>
                                    <h4 className="text-lg font-bold text-white mb-3">AR-IoT Interactions Generate Engagement</h4>
                                    <p className="text-sm text-gray-300 mb-3">
                                        The majority (N = 19) cited AR-IoT interactions as what they liked most about the system. All students were excited about programming and using darts at least once, with nine participants showing this enthusiasm five or more times.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-green-500/20 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3">🤝</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Collaborations Among Children</h4>
                                    <p className="text-sm text-gray-300 mb-3">
                                        During the final open-ended challenge, participants began garnering ideas from one another and helping with issues. Some groups competed to collect blocks, while others collaborated, with shared AR-IoT interactions motivating engagement.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-purple-500/20 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3">🔄</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Enhanced Play with MicrokARts</h4>
                                    <p className="text-sm text-gray-300 mb-3">
                                        Participants performed several iterations of their final programs before playing. Group 5 wanted to improve their programs by adding more devices with 15 minutes left, and each was able to iterate, upload, test, and play again before the end.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-orange-400">Recommendations for Future Systems</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                    <div className="text-3xl mb-3">📚</div>
                                    <h4 className="text-lg font-bold text-white mb-2">More Exposure, Less Disclosure</h4>
                                    <p className="text-sm text-gray-300">
                                        Reduce user development time by minimizing prior knowledge required. Expose students to engineering concepts without overwhelming them with unnecessary details.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                    <div className="text-3xl mb-3">👐</div>
                                    <h4 className="text-lg font-bold text-white mb-2">All Hands On Deck</h4>
                                    <p className="text-sm text-gray-300">
                                        Hands-on platforms with shared AR experiences and physical prototyping can pique curiosity, foster creativity, and enable learning through creative play.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                    <div className="text-3xl mb-3">🔄</div>
                                    <h4 className="text-lg font-bold text-white mb-2">Interact & Iterate</h4>
                                    <p className="text-sm text-gray-300">
                                        Use block-programming approaches to author AR-IoT interactions, centralizing IoT functionality while encouraging more iterations.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                    <div className="text-3xl mb-3">🔌</div>
                                    <h4 className="text-lg font-bold text-white mb-2">Connectors Are Key</h4>
                                    <p className="text-sm text-gray-300">
                                        Support simple 3D printed connectors to attach electronics to IoT devices, moving beyond low-fidelity bonding elements like duct tape.
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

                        {/* Summary */}
                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Summary</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                                MicrokARts is an AR-IoT platform that enables co-located play for children to design, program, and play with AR-enabled karts together. The system was designed with customizability in mind to encourage collaborative play through AR-IoT interactions. My study with 22 children (ages 9-15) showed that MicrokARts can be used by children with experience in the field, as well as those without any experience, to create dynamic AR-IoT environments.
                            </p>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                MicrokARts contributes to continued efforts to support children in building foundational understandings of interactive and creative play through physical computing and Augmented Reality. The emerging themes and recommendations from this work will assist future developers in creating iterative and creative solutions for collaborative AR-IoT platforms.
                            </p>
                        </div>

                        {/* Limitations & Future Work */}
                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Limitations & Future Work</h3>
                            
                            <div className="space-y-6">
                                {/* Phones for Cameras */}
                                <div className="p-5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-3xl">📱</div>
                                        <h4 className="text-lg font-bold text-white">Phones for Cameras</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        The need for AR-capable smartphones presents a cost barrier. From a usability standpoint, phones can be heavy, take up space, and require extra setup effort. Future work will explore standalone cameras with AR processing power, similar to Mario Kart Live's built-in camera system.
                                    </p>
                                </div>

                                {/* Latency & Internet Bandwidth */}
                                <div className="p-5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-3xl">🌐</div>
                                        <h4 className="text-lg font-bold text-white">Latency & Internet Bandwidth</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        Video streaming requires reliable internet, which is not standard for all households. Having more than three video streams caused significant lag, presenting scalability challenges. Future work will explore 5G cellular towers, Starlink satellite internet, and alternative video streaming methods.
                                    </p>
                                </div>

                                {/* Additional Use Cases */}
                                <div className="p-5 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-3xl">🎨</div>
                                        <h4 className="text-lg font-bold text-white">Additional Use Cases</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        While this study used a pre-designed chassis with low-fidelity fasteners, future research will include more chassis designs and a connection system with 3D printed connectors. I aim to make MicrokARts open-source, enabling communities with maker spaces to fabricate new designs and test with children both with and without design experience.
                                    </p>
                                </div>

                                {/* Co-location & Remote Capability */}
                                <div className="p-5 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-3xl">🌍</div>
                                        <h4 className="text-lg font-bold text-white">Co-location & Remote Capability</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        Currently, karts must be co-located for AR interactions, though participants can control karts remotely via desktop interface. Future work could explore persistent kARtridges in set spaces that users remotely connect to, similar to cloud virtual machines, increasing accessibility while maintaining the collaborative experience.
                                    </p>
                                </div>

                                {/* Broader Educational Impacts */}
                                <div className="p-5 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-3xl">🎓</div>
                                        <h4 className="text-lg font-bold text-white">Broader Educational Impacts</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        Future studies can be curated with local computer science educators to establish learning goals. MicrokARts has potential as a learning environment that helps children cultivate creative solutions to computational problems through its open-ended, iterative nature combining physical and digital components.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Acknowledgements</h3>
                            
                            <div className="space-y-6">
                                {/* Research Team */}
                                <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl">👨‍🔬</div>
                                        <div className="text-blue-300 font-semibold text-lg">Research Team</div>
                                    </div>
                                    <p className="text-gray-200 mb-4">
                                        I am grateful to my collaborators for their invaluable contributions to the design, development, and evaluation of MicrokARts:
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
                                            <p className="text-white font-semibold">Joey Huang</p>
                                            <p className="text-gray-300 text-sm">The Creativity Labs, UC Irvine</p>
                                        </div>
                                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-white font-semibold">Kiran Payne</p>
                                            <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
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
                                        Special thanks to all 22 participants (ages 9-15) who contributed to our seven workshops. Their feedback, creativity, and engagement were essential to this research.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <p className="text-2xl font-bold text-green-300">22</p>
                                            <p className="text-xs text-gray-300">Participants</p>
                                        </div>
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <p className="text-2xl font-bold text-green-300">7</p>
                                            <p className="text-xs text-gray-300">Workshops</p>
                                        </div>
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <p className="text-2xl font-bold text-green-300">9-15</p>
                                            <p className="text-xs text-gray-300">Age Range</p>
                                        </div>
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <p className="text-2xl font-bold text-green-300">2hr</p>
                                            <p className="text-xs text-gray-300">Per Session</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Institutions & Funding */}
                                <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl">🏛️</div>
                                        <div className="text-purple-300 font-semibold text-lg">Institutions & Funding</div>
                                    </div>
                                    <p className="text-gray-200 mb-4">
                                        This work was conducted at the following institutions. I am grateful for the support and resources provided:
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-white font-semibold mb-1">Purdue University</p>
                                            <p className="text-gray-300 text-sm">C Design Lab</p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-white font-semibold mb-1">UC Irvine</p>
                                            <p className="text-gray-300 text-sm">The Creativity Labs</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-2xl">💰</div>
                                            <p className="text-yellow-300 font-semibold">Funding</p>
                                        </div>
                                        <p className="text-gray-200 text-sm">
                                            This research was supported by funding from Purdue University and UC Irvine. I am grateful for the resources and support that made this work possible.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border bg-gradient-to-r from-blue-500/10 to-cyan-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-4xl">✨</div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-blue-400">Summary</h3>
                                </div>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    MicrokARts represents a significant step forward in AR-IoT platforms for children, demonstrating how physical computing and augmented reality can be combined to create engaging, educational experiences. Through careful design grounded in Constructionism learning theory, the system successfully enabled children with varying levels of experience to create collaborative AR-IoT environments. The insights from this work, including emerging themes and design recommendations, provide valuable guidance for future developers working in this space. As we continue to explore the potential of AR-IoT systems for education, MicrokARts serves as a foundation for understanding how to lower barriers to entry while maintaining opportunities for creative expression and collaborative learning.
                                </p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

export default MicrokARts;
