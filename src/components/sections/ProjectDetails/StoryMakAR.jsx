import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../RevealOnScroll";

// Image Carousel Component for Pilot Study
const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        { id: 1, placeholder: "[IMAGE: Pilot Study - User Interaction 1]" },
        { id: 2, placeholder: "[IMAGE: Pilot Study - User Interaction 2]" },
        { id: 3, placeholder: "[IMAGE: Pilot Study - Device Assembly]" },
        { id: 4, placeholder: "[IMAGE: Pilot Study - Story Creation]" },
        { id: 5, placeholder: "[IMAGE: Pilot Study - Final Prototype]" }
    ];

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative">
            <div className="glass rounded-xl p-8 border-white/10 border overflow-hidden">
                <div className="relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                    <div className="text-center p-8">
                        <p className="text-orange-300 font-semibold text-lg">
                            {images[currentIndex].placeholder}
                        </p>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 text-white p-3 rounded-full transition-all border border-blue-500/30 z-10"
                        aria-label="Previous image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 text-white p-3 rounded-full transition-all border border-blue-500/30 z-10"
                        aria-label="Next image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? "bg-blue-500 w-8"
                                    : "bg-gray-600 hover:bg-gray-500"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
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

// Platform Carousel Component
const PlatformCarousel = () => {
    const platforms = [
        {
            name: "FaTe2",
            description: "Educational platform that combines storytelling with technology to enhance learning experiences for children.",
            link: "https://dl.acm.org/doi/10.1145/2858036.2858110",
            linkType: "paper"
        },
        {
            name: "StoryRooms",
            description: "Interactive storytelling platform that creates immersive narrative experiences through spatial interactions.",
            link: "https://dl.acm.org/doi/10.1145/3025453.3025653",
            linkType: "paper"
        },
        {
            name: "StoryMat",
            description: "Interactive platform that uses physical mats and sensors to create engaging storytelling experiences.",
            link: "https://dl.acm.org/doi/10.1145/302979.303040",
            linkType: "paper"
        },
        {
            name: "StoryBox",
            description: "Tangible storytelling platform that uses physical objects and boxes to create narrative interactions.",
            link: "https://dl.acm.org/doi/10.1145/1518701.1518710",
            linkType: "paper"
        },
        {
            name: "TinkRBook",
            description: "Collaborative storytelling platform that enables multiple users to create and share stories together.",
            link: "https://dl.acm.org/doi/10.1145/2858036.2858110",
            linkType: "paper"
        },
        {
            name: "Goldiblox",
            description: "Creative robotics kit designed to inspire storytelling through building and programming mechanical characters.",
            link: "https://www.goldieblox.com",
            linkType: "website"
        },
        {
            name: "Handimate",
            description: "Robotics storytelling kit that combines hand-crafted characters with programmable movements for narrative creation.",
            link: "https://dl.acm.org/doi/10.1145/3025453.3025653",
            linkType: "paper"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPlatform = () => {
        setCurrentIndex((prev) => (prev + 1) % platforms.length);
    };

    const prevPlatform = () => {
        setCurrentIndex((prev) => (prev - 1 + platforms.length) % platforms.length);
    };

    const goToPlatform = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="glass rounded-xl p-8 border-white/10 border overflow-hidden">
                <div className="relative">
                    {/* Platform Card */}
                    <div className="text-center min-h-[200px] flex flex-col justify-center">
                        <h4 className="text-2xl font-bold text-white mb-4">
                            {platforms[currentIndex].name}
                        </h4>
                                            <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-6">
                            {platforms[currentIndex].description}
                        </p>
                        {platforms[currentIndex].link && (
                            <a
                                href={platforms[currentIndex].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 hover:text-blue-300 px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                            >
                                {platforms[currentIndex].linkType === "paper" ? "View Paper →" : "Visit Website →"}
                            </a>
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevPlatform}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 text-white p-3 rounded-full transition-all border border-blue-500/30"
                        aria-label="Previous platform"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextPlatform}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500/20 hover:bg-blue-500/30 text-white p-3 rounded-full transition-all border border-blue-500/30"
                        aria-label="Next platform"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {platforms.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPlatform(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex
                                    ? "bg-blue-500 w-8"
                                    : "bg-gray-600 hover:bg-gray-500"
                            }`}
                            aria-label={`Go to ${platforms[index].name}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const StoryMakAR = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeComponent, setActiveComponent] = useState(0);

    const handleCardClick = (index) => {
        if (isAnimating) return; // Prevent clicks during animation
        if (expandedCard === index) {
            // If clicking the same card, just collapse it
            setIsAnimating(true);
            setExpandedCard(null);
            setTimeout(() => setIsAnimating(false), 300);
        } else {
            // Collapse current card first, then expand new one
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
                                    color: '#f97316', // Fallback color for browsers that don't support gradient text
                                    display: 'block',
                                    visibility: 'visible',
                                    opacity: 1
                                }}>
                                    StoryMakAR
                                </h1>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                    Overview / Project Summary
                                </h2>
                                <div className="space-y-4 text-gray-200 mb-8">
                                    <p className="text-lg">
                                        <strong className="text-white">Project Title:</strong> StoryMakAR: Bringing Stories to Life With An Augmented Reality & Physical Prototyping Toolkit for Youth
                                    </p>
                                    <p className="text-lg">
                                        <strong className="text-white">Project Type:</strong> Research Project
                                    </p>
                                    
                                    {/* Teaser Figure */}
                                    <div className="my-6">
                                        <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                            <img 
                                                src="/assets/images/storymakar-header.png" 
                                                alt="StoryMakAR Workflow Overview" 
                                                className="w-full h-auto rounded-lg mb-2"
                                                loading="eager"
                                                decoding="async"
                                                style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                                onError={(e) => {
                                                    console.error(`Failed to load image: /assets/images/storymakar-header.png`);
                                                    e.target.style.display = 'none';
                                                }}
                                                onLoad={(e) => {
                                                    e.target.style.display = 'block';
                                                }}
                                            />
                                            <p className="text-orange-300 text-sm italic text-center">
                                                Overview of StoryMakAR workflow (from left to right). (a) Users build electro-mechanical devices, program them using our drag-and-drop environment, DeviceMakAR, and control them with our plug-and-play MakAR Board. (b) Users create events for their story with EventMakAR. (c) Finally, using an AR-enabled cell phone, users control the physical devices by using the virtual characters to create Virtual-Physical Interactions.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-lg">
                                        <strong className="text-white">Project Summary:</strong> Makerspaces can support educational experiences in prototyping for children. Storytelling platforms enable high levels of creativity and expression, but have high barriers of entry. We introduce StoryMakAR, which combines making and storytelling. StoryMakAR is a new AR-IoT system for children that uses block programming, physical prototyping, and event-based storytelling to bring stories to life. We reduce the barriers to entry for youth (Age=14-18) by designing an accessible, plug-and-play system through merging both electro-mechanical devices and virtual characters to create stories. We describe our initial design process, the evolution and workflow of StoryMakAR, and results from multiple single-session workshops with 33 high school students. Our preliminary studies led us to understand what students want to make. We provide evidence of how students both engage and have difficulties with maker-based storytelling. We also discuss the potential for StoryMakAR to be used as a learning environment for classrooms and younger students.
                                    </p>
                                    
                                    {/* Video Embed */}
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Project Video</h3>
                                        <div className="aspect-video rounded-lg overflow-hidden">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/coiOYpqJi6Q?si=hjtZD1HLd3m5j30u"
                                                title="StoryMakAR Project Video"
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
                                            <div className="text-5xl mb-3">📊</div>
                                            <div className="text-xl font-bold text-white mb-2">Principle Investigator</div>
                                            <div className="text-sm text-gray-300">Led research direction and methodology</div>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                            <div className="text-5xl mb-3">💡</div>
                                            <div className="text-xl font-bold text-white mb-2">UX Engineer</div>
                                            <div className="text-sm text-gray-300">Designed user experience and interactions</div>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                            <div className="text-5xl mb-3">🔧</div>
                                            <div className="text-xl font-bold text-white mb-2">Mechanical Engineer</div>
                                            <div className="text-sm text-gray-300">Developed hardware and physical systems</div>
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                            <div className="text-4xl mb-3">📚</div>
                                            <h3 className="text-lg font-bold text-white mb-2">Storytelling in Education</h3>
                                            <p className="text-sm text-gray-200">
                                                A powerful tool for building communication, collaboration, creativity, and retention skills across Education, Engineering, and Design.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                            <div className="text-4xl mb-3">🔗</div>
                                            <h3 className="text-lg font-bold text-white mb-2">Storytelling & Making</h3>
                                            <p className="text-sm text-gray-200">
                                                Researchers connect storytelling with making to expose people to technology in new and exciting ways.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                            <div className="text-4xl mb-3">🌐</div>
                                            <h3 className="text-lg font-bold text-white mb-2">AR Opportunity</h3>
                                            <p className="text-sm text-gray-200">
                                                AR transforms mobile devices into gateways between physical and virtual worlds, but lacks research on controlling physical objects with virtual content.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Storytelling Platforms Carousel */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Existing Storytelling Platforms</h3>
                                    <PlatformCarousel />
                                </div>

                                {/* Our Contributions */}
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Contributions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                            <h4 className="text-lg font-bold text-white mb-3">Design Rationale</h4>
                                            <p className="text-sm text-gray-200">
                                                Insights from children's maker-based storytelling engagement studies.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                            <h4 className="text-lg font-bold text-white mb-3">StoryMakAR System</h4>
                                            <p className="text-sm text-gray-200">
                                                Complete plug-and-play AR-IoT toolkit with programming environments.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                            <h4 className="text-lg font-bold text-white mb-3">Study Results</h4>
                                            <p className="text-sm text-gray-200">
                                                Evaluation demonstrating easy creation of unique storytelling experiences.
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
                                            {/* Dots Container */}
                                            <div className="relative flex justify-between items-center">
                                                {/* Dot 1 */}
                                                <div className={`relative z-10 transition-all duration-300 ${
                                                    expandedCard === 0 ? 'scale-150' : 'scale-100'
                                                }`}>
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                                                </div>
                                                
                                                {/* Horizontal Connecting Line - Starts at center of first dot, ends at center of last dot */}
                                                {/* Each dot is w-4 (1rem) + border-4 (0.25rem each side) = 1.5rem total, center is at 0.75rem */}
                                                <div className="absolute top-1/2 left-[0.75rem] right-[0.75rem] h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 -translate-y-1/2 z-0"></div>
                                                
                                                {/* Dot 2 */}
                                                <div className={`relative z-10 transition-all duration-300 ${
                                                    expandedCard === 1 ? 'scale-150' : 'scale-100'
                                                }`}>
                                                    <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-black"></div>
                                                </div>
                                                
                                                {/* Dot 3 */}
                                                <div className={`relative z-10 transition-all duration-300 ${
                                                    expandedCard === 2 ? 'scale-150' : 'scale-100'
                                                }`}>
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Cards Container */}
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                            {/* Step 1 */}
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
                                                    aria-label="Expand Preliminary Studies card"
                                                >
                                                    {/* Subtle background gradient */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                        expandedCard === 0 ? 'opacity-100' : ''
                                                    }`}></div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-center gap-3 mb-2">
                                                            <span className="text-2xl">🔍</span>
                                                            <h4 className="text-lg font-bold text-white">Preliminary Studies</h4>
                                                        </div>
                                                        <div className={`overflow-hidden transition-all duration-300 ${
                                                            expandedCard === 0 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                        }`}>
                                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                                I conducted three Storytelling Challenge workshops with 53 students to understand what they wanted to create and how they engaged with maker-based storytelling.
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

                                            {/* Step 2 */}
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
                                                    aria-label="Expand Design Criteria card"
                                                >
                                                    {/* Subtle background gradient */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                        expandedCard === 1 ? 'opacity-100' : ''
                                                    }`}></div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-center gap-3 mb-2">
                                                            <span className="text-2xl">💡</span>
                                                            <h4 className="text-lg font-bold text-white">Design Criteria</h4>
                                                        </div>
                                                        <div className={`overflow-hidden transition-all duration-300 ${
                                                            expandedCard === 1 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                        }`}>
                                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                                From the workshops, I extracted critical design criteria that informed the StoryMakAR system architecture and user experience.
                                                            </p>
                                                        </div>
                                                        {expandedCard !== 1 && (
                                                            <div className="flex items-center justify-center mt-2">
                                                                <span className="text-xs text-cyan-400 opacity-70 animate-pulse">Click to expand</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Step 3 */}
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
                                                    aria-label="Expand Pilot Studies card"
                                                >
                                                    {/* Subtle background gradient */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                                        expandedCard === 2 ? 'opacity-100' : ''
                                                    }`}></div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-center gap-3 mb-2">
                                                            <span className="text-2xl">🧪</span>
                                                            <h4 className="text-lg font-bold text-white">Pilot Studies</h4>
                                                        </div>
                                                        <div className={`overflow-hidden transition-all duration-300 ${
                                                            expandedCard === 2 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                        }`}>
                                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                                I tested the initial prototype with participants experienced in AR or construction kits to refine the system before final deployment.
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

                                {/* Storytelling Challenge Results */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Storytelling Challenge: Key Insights</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">53</div>
                                            <div className="text-sm text-gray-300">Participants</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">71</div>
                                            <div className="text-sm text-gray-300">Objects Created</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">3</div>
                                            <div className="text-sm text-gray-300">Workshops</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">16</div>
                                            <div className="text-sm text-gray-300">Automotive</div>
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border">
                                            <p className="text-gray-200 leading-relaxed mb-4">
                                            I discovered that students preferred hands-on activities like building electronics and crafting objects over writing or presenting. When asked what they'd expect from storytelling software, creating animated characters and devices ranked in the top two choices, while plug-and-play electronics was the top choice for hardware toolkits.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-2">Top Preference</p>
                                                <p className="text-gray-200 text-sm">Plug-and-play electronics for hardware toolkits</p>
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-2">Key Finding</p>
                                                <p className="text-gray-200 text-sm">Hands-on activities preferred over narrative tasks</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preliminary Studies Carousel */}
                                <div className="mt-8 mb-8">
                                    <ImageCarouselWithCaptions 
                                        images={[
                                            {
                                                src: "/assets/images/storymakar/storymakar-helicopter.jpg",
                                                caption: "Sample images from our preliminary studies. Users made helicopters, animals, and rovers outfitted with LEDs and motors and constructed from a myriad of low-fidelity recyclable materials like aluminum cans, plastic cups and bottles, popsicle sticks, cardboard, and more!"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-prelim-penguin.JPG",
                                                caption: "Sample images from our preliminary studies. Users made helicopters, animals, and rovers outfitted with LEDs and motors and constructed from a myriad of low-fidelity recyclable materials like aluminum cans, plastic cups and bottles, popsicle sticks, cardboard, and more!"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-prelim-rover.JPG",
                                                caption: "Sample images from our preliminary studies. Users made helicopters, animals, and rovers outfitted with LEDs and motors and constructed from a myriad of low-fidelity recyclable materials like aluminum cans, plastic cups and bottles, popsicle sticks, cardboard, and more!"
                                            }
                                        ]}
                                    />
                                </div>

                                {/* System Design Goals - Visual Network */}
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold mb-6 text-center text-white">System Design Goals</h3>
                                    <p className="text-center text-gray-300 mb-6 max-w-2xl mx-auto">
                                        Based on my preliminary studies, I synthesized five core design goals that guided the StoryMakAR system development.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-5xl mb-3 relative z-10">💰</div>
                                            <h4 className="text-xl font-bold text-white mb-3 relative z-10">Accessible</h4>
                                            <p className="text-sm text-gray-300 relative z-10">
                                                Mixing I/O devices with low-fidelity materials to reduce costs and increase accessibility.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-5xl mb-3 relative z-10">🔄</div>
                                            <h4 className="text-xl font-bold text-white mb-3 relative z-10">Engagement</h4>
                                            <p className="text-sm text-gray-300 relative z-10">
                                                Encouraging exploration through the Design–Build–Play cycle with iteration tools.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-5xl mb-3 relative z-10">📐</div>
                                            <h4 className="text-xl font-bold text-white mb-3 relative z-10">Expressive</h4>
                                            <p className="text-sm text-gray-300 relative z-10">
                                                Giving users full control to alter or create their own physical content.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-5xl mb-3 relative z-10">🔌</div>
                                            <h4 className="text-xl font-bold text-white mb-3 relative z-10">Plug-and-Play</h4>
                                            <p className="text-sm text-gray-300 relative z-10">
                                                Electronics ready for immediate use with minimal configuration required.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group md:col-span-2 lg:col-span-1">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-5xl mb-3 relative z-10">🧱</div>
                                            <h4 className="text-xl font-bold text-white mb-3 relative z-10">Low Floors, Wide Walls</h4>
                                            <p className="text-sm text-gray-300 relative z-10">
                                                Accessible to all skill levels without prior electronics or programming knowledge.
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
                                    <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                                        The StoryMakAR System Architecture
                                    </h3>
                                    <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
                                        I designed StoryMakAR as a plug-and-play hardware platform with an integrated AR environment. The system consists of five interconnected components that work together to bring stories to life.
                                    </p>
                                    
                                    {/* System Components Visual Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
                                        <div 
                                            className={`glass rounded-xl p-3 sm:p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black touch-target min-h-[80px] sm:min-h-[100px] flex flex-col items-center justify-center ${
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
                                            aria-label="Select Electronics Toolkit component"
                                            aria-pressed={activeComponent === 0}
                                        >
                                            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">⚡</div>
                                            <h4 className="text-xs sm:text-sm font-bold text-white">Electronics Toolkit</h4>
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
                                            aria-label="Select DeviceMakAR component"
                                            aria-pressed={activeComponent === 1}
                                        >
                                            <div className="text-4xl mb-2">💻</div>
                                            <h4 className="text-sm font-bold text-white">DeviceMakAR</h4>
                                        </div>
                                        <div 
                                            className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                activeComponent === 2 
                                                    ? 'border-purple-500/80 bg-purple-500/20 scale-105 shadow-lg shadow-purple-500/30' 
                                                    : 'border-white/10 hover:scale-105 hover:border-purple-500/30 focus:border-purple-500/50'
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
                                            aria-label="Select EventMakAR component"
                                            aria-pressed={activeComponent === 2}
                                        >
                                            <div className="text-4xl mb-2">🎬</div>
                                            <h4 className="text-sm font-bold text-white">EventMakAR</h4>
                                        </div>
                                        <div 
                                            className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                activeComponent === 3 
                                                    ? 'border-green-500/80 bg-green-500/20 scale-105 shadow-lg shadow-green-500/30' 
                                                    : 'border-white/10 hover:scale-105 hover:border-green-500/30 focus:border-green-500/50'
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
                                            aria-label="Select StoryMakAR App component"
                                            aria-pressed={activeComponent === 3}
                                        >
                                            <div className="text-4xl mb-2">📱</div>
                                            <h4 className="text-sm font-bold text-white">StoryMakAR App</h4>
                                        </div>
                                        <div 
                                            className={`glass rounded-xl p-4 border text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${
                                                activeComponent === 4 
                                                    ? 'border-orange-500/80 bg-orange-500/20 scale-105 shadow-lg shadow-orange-500/30' 
                                                    : 'border-white/10 hover:scale-105 hover:border-orange-500/30 focus:border-orange-500/50'
                                            }`}
                                            onClick={() => setActiveComponent(4)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setActiveComponent(4);
                                                }
                                            }}
                                            tabIndex={0}
                                            role="button"
                                            aria-label="Select Structure Toolkit component"
                                            aria-pressed={activeComponent === 4}
                                        >
                                            <div className="text-4xl mb-2">🏗️</div>
                                            <h4 className="text-sm font-bold text-white">Structure Toolkit</h4>
                                        </div>
                                    </div>
                                    
                                    {/* Component Details - Tabbed Interface */}
                                    <div className="glass rounded-xl p-6 border-white/10 border">
                                        {activeComponent === 0 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-4xl">⚡</span>
                                                    <h4 className="text-2xl font-bold text-cyan-400">Electronics Toolkit</h4>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed">
                                                    I designed a modular electronics system with a main device and smaller sub-devices. Many off-the-shelf toolkits are hard for novices, so I created a plug-and-play PCB called the MakAR Board.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Core Technology</p>
                                                        <p className="text-gray-200 text-sm">Huzzah32 ESP32 Feather Board with BLE, WiFi, and multiple I/O pins</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">Key Feature</p>
                                                        <p className="text-gray-200 text-sm">8 I/O ports: 5 for output, 3 for input. Supports 2-4 pin sub-devices</p>
                                                    </div>
                                                </div>
                                                <ImageCarouselWithCaptions 
                                                    images={[
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-electronics-library.png",
                                                            caption: "Our Electronics Toolkit, which consists of our custom designed MakAR Board (left) and seven electronics modules: 2 DC motors, 3 servo motors, 1 sound buzzer, and 1 sensor"
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-board1-1.png",
                                                            caption: "The initial prototype of the MakAR Board before adjustments were made to include a screen and rotary encoder for usability. Extends to devices that use 2-pins, 3-pins, and 4-pins."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-board1-2.png",
                                                            caption: "The initial prototype of the MakAR Board with designated ports for Sensors, Servo Motors, and special ports for DC Motors by the H-Bridge."
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                        
                                        {activeComponent === 1 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-4xl">💻</span>
                                                    <h4 className="text-2xl font-bold text-cyan-400">DeviceMakAR</h4>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed">
                                                    I built a graphical programming interface that lets users create Arduino code through drag-and-drop blocks. Built on BlocklyDuino and extended for ESP32 libraries.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Key Functions</p>
                                                        <p className="text-gray-200 text-sm">DigitalWrite(), DigitalRead(), and custom built-in commands</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">Deployment</p>
                                                        <p className="text-gray-200 text-sm">Over-The-Air (OTA) server for wireless code upload</p>
                                                    </div>
                                                </div>
                                                <ImageCarouselWithCaptions 
                                                    images={[
                                                        {
                                                            src: "/assets/images/storymakar/devicemakar1.gif",
                                                            caption: "DeviceMakAR is a graphical programming language that allows the user to plug code blocks, operators, and values in various combinations, and outputs syntactically correct code in the Arduino programming language."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/devicemakar2.gif",
                                                            caption: "DeviceMakAR uses common Arduino commands such as DigitalWrite() and DigitalRead(), while allowing users to also choose from a list of our own built-in commands for any of the electrical components in our Electronics Library."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/devicemakar3.gif",
                                                            caption: "In this example, our user is creating a \"Plane\" device. Users create functions for each of their devices and name them accordingly. Here, out user has created two functions called \"Idle\" and \"Taxi.\" DeviceMakAR automatically generates a separate file that contains information for each device and function the user has created. These functions can be utilized later on when creating their events and interactions with EventMakAR. For now, the users will simply create their functions and save their code."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/devicemakar4.gif",
                                                            caption: "DeviceMakAR outputs syntactically correct code in the Arduino programming language. Each device is programmed individually in DeviceMakAR, compiled, and uploaded to the MakAR Board via an Over-The-Air (OTA) server."
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                        
                                        {activeComponent === 2 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-4xl">🎬</span>
                                                    <h4 className="text-2xl font-bold text-cyan-400">EventMakAR</h4>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed mb-4">
                                                    I created an interface for designing interactions between virtual characters and physical devices. Each event includes:
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Event Name</p>
                                                        <p className="text-gray-200 text-sm">Describes what's happening in the event</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">Subject</p>
                                                        <p className="text-gray-200 text-sm">Character or device the user controls</p>
                                                    </div>
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Target</p>
                                                        <p className="text-gray-200 text-sm">Character or device that performs an action</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">User Interface</p>
                                                        <p className="text-gray-200 text-sm">Control mechanism for the subject</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed mt-4">
                                                    This ecosystem enables Virtual-Physical Interactions, setting StoryMakAR apart from other AR platforms and storytelling toolkits.
                                                </p>
                                                <ImageCarouselWithCaptions 
                                                    images={[
                                                        {
                                                            src: "/assets/images/storymakar/eventmakar1.gif",
                                                            caption: "EventMakAR, which is an event planning app that allows the user to design the interactions that happen between their virtual characters and physical devices. Each event has (1) an Event Name, describing what is happening in the event and (2) a Subject, which is the character or device that the user controls. Users can choose between any of our four characters, or from a list of devices. If a virtual character is chosen, users can select an animation for the character to perform during the interaction. If a physical device is chosen, the list of functions that they programmed will be available for them to select. As the illustration shows, the \"plane\" device that our user created can be selected from either the \"subject\" or \"target\" fields, and the corresponding functions are selectable from the drop-down menu."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/eventmakar2.gif",
                                                            caption: "Each event also has a Target, which is the character or device that performs an action when the subject interacts with it. Users can choose between the virtual characters or physical devices for these interaction."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/eventmakar3.gif",
                                                            caption: "Finally, each event has a User Interface, which gives the user control over their subject during that particular event."
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                        
                                        {activeComponent === 3 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-4xl">📱</span>
                                                    <h4 className="text-2xl font-bold text-cyan-400">StoryMakAR Mobile App</h4>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed">
                                                    I developed a cell-phone application that wirelessly pairs to the electronic devices, turning them into Internet of Things (IoT) devices. The app enables users to control their physical devices through AR interactions.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Core Function</p>
                                                        <p className="text-gray-200 text-sm">Wireless pairing and AR-enabled device control</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">Integration</p>
                                                        <p className="text-gray-200 text-sm">Seamlessly connects with DeviceMakAR and EventMakAR</p>
                                                    </div>
                                                </div>
                                                <ImageCarouselWithCaptions 
                                                    images={[
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-app-hifi-wireframe.png",
                                                            caption: "A view of our default story mode where users receive a description of the story and are able to choose between them. They select their events from a list of pre-made events, select the devices and assign them to the physical MakAR Board through wireless pairing. Then users assign pins to each device, choose their characters that they want to control in the story. Finally, users can press the Play button and watch their story unfold in AR. See the teaser video in the Overview section to view the full process."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-ecosystem.png",
                                                            caption: "After our users design and build their devices, they can use (a) DeviceMakAR to program them and (b) EventMakAR to create the event for their story. Users can choose our default events or their own custom events in (c) StoryMakAR."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-slam.jpg",
                                                            caption: "A screenshot of a user playnig with the StoryMakAR app as their car drives into the garage."
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                        
                                        {activeComponent === 4 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-4xl">🏗️</span>
                                                    <h4 className="text-2xl font-bold text-cyan-400">Structure Toolkit</h4>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed mb-4">
                                                    I designed physical devices to be used in stories, including a House, Car, and Garage that showcase different interaction methods.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                                                        <div className="text-3xl mb-2">🏠</div>
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">House</p>
                                                        <p className="text-gray-200 text-xs">Servo opens door when virtual character approaches</p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
                                                        <div className="text-3xl mb-2">🚗</div>
                                                        <p className="text-sm text-cyan-300 font-semibold mb-2">Car</p>
                                                        <p className="text-gray-200 text-xs">Standalone or works with Garage</p>
                                                    </div>
                                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                                                        <div className="text-3xl mb-2">🏭</div>
                                                        <p className="text-sm text-blue-300 font-semibold mb-2">Garage</p>
                                                        <p className="text-gray-200 text-xs">Ultrasonic sensor opens door</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-200 leading-relaxed mt-4">
                                                    I also provided recyclable materials, 3D printed parts, connectors, fabric, and paint for customization.
                                                </p>
                                                <ImageCarouselWithCaptions 
                                                    images={[
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-structure-kit-1.png",
                                                            caption: "StoryMakAR's structure toolkit was designed to provide the user with the physical devices to be used in their stories. The toolkit consists of four story elements that the user can assemble using basic construction principles."
                                                        },
                                                        {
                                                            src: "/assets/images/storymakar/storymakar-structure-kit-2.jpg",
                                                            caption: "All devices fully assembled from our Structure toolkit. The house element is composed of two pieces of cardboard, laser cut to fold into itself. One MG90D High Torque Metal Gear micro servo, which is situated into the base of the house, and is connected to the door via a bar linkage. The car element is composed of one piece of laser cut plywood, two small gearbox DC motors, and 3D printed connectors. The catapult element is composed of five pieces of cardboard, a rubber band, and a wooden dowel rod. Two MG90D High Torque Metal Gear Micro Servos are situated on the structure and connected to the catapult shaft. The garage element is composed of several pieces of laser cut cardboard and a wooden dowel rod. A single FeeTech FS5103R Continuous Rotation Servo lifts the garage door after being triggered by the HC-SR04 Ultrasonic Sensor."
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Pilot Study Section */}
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                                        Pilot Study: Initial StoryMakAR Prototype
                                    </h3>
                                    <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
                                        I conducted pilot studies to understand how users interacted with the software/hardware system and what features they expected. The initial version didn't include DeviceMakAR and EventMakAR, using the first MakAR board prototype.
                                    </p>

                                    {/* Study Design */}
                                    <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400">Comparative Study Design</h4>
                                            <p className="text-gray-200 leading-relaxed mb-4">
                                            I designed a within-subjects study comparing StoryMakAR with Wonderscope, a traditional AR storytelling platform. This tested my hypothesis that virtual-physical interactions are more engaging than traditional AR interactions.
                                        </p>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">10</div>
                                                <div className="text-sm text-gray-300">Total Users</div>
                                            </div>
                                            <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">8</div>
                                                <div className="text-sm text-gray-300">AR Experience</div>
                                            </div>
                                            <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">6</div>
                                                <div className="text-sm text-gray-300">Construction Kit</div>
                                            </div>
                                            <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">18-35</div>
                                                <div className="text-sm text-gray-300">Age Range</div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-sm text-blue-300 font-semibold mb-2">Study Protocol</p>
                                            <p className="text-gray-200 text-sm">
                                                Participants were introduced to (i) Wonderscope AR app, (ii) structure toolkit construction, (iii) electronics toolkit connection, (iv) StoryMakAR app for story creation, and (v) story narration. Each session lasted ~2 hours.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Key Findings */}
                                    <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400">Key Findings</h4>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                                <p className="text-sm text-green-300 font-semibold mb-2">✨ Engagement</p>
                                                <p className="text-gray-200 text-sm">
                                                    Nine out of ten users preferred StoryMakAR over Wonderscope, citing the merging of physical and virtual content as the key factor.
                                                </p>
                                            </div>
                                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                <p className="text-sm text-blue-300 font-semibold mb-2">📊 MakAR Board</p>
                                                <p className="text-gray-200 text-sm">
                                                    Highly motivating for exploration (M=4.90, m=5, σ=0.3). Users appreciated the simplicity despite initial concerns about electronics.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-sm text-purple-300 font-semibold mb-2">💬 User Quote</p>
                                            <p className="text-gray-200 text-sm italic">
                                                "The StoryMakAR System allowed you to use physical reality to interact with virtual reality which gave the user something tangible to see and adds an extra fun factor to the experience."
                                            </p>
                                        </div>
                                    </div>

                                    {/* Challenges & Iterations */}
                                    <div className="glass rounded-xl p-6 border-white/10 border">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400">Challenges & System Improvements</h4>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                                <p className="text-sm text-red-300 font-semibold mb-2">⚠️ Challenges</p>
                                                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                                                    <li>Device assembly complexity</li>
                                                    <li>Phone screen as controller</li>
                                                    <li>Technical pairing issues</li>
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                                <p className="text-sm text-cyan-300 font-semibold mb-2">✅ Improvements</p>
                                                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                                                    <li>Added screen to MakAR board</li>
                                                    <li>Integrated DeviceMakAR & EventMakAR</li>
                                                    <li>Added sound module & DC motor</li>
                                                    <li>New female character option</li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-300 leading-relaxed">
                                            The learning curve was significantly reduced, allowing participants to focus on storytelling and interactions rather than circuit design. These insights directly informed the final system design.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

                {/* User Study 1 Section */}
                <section 
                    id="user-study-1" 
                    className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                >
                    <RevealOnScroll>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                            <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                    User Study 1: Default Events & Devices
                                </h2>
                                
                                {/* Summary */}
                                <div className="mb-8">
                                            <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
                                        I conducted single-session workshops with 14 high school students across 4 groups to evaluate how students engage with StoryMakAR when using default events and pre-designed devices. This study focused on understanding initial user experiences, identifying challenges with ready-made components, and assessing how the plug-and-play design of the MakAR Board affects student engagement and learning outcomes. Students worked through a structured protocol: system introduction, device building, programming, event creation, and AR storytelling. The study revealed high levels of creativity, reduced technical barriers, and strong potential for educational integration.
                                    </p>
                                </div>
                                
                                {/* Research Questions - Visual */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Research Questions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">🔍</div>
                                            <div className="text-blue-400 font-bold mb-2 relative z-10">RQ1</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                How do students engage with default events and pre-designed devices?
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">⚠️</div>
                                            <div className="text-cyan-400 font-bold mb-2 relative z-10">RQ2</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                What challenges arise with default system components?
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">🔌</div>
                                            <div className="text-purple-400 font-bold mb-2 relative z-10">RQ3</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                How does plug-and-play design affect engagement?
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
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">14</div>
                                            <div className="text-sm text-gray-300">Students</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">4</div>
                                            <div className="text-sm text-gray-300">Groups</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">📅</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">14-18</div>
                                            <div className="text-sm text-gray-300">Ages</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">⏱️</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">1</div>
                                            <div className="text-sm text-gray-300">Session</div>
                                        </div>
                                    </div>

                                    {/* Study Protocol Flow */}
                                    <div className="mb-6">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400 text-center">Workshop Protocol</h4>
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                                            {/* Flow Steps */}
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">📚</div>
                                                <div className="text-sm font-semibold text-white mb-1">Introduction</div>
                                                <div className="text-xs text-gray-400">System Overview</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">🏗️</div>
                                                <div className="text-sm font-semibold text-white mb-1">Build</div>
                                                <div className="text-xs text-gray-400">Devices</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">💻</div>
                                                <div className="text-sm font-semibold text-white mb-1">Program</div>
                                                <div className="text-xs text-gray-400">Devices</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">🎬</div>
                                                <div className="text-sm font-semibold text-white mb-1">Create</div>
                                                <div className="text-xs text-gray-400">Events</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">📱</div>
                                                <div className="text-sm font-semibold text-white mb-1">Play</div>
                                                <div className="text-xs text-gray-400">AR Stories</div>
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
                                                <li>Engagement metrics</li>
                                                <li>Usability assessments</li>
                                                <li>Story creation outcomes</li>
                                            </ul>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-cyan-500/20 border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">💬</div>
                                                <div className="text-cyan-300 font-semibold">Qualitative Data</div>
                                            </div>
                                            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside ml-2">
                                                <li>Student feedback</li>
                                                <li>Observations</li>
                                                <li>Story narratives</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Discussion - Visual Insights */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Key Insights</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">✨</div>
                                            <div className="text-green-300 font-semibold mb-2">High Creativity</div>
                                            <p className="text-gray-200 text-sm">
                                                Students demonstrated high levels of creativity merging physical and virtual storytelling
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🔌</div>
                                            <div className="text-blue-300 font-semibold mb-2">Reduced Barriers</div>
                                            <p className="text-gray-200 text-sm">
                                                Plug-and-play design allowed focus on storytelling, not technical complexity
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🎓</div>
                                            <div className="text-purple-300 font-semibold mb-2">Educational Value</div>
                                            <p className="text-gray-200 text-sm">
                                                Potential for classroom integration with simultaneous skill development
                                            </p>
                                        </div>
                                    </div>

                                    <div className="glass rounded-xl p-6 border-yellow-500/20 border bg-yellow-500/5">
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">💡</div>
                                            <div>
                                                <div className="text-yellow-300 font-semibold mb-2">Primary Finding</div>
                                                <p className="text-gray-200 text-sm">
                                                    Students preferred hands-on building and crafting over traditional writing tasks, confirming preliminary study findings and validating the maker-based approach.
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

                {/* User Study 2 Section */}
                <section 
                    id="user-study-2" 
                    className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20"
                >
                    <RevealOnScroll>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                            <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                    User Study 2: Custom Events & Devices
                                </h2>
                                
                                {/* Summary */}
                                <div className="mb-8">
                                            <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
                                        Building on User Study 1, I conducted workshops with 19 high school students across 8 groups to evaluate how students leverage the full StoryMakAR ecosystem when creating custom devices and events. This study focused on understanding how students use DeviceMakAR and EventMakAR to design personalized storytelling experiences, exploring the types of interactions they create (Virtual-Physical, Virtual-Virtual, Physical-Physical), and assessing how custom content creation affects engagement and story complexity. Students progressed from system introduction through custom device programming, event design, and AR storytelling, demonstrating increasing sophistication in their use of the platform.
                                    </p>
                                </div>
                                
                                {/* Research Questions - Visual */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Research Questions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">🛠️</div>
                                            <div className="text-blue-400 font-bold mb-2 relative z-10">RQ1</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                How do students create and customize devices and events?
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">🔗</div>
                                            <div className="text-cyan-400 font-bold mb-2 relative z-10">RQ2</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                What types of Virtual-Physical, Virtual-Virtual, and Physical-Physical interactions do students design?
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                            <div className="text-4xl mb-3 relative z-10">📈</div>
                                            <div className="text-purple-400 font-bold mb-2 relative z-10">RQ3</div>
                                            <p className="text-gray-200 text-sm relative z-10">
                                                How does custom content affect engagement and complexity?
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
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">19</div>
                                            <div className="text-sm text-gray-300">Students</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">8</div>
                                            <div className="text-sm text-gray-300">Groups</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">📅</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">14-18</div>
                                            <div className="text-sm text-gray-300">Ages</div>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-4xl mb-2">🎨</div>
                                            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-1">Custom</div>
                                            <div className="text-sm text-gray-300">Content</div>
                                        </div>
                                    </div>

                                    {/* Study Protocol Flow */}
                                    <div className="mb-6">
                                        <h4 className="text-xl font-bold mb-4 text-cyan-400 text-center">Workshop Protocol</h4>
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                                            {/* Flow Steps */}
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">📚</div>
                                                <div className="text-sm font-semibold text-white mb-1">Introduction</div>
                                                <div className="text-xs text-gray-400">System Overview</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">🛠️</div>
                                                <div className="text-sm font-semibold text-white mb-1">Custom Build</div>
                                                <div className="text-xs text-gray-400">Devices</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">💻</div>
                                                <div className="text-sm font-semibold text-white mb-1">Program</div>
                                                <div className="text-xs text-gray-400">DeviceMakAR</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">🎬</div>
                                                <div className="text-sm font-semibold text-white mb-1">Design</div>
                                                <div className="text-xs text-gray-400">EventMakAR</div>
                                            </div>
                                            <div className="hidden md:block text-2xl text-blue-500">→</div>
                                            <div className="flex-1 glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                                <div className="text-3xl mb-2">📱</div>
                                                <div className="text-sm font-semibold text-white mb-1">Play</div>
                                                <div className="text-xs text-gray-400">AR Stories</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analysis Focus - Visual */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="glass rounded-xl p-5 border-blue-500/20 border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">🎯</div>
                                                <div className="text-blue-300 font-semibold">Study Focus</div>
                                            </div>
                                            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside ml-2">
                                                <li>Custom device creation</li>
                                                <li>Event design variety</li>
                                                <li>Interaction type distribution</li>
                                            </ul>
                                        </div>
                                        <div className="glass rounded-xl p-5 border-cyan-500/20 border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">📊</div>
                                                <div className="text-cyan-300 font-semibold">Analysis Methods</div>
                                            </div>
                                            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside ml-2">
                                                <li>Device type categorization</li>
                                                <li>Event interaction mapping</li>
                                                <li>Story complexity assessment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Discussion - Visual Insights */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Key Insights</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="glass rounded-xl p-6 border-green-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">📈</div>
                                            <div className="text-green-300 font-semibold mb-2">Progressive Engagement</div>
                                            <p className="text-gray-200 text-sm">
                                                Clear progression from default to custom content, demonstrating low floors and wide walls
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🎨</div>
                                            <div className="text-blue-300 font-semibold mb-2">Creative Expression</div>
                                            <p className="text-gray-200 text-sm">
                                                Unique storytelling enabled through custom devices and diverse interaction types
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                            <div className="text-5xl mb-3">🔗</div>
                                            <div className="text-purple-300 font-semibold mb-2">Interaction Variety</div>
                                            <p className="text-gray-200 text-sm">
                                                Students explored Virtual-Physical, Virtual-Virtual, and Physical-Physical interactions
                                            </p>
                                        </div>
                                    </div>

                                    <div className="glass rounded-xl p-6 border-yellow-500/20 border bg-yellow-500/5">
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl">💡</div>
                                            <div>
                                                <div className="text-yellow-300 font-semibold mb-2">Primary Finding</div>
                                                <p className="text-gray-200 text-sm">
                                                    The full StoryMakAR ecosystem successfully supports both technical skill development and narrative creativity, with custom content creation enabling increasingly sophisticated and personalized storytelling experiences.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Link to Results */}
                                <a 
                                    href="#user-study-2-results" 
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
                                
                                {/* User Study 1 Results */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4 text-blue-400">User Study 1 Results</h3>
                                            <p className="text-gray-200 leading-relaxed mb-6">
                                        The workshops with 14 high school students across 4 groups resulted in 4 complete stories using default events and pre-designed devices.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">4</div>
                                            <div className="text-sm text-gray-300">Stories Created</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-1">14</div>
                                            <div className="text-sm text-gray-300">Participants</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-1">4</div>
                                            <div className="text-sm text-gray-300">Groups</div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 mb-4">
                                        <p className="text-sm text-green-300 font-semibold mb-2">Key Finding</p>
                                        <p className="text-gray-300 text-sm">
                                            Students successfully created unique storytelling experiences using default events and pre-designed devices, demonstrating the system's effectiveness in supporting maker-based storytelling for youth. The plug-and-play design enabled students to focus on creativity rather than technical barriers.
                                        </p>
                                    </div>

                                    {/* Table 2: User Study 1 Demographics */}
                                    <div className="mb-6">
                                        <h4 className="text-xl font-bold mb-3 text-cyan-400">Table 2: Participant Demographics and Experience Levels</h4>
                                        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                                            <table className="w-full min-w-[600px] border-collapse glass rounded-lg border border-white/10 text-xs sm:text-sm" role="table" aria-label="Participant Demographics and Experience Levels">
                                                <thead>
                                                    <tr className="bg-blue-500/20">
                                                        <th scope="col" className="border border-white/20 p-3 text-left text-white font-semibold">Group Size</th>
                                                        <th scope="colgroup" className="border border-white/20 p-3 text-center text-white font-semibold" colSpan="2">Gender</th>
                                                        <th scope="colgroup" className="border border-white/20 p-3 text-center text-white font-semibold" colSpan="2">Electronics Experience</th>
                                                        <th scope="colgroup" className="border border-white/20 p-3 text-center text-white font-semibold" colSpan="5">Engineering Experience</th>
                                                        <th scope="colgroup" className="border border-white/20 p-3 text-center text-white font-semibold" colSpan="2">AR Experience</th>
                                                    </tr>
                                                    <tr className="bg-blue-500/10">
                                                        <th scope="col" className="border border-white/20 p-2 text-left text-gray-200 text-sm"></th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Boys</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Girls</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Yes</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">No</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Great Deal</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">A Lot</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Moderate</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">A Little</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">None</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Yes</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">No</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">4</th>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">4</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">4</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">3</th>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">4</th>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">4</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">4</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">3</th>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">0</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                            <p className="text-sm text-gray-300 italic mt-2">
                                            Demographics and experience levels of the 14 participants across 4 groups in User Study 1. The data shows diversity in gender, electronics experience, engineering background, and AR familiarity among participants.
                                        </p>
                                    </div>
                                </div>

                                {/* User Study 2 Results */}
                                <div id="user-study-2-results" className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4 text-blue-400">User Study 2 Results</h3>
                                            <p className="text-gray-200 leading-relaxed mb-6">
                                        The workshops with 19 high school students across 8 groups resulted in 8 complete stories featuring custom devices and events created using DeviceMakAR and EventMakAR.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">8</div>
                                            <div className="text-sm text-gray-300">Stories Created</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-1">19</div>
                                            <div className="text-sm text-gray-300">Participants</div>
                                        </div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center hover:scale-105 transition-transform">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-1">8</div>
                                            <div className="text-sm text-gray-300">Groups</div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 mb-4">
                                        <p className="text-sm text-green-300 font-semibold mb-2">Key Finding</p>
                                        <p className="text-gray-300 text-sm">
                                            Students successfully created custom devices and events, demonstrating the system's support for creative expression and customization. The variety of interaction types (V-P, V-V, P-P) showed students' ability to design sophisticated storytelling experiences.
                                        </p>
                                    </div>

                                    {/* Table 4: User Study 2 Custom Devices and Events */}
                                    <div className="mb-6">
                                        <h4 className="text-xl font-bold mb-3 text-cyan-400">Table 4: Custom Devices and Event Interactions Created by Students</h4>
                                        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                                            <table className="w-full min-w-[600px] border-collapse glass rounded-lg border border-white/10 text-xs sm:text-sm" role="table" aria-label="Custom Devices and Event Interactions Created by Students">
                                                <thead>
                                                    <tr className="bg-blue-500/20">
                                                        <th scope="col" className="border border-white/20 p-3 text-left text-white font-semibold">Group Size</th>
                                                        <th scope="col" className="border border-white/20 p-3 text-left text-white font-semibold">Custom Device(s)</th>
                                                        <th scope="colgroup" className="border border-white/20 p-3 text-center text-white font-semibold" colSpan="5">Events</th>
                                                    </tr>
                                                    <tr className="bg-blue-500/10">
                                                        <th scope="col" className="border border-white/20 p-2 text-left text-gray-200 text-sm"></th>
                                                        <th scope="col" className="border border-white/20 p-2 text-left text-gray-200 text-sm"></th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Total</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Virtual-Physical</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Virtual-Virtual</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">Physical-Physical</th>
                                                        <th scope="col" className="border border-white/20 p-2 text-center text-gray-200 text-sm">No Interaction</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">2</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Shariffy (Helicopter)</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200">Plane</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">3</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Helicopter</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">4</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">3</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Drawbridge, Rubber Band Shooter, Road Sign</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">1</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Bi-Plane</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">3</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">1</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Bird</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">5</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">5</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">3</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Thomas (Tank)</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">5</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">2</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="border border-white/20 p-3 text-gray-200 text-center font-semibold">4</th>
                                                        <td className="border border-white/20 p-3 text-gray-200">Leon Muck (Car), Yarnboy (Car)</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">1</td>
                                                        <td className="border border-white/20 p-3 text-gray-200 text-center">-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                            <p className="text-sm text-gray-300 italic mt-2">
                                            Breakdown of custom devices created and event interactions designed by the 8 groups in User Study 2. Students demonstrated creativity in device design and explored various interaction types: Virtual-Physical (virtual characters interacting with physical devices), Virtual-Virtual (virtual characters interacting with each other), and Physical-Physical (physical devices interacting with each other). The "No Interaction" column represents events where students selected only a subject without a target.
                                        </p>
                                    </div>
                                </div>

                                {/* Overall Success Metrics */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Overall Success Metrics</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="glass rounded-xl p-6 border-white/10 border">
                                            <h4 className="text-xl font-bold mb-3 text-cyan-400">System Effectiveness</h4>
                                            <ul className="text-gray-300 space-y-2 list-disc list-inside">
                                                <li>Successfully reduced barriers to entry for maker-based storytelling</li>
                                                <li>Enabled students to create unique Virtual-Physical Interactions</li>
                                                <li>Supported both novice and experienced users through low floors and wide walls</li>
                                                <li>Demonstrated potential for classroom integration</li>
                                            </ul>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-white/10 border">
                                            <h4 className="text-xl font-bold mb-3 text-cyan-400">Key Contributions</h4>
                                            <ul className="text-gray-300 space-y-2 list-disc list-inside">
                                                <li>Design rationale from preliminary studies with 53 students</li>
                                                <li>Complete StoryMakAR system with plug-and-play electronics</li>
                                                <li>Evaluation results showing system effectiveness</li>
                                                <li>Evidence of engagement and learning outcomes</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <ImageCarouselWithCaptions 
                                        images={[
                                            {
                                                src: "/assets/images/storymakar/storymakar-study1-1.JPG",
                                                caption: "Participants collaborating on their chosen story events"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-study1-2.jpg",
                                                caption: "Participants engaging with researchers"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-study1-3.JPG",
                                                caption: "Participants collaborating to build physical devices"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-study1-4.JPG",
                                                caption: "Participants creating experiences they have never seen before"
                                            },
                                            {
                                                src: "/assets/images/storymakar/storymakar-custom-devices.png",
                                                caption: "The custom devices made by students in User Study 2: (a) Bi-Plane, (b) Shariffy (Helicopter), (c) Rubber Band Shooter, (d) Bird, (e) Thomas the Tank, (f) Plane, (g) Leon Muck, (h) Helicopter, (i) Drawbridge, (j) Road Sign, (k) Yarnboy."
                                            }
                                        ]}
                                    />
                                </div>

                                {/* Award Recognition */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <div className="glass rounded-xl p-8 border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                                            <div className="text-6xl">🏆</div>
                                            <div className="text-center md:text-left">
                                                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                                    Honorable Mention
                                                </h3>
                                                <p className="text-xl text-white font-semibold mb-1">
                                                    Best Paper Award
                                                </p>
                                                <p className="text-lg text-gray-300">
                                                    CHI 2020 Conference on Human Factors in Computing Systems
                                                </p>
                                                <p className="text-sm text-gray-300 mt-2">
                                                    Honolulu, HI, USA • April 25–30, 2020
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <h4 className="text-xl font-bold mb-4 text-center text-yellow-300">Conference Presentation</h4>
                                            <div className="flex justify-center">
                                                <a
                                                    href="https://www.youtube.com/watch?v=KcICyGweeB0"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                                                >
                                                    <svg 
                                                        className="w-8 h-8" 
                                                        viewBox="0 0 24 24" 
                                                        fill="currentColor"
                                                    >
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                    </svg>
                                                    <span>Watch on YouTube</span>
                                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
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
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                    Conclusion
                                </h2>
                                
                                {/* Discussion - Visual */}
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Discussion</h3>
                                    
                                    <div className="mb-6">
                                            <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-6">
                                            StoryMakAR represents a significant step forward in combining making and storytelling for youth. Through my design process, I discovered that students prefer hands-on activities like building electronics and crafting objects over traditional writing or presentation tasks. This insight, combined with the need for accessible maker tools, led to the development of a plug-and-play system that reduces barriers to entry while maintaining high levels of creativity and expression.
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="glass rounded-xl p-6 border-blue-500/30 border text-center hover:scale-105 transition-transform">
                                                <div className="text-5xl mb-3">🔌</div>
                                                <div className="text-blue-300 font-semibold mb-2">Plug-and-Play Design</div>
                                                <p className="text-gray-200 text-sm">
                                                    Reduced barriers to entry while maintaining high creativity and expression
                                                </p>
                                            </div>
                                            <div className="glass rounded-xl p-6 border-cyan-500/30 border text-center hover:scale-105 transition-transform">
                                                <div className="text-5xl mb-3">🔗</div>
                                                <div className="text-cyan-300 font-semibold mb-2">Virtual-Physical Interactions</div>
                                                <p className="text-gray-200 text-sm">
                                                    Unique storytelling experiences transcending purely virtual or physical platforms
                                                </p>
                                            </div>
                                            <div className="glass rounded-xl p-6 border-purple-500/30 border text-center hover:scale-105 transition-transform">
                                                <div className="text-5xl mb-3">🎓</div>
                                                <div className="text-purple-300 font-semibold mb-2">Educational Potential</div>
                                                <p className="text-gray-200 text-sm">
                                                    Promising learning environment for classrooms with simultaneous skill development
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">💡</div>
                                                <div className="text-blue-300 font-semibold text-lg">Design Insights</div>
                                            </div>
                                            <p className="text-gray-200 text-sm leading-relaxed">
                                                The five core design goals—accessibility, engagement, expressiveness, plug-and-play functionality, and low floors with wide walls—proved essential in creating a system that supports both novice and experienced users.
                                            </p>
                                        </div>
                                        <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">📚</div>
                                                <div className="text-cyan-300 font-semibold text-lg">Educational Value</div>
                                            </div>
                                            <p className="text-gray-200 text-sm leading-relaxed">
                                                StoryMakAR shows promise as a learning environment for classrooms, enabling students to develop technical skills, creativity, and communication abilities simultaneously through storytelling.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                                            <p className="text-gray-200 leading-relaxed text-center">
                                            My evaluation studies provide evidence of how students engage with and face difficulties in maker-based storytelling. The findings inform not only the future development of StoryMakAR but also contribute to the broader understanding of how to design accessible maker tools for educational contexts.
                                        </p>
                                    </div>
                                </div>

                                {/* Future Work - Visual */}
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold mb-6 text-blue-400 text-center">Future Work</h3>
                                            <p className="text-gray-200 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                                        Several directions for future research and development emerged from this work:
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="glass rounded-xl p-6 border-purple-500/20 border hover:scale-105 transition-transform">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-4xl">📅</div>
                                                <div className="text-purple-300 font-semibold">Extended Deployments</div>
                                            </div>
                                            <p className="text-gray-200 text-sm">
                                                Explore longer-term deployments in classroom settings to understand how student engagement and learning outcomes evolve over extended periods of use.
                                            </p>
                                        </div>
                                        
                                        <div className="glass rounded-xl p-6 border-green-500/20 border hover:scale-105 transition-transform">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-4xl">👶</div>
                                                <div className="text-green-300 font-semibold">Younger Students</div>
                                            </div>
                                            <p className="text-gray-200 text-sm">
                                                Adapt the system for younger students with simplified interfaces and age-appropriate content, expanding beyond the current 14-18 age range.
                                            </p>
                                        </div>
                                        
                                        <div className="glass rounded-xl p-6 border-blue-500/20 border hover:scale-105 transition-transform">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-4xl">👥</div>
                                                <div className="text-blue-300 font-semibold">Collaborative Features</div>
                                            </div>
                                            <p className="text-gray-200 text-sm">
                                                Explore collaborative storytelling features, allowing multiple users to work together on shared stories and devices.
                                            </p>
                                        </div>
                                        
                                        <div className="glass rounded-xl p-6 border-cyan-500/20 border hover:scale-105 transition-transform">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-4xl">📊</div>
                                                <div className="text-cyan-300 font-semibold">Assessment Tools</div>
                                            </div>
                                            <p className="text-gray-200 text-sm">
                                                Develop assessment frameworks and tools to measure learning outcomes, creativity, and technical skill development for formal educational integration.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <p className="text-gray-300 text-sm">
                                            <span className="text-yellow-300 font-semibold">Additional Directions:</span> Integration with other educational technologies, development of curriculum materials, and creation of online communities where students can share their stories and devices.
                                        </p>
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
                                                I am grateful to my collaborators for their invaluable contributions to the design, development, and evaluation of StoryMakAR:
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-white font-semibold">Ananya Ipsita</p>
                                                    <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                                </div>
                                                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                                    <p className="text-white font-semibold">Caleb Carithers</p>
                                                    <p className="text-gray-300 text-sm">C Design Lab, Purdue University</p>
                                                </div>
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
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                    <div className="text-2xl font-bold text-green-300 mb-1">53</div>
                                                    <p className="text-gray-200 text-sm">Preliminary Workshops</p>
                                                </div>
                                                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                    <div className="text-2xl font-bold text-green-300 mb-1">10</div>
                                                    <p className="text-gray-200 text-sm">Pilot Study</p>
                                                </div>
                                                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                                    <div className="text-2xl font-bold text-green-300 mb-1">33</div>
                                                    <p className="text-gray-200 text-sm">Main Evaluation</p>
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
                                            StoryMakAR demonstrates the potential for AR-IoT systems to create accessible, engaging, and expressive storytelling experiences for youth. By combining physical making, electronics programming, and augmented reality, the system opens new possibilities for creative expression and learning in educational settings, paving the way for future innovations in maker-based storytelling.
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

export default StoryMakAR;

