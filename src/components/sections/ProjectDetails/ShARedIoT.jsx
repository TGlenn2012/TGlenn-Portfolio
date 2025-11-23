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

// Pie Chart Component
const PieChart = ({ data, size = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top
    
    const slices = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        currentAngle += angle;
        const endAngle = currentAngle;
        
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;
        
        const x1 = size / 2 + (size / 2) * Math.cos(startAngleRad);
        const y1 = size / 2 + (size / 2) * Math.sin(startAngleRad);
        const x2 = size / 2 + (size / 2) * Math.cos(endAngleRad);
        const y2 = size / 2 + (size / 2) * Math.sin(endAngleRad);
        
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = [
            `M ${size / 2} ${size / 2}`,
            `L ${x1} ${y1}`,
            `A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');
        
        return { pathData, color: item.color, label: item.label, value: item.value, percentage };
    });
    
    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mb-4">
                {slices.map((slice, index) => (
                    <g key={index}>
                        <path
                            d={slice.pathData}
                            fill={slice.color}
                            stroke="#1a1a1a"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity"
                        />
                    </g>
                ))}
            </svg>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {slices.map((slice, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: slice.color }}
                        />
                        <span className="text-gray-300">
                            {slice.label}: {slice.value} ({slice.percentage.toFixed(1)}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Bar Chart Component
const BarChart = ({ data, maxValue, height = 200, showErrorBars = false, labelsAbove = false }) => {
    const maxBarValue = maxValue || Math.max(...data.map(d => d.value + (d.error || 0)));
    const labelAreaHeight = labelsAbove ? 60 : 0;
    const chartHeight = height + labelAreaHeight;
    const svgWidth = 800; // Wider SVG to accommodate text labels
    
    return (
        <div className="w-full overflow-x-auto">
            <svg width="100%" height={chartHeight} viewBox={`0 0 ${svgWidth} ${chartHeight}`} className="mb-4" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((percent) => (
                    <line
                        key={percent}
                        x1="0"
                        y1={labelAreaHeight + (height * percent) / 100}
                        x2={svgWidth}
                        y2={labelAreaHeight + (height * percent) / 100}
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                    />
                ))}
                
                {/* Bars */}
                {data.map((item, index) => {
                    const barHeight = (item.value / maxBarValue) * height * 0.9;
                    const barSpacing = svgWidth / data.length;
                    const x = (index * barSpacing) + (barSpacing * 0.1);
                    const y = labelAreaHeight + height - barHeight - 10;
                    const width = barSpacing * 0.8; // Wider bars (80% of spacing)
                    
                    // Error bar
                    const errorHeight = showErrorBars && item.error ? (item.error / maxBarValue) * height * 0.9 : 0;
                    
                    return (
                        <g key={index}>
                            {/* Label above bar */}
                            {labelsAbove && (
                                <text
                                    x={x + width / 2}
                                    y={labelAreaHeight - 10}
                                    textAnchor="middle"
                                    fill="#9ca3af"
                                    fontSize="11"
                                    className="select-none"
                                >
                                    {item.label}
                                </text>
                            )}
                            {/* Error bar */}
                            {showErrorBars && item.error && (
                                <line
                                    x1={x + width / 2}
                                    y1={y - errorHeight / 2}
                                    x2={x + width / 2}
                                    y2={y + errorHeight / 2}
                                    stroke="rgba(255, 255, 255, 0.5)"
                                    strokeWidth="2"
                                />
                            )}
                            {/* Bar */}
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={barHeight}
                                fill={item.color || "#3b82f6"}
                                className="hover:opacity-80 transition-opacity"
                            />
                            {/* Value label */}
                            <text
                                x={x + width / 2}
                                y={y - 5}
                                textAnchor="middle"
                                fill="#e5e7eb"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                {item.value.toFixed(2)}
                            </text>
                        </g>
                    );
                })}
            </svg>
            {/* X-axis labels (only if labels are not above) */}
            {!labelsAbove && (
                <div className="flex justify-around text-xs text-gray-400 mt-2" style={{ width: '100%' }}>
                    {data.map((item, index) => {
                        const barSpacing = 100 / data.length;
                        const barWidth = barSpacing * 0.8;
                        return (
                            <div 
                                key={index} 
                                className="text-center"
                                style={{ 
                                    width: `${barWidth}%`,
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                }}
                            >
                                {item.label}
                            </div>
                        );
                    })}
                </div>
            )}
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

export const ShARedIoT = () => {
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

    const components = [
        "Hardware System",
        "IoT Maker",
        "IntARact",
        "ShARed IoT App"
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
                                background: 'linear-gradient(to right, #f97316, #0284c7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: '#f97316',
                                display: 'block',
                                visibility: 'visible',
                                opacity: 1
                            }}>
                                ShARed IoT
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> ShARed IoT: Designing Shared Experiences in Co-Located Spaces with Augmented Reality and Internet of Things Devices
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Research Project
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/sharediot-header.png" 
                                            alt="ShARed IoT is a mobile augmented reality system that can wirelessly communicate with custom built electro-mechanical IoT devices. Cloud Anchors enable the sharing and control of all AR content across multiple smartphones, and our wireless communication protocol enables control of IoTs across those smartphones."
                                            className="w-full h-auto rounded-lg mb-2"
                                            loading="eager"
                                            decoding="async"
                                            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/sharediot-header.png`);
                                                e.target.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                e.target.style.display = 'block';
                                            }}
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            ShARed IoT is a mobile augmented reality system that can wirelessly communicate with custom built electro-mechanical IoT devices. Cloud Anchors enable the sharing and control of all AR content across multiple smartphones, and our wireless communication protocol enables control of IoTs across those smartphones. Using ShARed IoT, we study how users can use the system to create unique AR-IoT interactions and some classroom applications.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> Incorporating physical and computing devices alongside AR presents opportunities for shared experiences between users, leading to more engagement. Such shared experiences create opportunities for social interaction, ideation and creativity. In pursuit of a future where novice makers can create unique experiences, and subject matter experts can create dynamic, interactive, and engaging AR content, we present our solution to design Shared Experiences with Augmented Reality and Internet of Things (ShARed IoT) devices. Our system enables users to interact with each other and their electro-mechanical prototypes through AR. A Projective Interview study with 9 UX experts, followed by an initial study with middle school students, and a field study with 13 users were conducted. Our results show ShARed IoT as a system enables unique shared AR-IoT experiences for both novices and expert users.
                                </p>
                                
                                {/* Video Embed */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4 text-blue-400">Project Video</h3>
                                    <div className="aspect-video rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/QB6HfvakF2k?si=z2VDei35drFTI0jS"
                                            title="ShARed IoT Project Video"
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
                                        <div className="text-sm text-gray-300">Led the Projective Interview study with 9 UX experts and conducted user evaluations with 13 participants to validate system design and usability. Analyzed feedback to inform system architecture and interaction design.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">💻</div>
                                        <div className="text-xl font-bold text-white mb-2">System Development</div>
                                        <div className="text-sm text-gray-300">Designed and developed the IoT PCB hardware, IoT Maker web application, IntARact interaction authoring tool, and the ShARed IoT mobile AR application with Cloud Anchors and Photon networking.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🎓</div>
                                        <div className="text-xl font-bold text-white mb-2">Curriculum Designer</div>
                                        <div className="text-sm text-gray-300">Created educational content and conducted workshops with middle school students to evaluate the system in a classroom setting, integrating the IoT PCB into chemistry curriculum.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Paper Link Button */}
                            <div className="mt-8 flex justify-center">
                                <a
                                    href="/assets/papers/sharediot.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                    aria-label="View the ShARed IoT Paper (opens in new tab)"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                    <span>View the ShARed IoT Paper</span>
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
                                    Augmented Reality and IoT technologies each offer powerful capabilities, but there's a critical gap at their intersection. Existing systems lack the ability to enable shared, collaborative AR-IoT experiences that allow multiple users to create and control custom devices together.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🔗</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Virtual-Physical Gap</h3>
                                        <p className="text-sm text-gray-200">
                                            AR overlays virtual content, but most systems keep physical environments passive. Virtual objects can't actively interact with physical IoT devices.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">👥</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Limited Collaboration</h3>
                                        <p className="text-sm text-gray-200">
                                            Existing AR-IoT systems are single-user experiences. There's no platform for shared AR experiences in co-located spaces with multiple users.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🚧</div>
                                        <h3 className="text-lg font-bold text-white mb-2">High Barrier to Entry</h3>
                                        <p className="text-sm text-gray-200">
                                            Creating custom IoT devices requires extensive knowledge in electronics, programming, and networking, creating barriers for novices.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Intersection */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The Intersection Opportunity</h3>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                        While AR, IoT, and collaborative technologies each offer tremendous opportunities individually, there exists a critical gap at their intersection. This gap prevents users from creating shared AR-IoT experiences that combine virtual content with physical devices in collaborative settings.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔴</div>
                                            <p className="text-sm text-gray-200">Augmented Reality</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🟡</div>
                                            <p className="text-sm text-gray-200">IoT Devices</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔵</div>
                                            <p className="text-sm text-gray-200">Collaboration</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">=</div>
                                        <div className="glass rounded-xl p-4 border-green-500/30 border bg-green-500/10 text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">✨</div>
                                            <p className="text-sm font-semibold text-green-300">ShARed IoT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Our Contributions */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Contributions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">AR-IoT System</h4>
                                        <p className="text-sm text-gray-200">
                                            A complete system enabling users to design and program IoT devices for shared AR-IoT experiences across multiple smartphones with Cloud Anchors and wireless communication.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Block Programming Platform</h4>
                                        <p className="text-sm text-gray-200">
                                            A web-based block programming system with live simulation for programming DIY IoT devices without extensive prior knowledge in electronics or networking.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                        <h4 className="text-lg font-bold text-white mb-3">Evaluation Studies</h4>
                                        <p className="text-sm text-gray-200">
                                            Comprehensive evaluation through Projective Interview with 9 UX experts, middle school study with 123 students, and field study with 13 users.
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
                                                description: "I conducted a Projective Interview study with 9 UX experts to understand expectations and design requirements for AR-IoT systems. I analyzed feedback to inform system architecture and interaction design.",
                                                icon: "🔍",
                                                color: "blue"
                                            },
                                            {
                                                title: "Hardware Design",
                                                description: "I designed and developed the IoT PCB with plug-and-play capabilities, power distribution network, and support for multiple sensor and actuator types. I created the Electronics Repository with 6 sensors, 5 actuators, and LED components.",
                                                icon: "🔧",
                                                color: "cyan"
                                            },
                                            {
                                                title: "Software Development",
                                                description: "I developed IoT Maker (block-based programming with live simulation), IntARact (interaction authoring tool), and ShARed IoT mobile app (AR platform with Cloud Anchors and multiplayer networking).",
                                                icon: "💻",
                                                color: "blue"
                                            },
                                            {
                                                title: "User Evaluation",
                                                description: "I conducted preliminary study with 123 middle school students and final user study with 13 participants. I collected quantitative and qualitative data to assess system usability and effectiveness.",
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

                            {/* System Design Goals */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">System Design Goals</h3>
                                <p className="text-center text-gray-200 mb-6 max-w-2xl mx-auto">
                                    Core design principles that guided the ShARed IoT system development.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🎯</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Low Floors</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Reduce barriers for novices while enabling advanced functionality.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🔌</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Plug-and-Play</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Intuitive PCB design with clearly labeled ports for easy connection.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🤝</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">Collaboration</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Shared AR experiences across multiple smartphones in co-located spaces.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <div className="text-5xl mb-3 relative z-10">🎨</div>
                                        <h4 className="text-xl font-bold text-white mb-3 relative z-10">DIY Protocol</h4>
                                        <p className="text-sm text-gray-200 relative z-10">
                                            Support creative expression through customizable IoT devices.
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

                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">System Architecture</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6">
                                {components.map((component, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveComponent(index)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActiveComponent(index);
                                            }
                                        }}
                                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black ${
                                            activeComponent === index
                                                ? 'bg-blue-500/30 border-blue-500 text-white'
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                        }`}
                                        aria-pressed={activeComponent === index}
                                        aria-label={`Select ${component}`}
                                    >
                                        <span className="text-xs sm:text-sm font-semibold">{component}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6">
                                {activeComponent === 0 && (
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400">Hardware System</h4>
                                        
                                        <div className="mb-6">
                                            <h5 className="text-lg font-bold mb-3 text-cyan-400">IoT PCB</h5>
                                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                                The IoT PCB is a custom-designed printed circuit board that serves as the central hub for all electronic components. It features an Arduino-core based Wi-Fi capable microcontroller unit (MCU) with 3 input ports, 5 output ports, and 2 I²C ports. The board uses a power distribution network with three unique power sources (3.7V LiPo battery and two 9V Li-Ion batteries) to handle varying loads from different devices.
                                            </p>
                                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                                The design follows Gestalt principles of perceptual organization to make component placement intuitive. All soldered connections are exposed for easy access, though future iterations will include a protective sleeve to prevent damage.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h5 className="text-lg font-bold mb-3 text-cyan-400">Electronics Repository</h5>
                                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                                The Electronics Repository provides a comprehensive set of electronic components for users to create their IoT devices. It includes 6 sensors (Ultrasonic, Light, Temperature, etc.), 5 actuators (servo motors, DC motors), LED matrices, and RGB LEDs. These components are designed to work seamlessly with the IoT PCB through plug-and-play connections.
                                            </p>
                                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                                The repository was designed to support a wide range of creative projects while maintaining simplicity for novice users. Future work will include a device template system to allow users to add custom components to the catalog.
                                            </p>
                                        </div>

                                        <ImageCarouselWithCaptions 
                                            images={[
                                                {
                                                    src: "/assets/images/sharediot/Electronics_Repository_v3.PNG",
                                                    caption: "Our Electronics Repository, with 6 sensors and 2 RGB LEDs on the left, 5 actuators and 2 LED matrices on the right, and both sides of our custom-made IoT PCB in the center."
                                                }
                                            ]}
                                        />
                                    </div>
                                )}
                                {activeComponent === 1 && (
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400">IoT Maker</h4>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                            IoT Maker is a web application built on Google Blockly that enables users to program their IoT devices using a drag-and-drop block interface. The system outputs syntactically correct Arduino code and includes a live-action simulator that provides visual feedback before code compilation.
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                            The live simulator was designed to address expert feedback about the need for better debugging tools. Users can test their device functions in real-time without needing physical hardware, reducing iteration time and improving the design process.
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                            Once users are satisfied with their code, they can upload it to the IoT PCB via Over-The-Air (OTA) WiFi updating protocol. Device information is stored in a Firebase database for later use in event creation.
                                        </p>
                                        <ImageCarouselWithCaptions 
                                            images={[
                                                {
                                                    src: "/assets/images/sharediot/Soft_Hardware_Flowchart.png",
                                                    caption: "Interaction Flowchart (from left to right): Users generate code for their IoT devices using our block-based programming environment. Users can upload their code to the IoT PCB and the resulting device data is imported to our GUI for further processing. Using the GUI, events can be created that allow interactions between AR and IoT content."
                                                }
                                            ]}
                                        />
                                    </div>
                                )}
                                {activeComponent === 2 && (
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400">IntARact</h4>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                            IntARact is an interaction-based Graphical User Interface (GUI) that allows users to design interactions between AR content and IoT devices. Each interaction is structured as an "Event" containing: (1) an event name describing the interaction, (2) a subject (AR character or IoT device that initiates the action), (3) a target (AR character or IoT device that receives the action), and (4) a UI control scheme for user input.
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                            The application pulls device names and function data from Firebase, allowing users to select from pre-designed IoT devices or their own custom devices. Events are saved in JSON format for use in the main ShARed IoT application.
                                        </p>
                                    </div>
                                )}
                                {activeComponent === 3 && (
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400">ShARed IoT App</h4>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                            The ShARed IoT mobile application is built using Unity's AR Foundation Framework and Photon networking. It enables multiple users to share AR experiences in co-located spaces through Cloud Anchors, which create a synchronized coordinate system across all devices.
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                                            The system uses UDP communication over WiFi to control IoT devices. Users can join rooms, place AR content, and interact with physical IoT devices. The host places a Cloud Anchor to establish the shared coordinate system, and all participants see synchronized AR content in the same physical locations.
                                        </p>
                                        <ImageCarouselWithCaptions 
                                            images={[
                                                {
                                                    src: "/assets/images/sharediot/Architecture_revision.png",
                                                    caption: "The ShARed IoT system architecture for communication between devices: (1) Room Host loads their custom experience from a file on their phone and places the Cloud Anchor and AR content on the screen. (2) Once the host is finished, they send positional data about the Cloud Anchor and surrounding AR content to the rest of the users in the Photon room. (3) All collaborators in the room receive the data and spawn the content in the correct location and rotation. (4) Any user can now interact with IoT devices using UDP communication over WiFi."
                                                },
                                                {
                                                    src: "/assets/images/sharediot/ActivityFlow.png",
                                                    caption: "A flow of events for a participant in the ShARed IoT System"
                                                }
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Study Methodology Section */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mt-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Study Methodology</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                                I conducted three studies to evaluate and refine the ShARed IoT system: a Projective Interview with UX experts, a preliminary study with middle school students, and a final user study with university students.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {/* Expert Study */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">👥</div>
                                    <h4 className="text-lg sm:text-xl font-bold mb-3 text-blue-400 text-center">Expert Study</h4>
                                    <div className="space-y-2 text-sm sm:text-base text-gray-300">
                                        <p><strong className="text-white">Participants:</strong> 9 UX experts</p>
                                        <p><strong className="text-white">Method:</strong> Projective Interview</p>
                                        <p><strong className="text-white">Duration:</strong> ~1 hour per interview</p>
                                        <p><strong className="text-white">Focus:</strong> Design expectations and requirements for AR-IoT systems</p>
                                    </div>
                                </div>

                                {/* Preliminary Study */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🎓</div>
                                    <h4 className="text-lg sm:text-xl font-bold mb-3 text-blue-400 text-center">Preliminary Study</h4>
                                    <div className="space-y-2 text-sm sm:text-base text-gray-300">
                                        <p><strong className="text-white">Participants:</strong> 123 middle school students (ages 12-13)</p>
                                        <p><strong className="text-white">Method:</strong> Classroom integration study</p>
                                        <p><strong className="text-white">Setting:</strong> 8th grade science class</p>
                                        <p><strong className="text-white">Focus:</strong> Using IoT PCB for chemistry experiments</p>
                                    </div>
                                </div>

                                {/* User Study */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🏌️</div>
                                    <h4 className="text-lg sm:text-xl font-bold mb-3 text-blue-400 text-center">User Study</h4>
                                    <div className="space-y-2 text-sm sm:text-base text-gray-300">
                                        <p><strong className="text-white">Participants:</strong> 13 university students (ages 18-34)</p>
                                        <p><strong className="text-white">Method:</strong> 6 two-hour workshops</p>
                                        <p><strong className="text-white">Task:</strong> Design IoT obstacles for mini golf course</p>
                                        <p><strong className="text-white">Focus:</strong> System usability and AR-IoT interaction creation</p>
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

                        {/* Expert Study Results */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Expert Study Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">9</div>
                                    <div className="text-sm text-gray-300">UX Experts</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">7</div>
                                    <div className="text-sm text-gray-300">Preferred WYSIWYG Input</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">6</div>
                                    <div className="text-sm text-gray-300">Rated System as Exceeding Expectations</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                    <div className="text-4xl mb-3">🎨</div>
                                    <h4 className="text-lg font-bold text-white mb-2">AR Input Modality</h4>
                                    <p className="text-sm text-gray-300">
                                        Most experts (N = 7) preferred WYSIWYG-based input modality, which aligned with ShARed IoT's design. 6 experts rated the system as exceeding expectations.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                    <div className="text-4xl mb-3">💻</div>
                                    <h4 className="text-lg font-bold text-white mb-2">IoT Device Design</h4>
                                    <p className="text-sm text-gray-300">
                                        Experts emphasized easy programming and software toolkits. This feedback directly informed the development of IoT Maker's live simulation feature.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                    <div className="text-4xl mb-3">🤝</div>
                                    <h4 className="text-lg font-bold text-white mb-2">Task Collaboration</h4>
                                    <p className="text-sm text-gray-300">
                                        Most experts (N = 8) preferred that each participant view the scene from their own perspective. They identified three control types: Hierarchical, Transferable, and Distributed.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="glass rounded-xl p-6 border-white/10 border mb-6">
                                <h4 className="text-lg font-bold text-white mb-4 text-center">Expert Expertise Distribution</h4>
                                <PieChart 
                                    size={250}
                                    data={[
                                        { label: "AR Development", value: 6, color: "#3b82f6" },
                                        { label: "IoT Development", value: 5, color: "#06b6d4" },
                                        { label: "Electronics Development", value: 5, color: "#8b5cf6" },
                                        { label: "Educational Workshops", value: 1, color: "#10b981" }
                                    ]}
                                />
                                <p className="text-sm text-gray-400 text-center mt-4">
                                    Breakdown of our interviewee's expertise. Several of our experts were proficient in more than one area.
                                </p>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <h4 className="text-lg font-bold text-white mb-3">Summary</h4>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    The Projective Interview study with 9 UX experts provided critical insights that directly shaped the ShARed IoT system design. The overwhelming preference for WYSIWYG-based input modality (7 out of 9 experts) validated our design approach, and 6 experts rated the system as exceeding their expectations. Expert feedback emphasized the importance of easy programming and software toolkits, which directly informed the development of IoT Maker's live simulation feature. The identification of three collaboration control types (Hierarchical, Transferable, and Distributed) ensured that ShARed IoT supports diverse collaborative scenarios. Overall, the expert study confirmed that our system design aligned with industry expectations and best practices for AR-IoT interaction design.
                                </p>
                            </div>
                        </div>

                        {/* Preliminary Study Results */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Preliminary Study Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">123</div>
                                    <div className="text-sm text-gray-300">Middle School Students</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">67</div>
                                    <div className="text-sm text-gray-300">Would Use System Frequently</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">4.02</div>
                                    <div className="text-sm text-gray-300">Easy to Use (m)</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <h4 className="text-lg font-bold text-white mb-4">Key Metrics</h4>
                                    <StatVisualization 
                                        mean={4.024} 
                                        stdDev={0.888} 
                                        maxScale={5} 
                                        label="Easy to use"
                                    />
                                    <StatVisualization 
                                        mean={4.024} 
                                        stdDev={1.04} 
                                        maxScale={5} 
                                        label="Easy to learn"
                                    />
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-semibold text-white">67 students</span> would use the system frequently
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <QuoteCard 
                                        quote="It was very different to use something like a [IoT PCB], but it was easy to use and it held the attention span of everyone."
                                        name="Sarah"
                                        age={13}
                                        gender="Female"
                                    />
                                    <p className="text-sm sm:text-base text-gray-300 mt-4">
                                        Students enjoyed group work and found the system engaging for learning about chemical reactions.
                                    </p>
                                </div>
                            </div>
                            <ImageCarouselWithCaptions 
                                images={[
                                    {
                                        src: "/assets/images/sharediot/Experiment.png",
                                        caption: "Students at their lab tables (a,b) working on their lab assignment during our preliminary usability study, (c) asking questions about the assignment, and (d) creating a chemical reaction."
                                    },
                                    {
                                        src: "/assets/images/sharediot/Luminol-Full-Page-Revision.png",
                                        caption: "(a) The students getting a demonstration of a chemical called Luminol (b), which produces a bright, blue light as its chemical reaction. (c) The sensor values are displayed on the screen of the IoT PCB while it is in Laboratory Mode."
                                    }
                                ]}
                            />
                            
                            <div className="glass rounded-xl p-6 border-white/10 border mt-6">
                                <h4 className="text-lg font-bold text-white mb-4 text-center">Survey Data from Middle School Students (N=123)</h4>
                                <BarChart 
                                    height={200}
                                    data={[
                                        { label: "Would use frequently", value: 3.439, error: 1.134, color: "#3b82f6" },
                                        { label: "Easy to use", value: 4.024, error: 0.888, color: "#10b981" },
                                        { label: "Easy to learn", value: 4.024, error: 1.04, color: "#06b6d4" },
                                        { label: "Need to learn a lot", value: 2.764, error: 1.25, color: "#ef4444" }
                                    ]}
                                    maxValue={5}
                                    showErrorBars={true}
                                />
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center">
                                        <p className="text-gray-300">AR Experience</p>
                                        <p className="text-gray-400">58 had experience, 65 did not</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-300">Gender Distribution</p>
                                        <p className="text-gray-400">51 Male, 62 Female, 10 Unspecified</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <h4 className="text-lg font-bold text-white mb-3">Summary</h4>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    The preliminary study with 123 middle school students demonstrated the system's potential in educational settings. Students found the IoT PCB easy to use and engaging, with 67 students expressing interest in using the system frequently. The study revealed that the system successfully held students' attention and facilitated group collaboration during chemistry experiments. One key design outcome was the development of Laboratory Mode, which displays sensor data on the IoT PCB's OLED screen, making it easier for students to collect data during experiments. This feature proved valuable not only for the chemistry lab but also for future studies where users needed to test sensors before programming with IoT Maker.
                                </p>
                            </div>
                        </div>

                        {/* User Study Results */}
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">User Study Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">8</div>
                                    <div className="text-sm text-gray-300">Golf Course Obstacles Created</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">77.5</div>
                                    <div className="text-sm text-gray-300">System Usability Scale (SUS) Score</div>
                                </div>
                                <div className="glass rounded-xl p-4 border-white/10 border text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-1">13</div>
                                    <div className="text-sm text-gray-300">Participants Evaluated</div>
                                </div>
                            </div>

                            <h4 className="text-lg sm:text-xl font-bold mb-4 text-cyan-400">Component Impressions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <div className="text-3xl mb-3">🔌</div>
                                    <h5 className="font-bold text-white mb-4">IoT PCB</h5>
                                    <StatVisualization 
                                        mean={6.46} 
                                        stdDev={0.63} 
                                        maxScale={7} 
                                        label="Easy to connect devices"
                                    />
                                    <StatVisualization 
                                        mean={6.54} 
                                        stdDev={0.5} 
                                        maxScale={7} 
                                        label="Didn't require extensive training"
                                    />
                                    <p className="text-sm sm:text-base text-gray-300 mt-3">
                                        Plug-and-play design successfully simplified electronics.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <div className="text-3xl mb-3">💻</div>
                                    <h5 className="font-bold text-white mb-4">IoT Maker</h5>
                                    <StatVisualization 
                                        mean={6.69} 
                                        stdDev={0.46} 
                                        maxScale={7} 
                                        label="Usable"
                                    />
                                    <StatVisualization 
                                        mean={6.69} 
                                        stdDev={0.61} 
                                        maxScale={7} 
                                        label="Blocks made programming easy"
                                    />
                                    <p className="text-sm sm:text-base text-gray-300 mt-3">
                                        Some users found live simulator helpful but noted challenges visualizing servo angles.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <div className="text-3xl mb-3">🎨</div>
                                    <h5 className="font-bold text-white mb-4">IntARact</h5>
                                    <StatVisualization 
                                        mean={6.08} 
                                        stdDev={0.73} 
                                        maxScale={7} 
                                        label="Easy to use"
                                    />
                                    <StatVisualization 
                                        mean={6.08} 
                                        stdDev={1.07} 
                                        maxScale={7} 
                                        label="Simple way to create interactions"
                                    />
                                    <p className="text-sm sm:text-base text-gray-300 mt-3">
                                        2D interface for 3D interactions was a key challenge.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border">
                                    <div className="text-3xl mb-3">🌐</div>
                                    <h5 className="font-bold text-white mb-4">ShARed IoT</h5>
                                    <StatVisualization 
                                        mean={6.69} 
                                        stdDev={0.46} 
                                        maxScale={7} 
                                        label="Good use case"
                                    />
                                    <StatVisualization 
                                        mean={6.69} 
                                        stdDev={0.46} 
                                        maxScale={7} 
                                        label="Enjoyed creating obstacles"
                                    />
                                    <StatVisualization 
                                        mean={6.62} 
                                        stdDev={0.49} 
                                        maxScale={7} 
                                        label="Enjoyed AR-IoT interactions"
                                    />
                                    <StatVisualization 
                                        mean={6.77} 
                                        stdDev={0.42} 
                                        maxScale={7} 
                                        label="Appreciated shared experience"
                                    />
                                </div>
                            </div>

                            <ImageCarouselWithCaptions 
                                images={[
                                    {
                                        src: "/assets/images/sharediot/GolfDevices.png",
                                        caption: "The custom golf obstacles fabricated by our participants: (a) Golf Turnstile, (b) Octopus Spinner, (c) Pendulum, (d) Ramp, (e) Fan (pre-designed by researchers), (f) Crazy Car, (g) Gate, (h) Pendulum and Spider Release (on back), (i) Windmill (pre-designed by researchers)."
                                    },
                                    {
                                        src: "/assets/images/sharediot/GolfUsers_revision.png",
                                        caption: "A depiction of screenshots from our user study: (a) User prepares to use the Barbarian AR Character to activate the user-made drawbridge ramp device. (b) Participant attempts to putt the golf ball after the Barbarian is used to activate the pre-made fan device."
                                    }
                                ]}
                            />
                            
                            <div className="glass rounded-xl p-6 border-white/10 border mt-6 mb-6">
                                <h4 className="text-lg font-bold text-white mb-4 text-center">System Usability Scale (SUS) Score</h4>
                                <div className="flex items-end justify-center gap-4 mb-4" style={{ height: '200px' }}>
                                    <div className="flex flex-col items-center">
                                        <div 
                                            className="w-16 bg-gradient-to-t from-red-500 to-orange-500 rounded-t transition-all hover:opacity-80"
                                            style={{ height: '40px' }}
                                            title="Poor (0-50)"
                                        />
                                        <span className="text-xs text-gray-400 mt-2">Poor</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div 
                                            className="w-16 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t transition-all hover:opacity-80"
                                            style={{ height: '80px' }}
                                            title="OK (50-70)"
                                        />
                                        <span className="text-xs text-gray-400 mt-2">OK</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div 
                                            className="w-20 bg-gradient-to-t from-green-500 to-emerald-600 rounded-t transition-all hover:opacity-80 border-2 border-cyan-400"
                                            style={{ height: '155px' }}
                                            title="Good (70-80): Our Score 77.5"
                                        />
                                        <span className="text-xs text-cyan-400 mt-2 font-bold">77.5</span>
                                        <span className="text-xs text-gray-400">Good</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div 
                                            className="w-16 bg-gradient-to-t from-green-500 to-emerald-600 rounded-t transition-all hover:opacity-80"
                                            style={{ height: '180px' }}
                                            title="Excellent (80-100)"
                                        />
                                        <span className="text-xs text-gray-400 mt-2">Excellent</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 text-center">
                                    System Usability Scale (SUS) score distribution. Our score of 77.5 exceeds the benchmark of 68, indicating strong system usability.
                                </p>
                            </div>
                            
                            <div className="glass rounded-xl p-6 border-white/10 border">
                                <h4 className="text-lg font-bold text-white mb-4 text-center">Post-Study Survey Results</h4>
                                <BarChart 
                                    height={200}
                                    data={[
                                        { label: "Easy to connect devices", value: 6.46, error: 0.63, color: "#3b82f6" },
                                        { label: "No extensive training needed", value: 6.54, error: 0.5, color: "#10b981" },
                                        { label: "IoT Maker usable", value: 6.69, error: 0.46, color: "#06b6d4" },
                                        { label: "Blocks easy to use", value: 6.69, error: 0.61, color: "#8b5cf6" },
                                        { label: "Good use case", value: 6.69, error: 0.46, color: "#f59e0b" },
                                        { label: "Enjoyed AR-IoT interactions", value: 6.62, error: 0.49, color: "#ec4899" },
                                        { label: "Appreciated shared experience", value: 6.77, error: 0.42, color: "#14b8a6" }
                                    ]}
                                    maxValue={7}
                                    showErrorBars={true}
                                    labelsAbove={false}
                                />
                                <p className="text-sm text-gray-400 text-center mt-4">
                                    Participant responses to questions regarding their experience using the system and system usability (7-point Likert scale).
                                </p>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <h4 className="text-lg font-bold text-white mb-3">Summary</h4>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    The user study with 13 participants across six two-hour workshops validated the effectiveness of ShARed IoT for both beginners and experts. Participants successfully created 8 unique golf course obstacles, demonstrating the system's capacity to support creative expression. The overall System Usability Scale (SUS) score of 77.5 exceeded the benchmark of 68, indicating strong system usability. Component-level analysis revealed that the IoT PCB and IoT Maker received the highest ratings, with participants appreciating the plug-and-play design and block-based programming interface. While IntARact received lower ratings due to challenges with the 2D interface for 3D interaction design, participants still found value in creating AR-IoT interactions. Most importantly, all participants enjoyed creating AR-IoT interactions and appreciated the shared experience capability, confirming that ShARed IoT successfully enables collaborative AR-IoT experiences.
                                </p>
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

                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Discussion</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-blue-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🎯</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Low Barriers, High Capabilities</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        ShARed IoT enables both novice and expert users to design AR-IoT interactions. The system lowers barriers while raising the entry point, allowing users to do more with limited knowledge.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border bg-cyan-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">💡</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Visual Feedback</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        The live simulator in IoT Maker addresses creativity pressure by providing real-time visual feedback during the design process, helping users iterate and refine their ideas.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-green-500/20 border bg-green-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">✅</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Validated Effectiveness</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Studies with 123 middle school students and 13 university participants validated effectiveness. SUS score of 77.5 exceeds the 68 benchmark, indicating strong usability.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    The results from our user studies show that ShARed IoT successfully enables both novice and expert users to design their own interactions between AR content and IoT devices. The system's open-ended nature requires users to perform multiple design tasks through programming, device creation, and interaction design, but the live simulator and intuitive interfaces help mitigate the cognitive load.
                                </p>
                            </div>
                        </div>

                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Future Work</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="glass rounded-xl p-6 border-orange-500/20 border bg-orange-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🔄</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Unified Workflow</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Integrate event creation directly into the AR app to reduce cognitive load. Enable in-situ interaction design for more spontaneous creative processes.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border bg-cyan-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🥽</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Multi-Modal Deployment</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Explore Head-Mounted Displays (HMDs) like Microsoft HoloLens 2 for hands-free experiences with greater immersion and engagement.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-purple-500/20 border bg-purple-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🌐</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Remote Collaboration</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Extend the system to support remote participation in shared experiences, addressing accessibility when collaborators can't access the same space.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-green-500/20 border bg-green-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🔧</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Component Expansion</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Develop a framework for users to program custom electronics beyond the current repository, enabling broader creativity and adaptation.
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-blue-500/5 hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-3 text-center">🎮</div>
                                    <h4 className="text-lg font-bold text-white mb-2 text-center">Dynamic Hitboxes</h4>
                                    <p className="text-sm text-gray-200 text-center">
                                        Implement dynamic hitbox tracking for mobile IoT devices, similar to commercial AR games, to improve immersion for moving devices.
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
                                        I am grateful to my collaborators for their invaluable contributions to the design, development, and evaluation of ShARed IoT:
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
                                        Special thanks to all participants who contributed to our studies. Their feedback and engagement were essential to this research.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <div className="text-2xl font-bold text-green-300 mb-1">9</div>
                                            <p className="text-gray-200 text-sm">UX Experts</p>
                                        </div>
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <div className="text-2xl font-bold text-green-300 mb-1">123</div>
                                            <p className="text-gray-200 text-sm">Middle School Students</p>
                                        </div>
                                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                                            <div className="text-2xl font-bold text-green-300 mb-1">13</div>
                                            <p className="text-gray-200 text-sm">University Participants</p>
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
                                            <p className="text-gray-200 text-sm">C Design Lab</p>
                                            <p className="text-gray-300 text-xs mt-1">West Lafayette, IN, USA</p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <p className="text-white font-semibold mb-1">University of California, Irvine</p>
                                            <p className="text-gray-200 text-sm">Creativity Labs</p>
                                            <p className="text-gray-300 text-xs mt-1">Irvine, CA, USA</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-2xl">💰</div>
                                            <p className="text-yellow-300 font-semibold">Funding</p>
                                        </div>
                                        <p className="text-gray-200 text-sm">
                                            This research was supported by funding from Purdue University and the University of California, Irvine, through their respective research programs and facilities.
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
                                    ShARed IoT represents a significant step forward in enabling shared AR-IoT experiences for both novice and expert users. Through careful design of hardware, software, and interaction paradigms, we've created a system that lowers barriers to entry while enabling sophisticated creative expression. Our studies demonstrate the system's effectiveness across diverse user groups and use cases, from educational settings to collaborative workshops. The future work outlined above will continue to push the boundaries of what's possible in AR-IoT interaction design.
                                </p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

