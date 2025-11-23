import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../../RevealOnScroll";

// Timeline Component for Curriculum Modules
const TimelineModule = ({ number, title, description, skills, color = "blue" }) => {
    const colorConfig = {
        blue: {
            border: "border-blue-500/20 bg-blue-500/5",
            text: "text-blue-300",
            badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        cyan: {
            border: "border-cyan-500/20 bg-cyan-500/5",
            text: "text-cyan-300",
            badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
            gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600"
        },
        green: {
            border: "border-green-500/20 bg-green-500/5",
            text: "text-green-300",
            badge: "bg-green-500/20 text-green-300 border-green-500/30",
            gradient: "bg-gradient-to-br from-green-500 to-green-600"
        },
        purple: {
            border: "border-purple-500/20 bg-purple-500/5",
            text: "text-purple-300",
            badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600"
        },
        orange: {
            border: "border-orange-500/20 bg-orange-500/5",
            text: "text-orange-300",
            badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
            gradient: "bg-gradient-to-br from-orange-500 to-orange-600"
        }
    };
    
    const config = colorConfig[color] || colorConfig.blue;

    return (
        <div className={`glass rounded-xl p-6 border ${config.border} hover:-translate-y-1 transition-all`}>
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${config.gradient} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                    {number}
                </div>
                <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-2 ${config.text}`}>{title}</h4>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <span 
                                key={idx}
                                className={`px-2 py-1 ${config.badge} text-xs rounded-full border`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Learning Principle Card
const PrincipleCard = ({ icon, title, description, examples }) => {
    return (
        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
            <div className="text-5xl mb-4 text-center">{icon}</div>
            <h4 className="text-xl font-bold text-white mb-3 text-center">{title}</h4>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{description}</p>
            <div className="space-y-2">
                <div className="text-xs font-semibold text-blue-400 mb-2">Key Applications:</div>
                {examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{example}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Project Showcase Card
const ProjectCard = ({ title, description, image, technologies }) => {
    return (
        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
            {image && (
                <div className="mb-4 bg-white rounded-lg p-2">
                    <img 
                        src={image} 
                        alt={title}
                        className="w-full rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                            console.error(`Failed to load image: ${image}`);
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                    <span 
                        key={idx}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

export const IoTCourse = () => {
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
                                IoT Course Design
                            </h1>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                                Overview / Project Summary
                            </h2>
                            <div className="space-y-4 text-gray-200 mb-8">
                                <p className="text-lg">
                                    <strong className="text-white">Project Title:</strong> Adopting Backward Design into a Constructionist Curriculum Design for IoT Skill Development in High Schoolers
                                </p>
                                <p className="text-lg">
                                    <strong className="text-white">Project Type:</strong> Research Paper (Extended Abstract) - Curriculum Design & Evaluation
                                </p>
                                
                                {/* Teaser Figure */}
                                <div className="my-6">
                                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                                        <img 
                                            src="/assets/images/constructionism-header.jpg" 
                                            alt="IoT Course Design showing curriculum modules for high school students learning IoT skills through hands-on constructionist activities" 
                                            className="w-full rounded-lg mb-2"
                                            loading="eager"
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/constructionism-header.jpg`);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                        <p className="text-orange-300 text-sm italic text-center">
                                            A constructionist curriculum designed using backward design principles to teach IoT skills to high school students. The curriculum progresses through four learning modules that scaffold students from basic electronics to designing and implementing smart toys and robots.
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-lg">
                                    <strong className="text-white">Project Summary:</strong> I contributed to the development and evaluation of an IoT curriculum for high school enrichment programs that integrates backward design methodology with constructionist learning principles. Drawing from my research experiences with IoT Maker and StoryMakAR, I helped design learning modules that enable students with minimal prior experience to successfully prototype IoT applications. The curriculum follows a scaffolded progression: (A) Basic Electronic Components and Wiring, (B) Basics of Microcontroller Programming, (C) Connecting Devices to the Internet, and (D) Design of Physical Things and Interfaces, culminating in students' ability to (E) design and implement Smart Toys and Robots. The course emphasizes hands-on, project-based learning where students construct knowledge through building tangible IoT devices.
                                </p>
                            </div>

                            {/* My Role Cards */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">My Contributions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">📚</div>
                                        <div className="text-xl font-bold text-white mb-2">Curriculum Design</div>
                                        <div className="text-sm text-gray-300">Contributed curriculum modules and learning activities based on insights from IoT Maker and StoryMakAR research studies, ensuring alignment with constructionist principles and backward design methodology.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🎓</div>
                                        <div className="text-xl font-bold text-white mb-2">Course Implementation</div>
                                        <div className="text-sm text-gray-300">Developed and taught the "Smart Toys and Robots" course at Purdue's GER²I program, implementing the curriculum with high school students in a summer residential workshop setting.</div>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                        <div className="text-5xl mb-3">🔬</div>
                                        <div className="text-xl font-bold text-white mb-2">Research Integration</div>
                                        <div className="text-sm text-gray-300">Integrated findings from IoT Maker and StoryMakAR user studies to inform curriculum design, ensuring evidence-based pedagogical approaches and effective skill scaffolding.</div>
                                    </div>
                                </div>
                            </div>

                            {/* External Links */}
                            <div className="mt-8 flex justify-center">
                                <a
                                    href="/assets/papers/constructionism.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                    aria-label="View the Constructionism Paper (opens in new tab)"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                    <span>View Research Paper</span>
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
                            
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                                    High school students often lack access to comprehensive IoT education that bridges theoretical knowledge with hands-on application. Traditional curricula may focus on either theory or isolated projects without providing a scaffolded learning pathway that enables students to progress from basic concepts to creating complex, interconnected smart devices.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">📖</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Gap in IoT Education</h3>
                                        <p className="text-sm text-gray-200">
                                            Limited availability of structured IoT curricula that combine electronics, programming, networking, and design in an integrated, scaffolded manner for high school learners.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🎯</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Learning Barriers</h3>
                                        <p className="text-sm text-gray-200">
                                            Students often struggle to connect abstract programming concepts with physical device behavior, requiring pedagogical approaches that make these connections tangible.
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-6 border-white/10 border text-center">
                                        <div className="text-4xl mb-3">🔧</div>
                                        <h3 className="text-lg font-bold text-white mb-2">Skill Integration</h3>
                                        <p className="text-sm text-gray-200">
                                            Need for curricula that systematically build skills across multiple domains (electronics, coding, networking, design) rather than treating them as separate subjects.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Solution Opportunity */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">The Solution Opportunity</h3>
                                <div className="glass rounded-xl p-6 border-blue-500/20 border bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                                    <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto mb-4">
                                        By applying backward design principles to structure learning outcomes and constructionist pedagogy to enable hands-on knowledge construction, we can create an IoT curriculum that systematically scaffolds students from basic electronics to designing and implementing complete smart devices. This approach leverages students' natural inclination to learn by building, while ensuring they develop the necessary technical skills through a carefully sequenced progression.
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🎓</div>
                                            <p className="text-sm text-gray-200">Backward Design</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">🔨</div>
                                            <p className="text-sm text-gray-200">Constructionism</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">+</div>
                                        <div className="glass rounded-xl p-4 border-white/10 border text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">📚</div>
                                            <p className="text-sm text-gray-200">Research Insights</p>
                                        </div>
                                        <div className="text-2xl text-blue-500">=</div>
                                        <div className="glass rounded-xl p-4 border-green-500/30 border bg-green-500/10 text-center flex-1 max-w-xs">
                                            <div className="text-3xl mb-2">✨</div>
                                            <p className="text-sm font-semibold text-green-300">Effective IoT Curriculum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Curriculum Design Section */}
            <section 
                id="curriculum" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Curriculum Design"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                                Curriculum Design Framework
                            </h2>
                            
                            {/* Learning Principles */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Pedagogical Foundations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <PrincipleCard
                                        icon="🎯"
                                        title="Backward Design"
                                        description="Starting with desired learning outcomes, we work backwards to design activities and assessments that ensure students achieve these goals. This approach ensures alignment between objectives, instruction, and evaluation."
                                        examples={[
                                            "Define end goal: Design and implement Smart Toys and Robots",
                                            "Identify prerequisite skills needed",
                                            "Design scaffolded modules building toward goal",
                                            "Create assessments aligned with outcomes"
                                        ]}
                                    />
                                    <PrincipleCard
                                        icon="🔨"
                                        title="Constructionism"
                                        description="Students learn most effectively when actively constructing tangible objects. By building IoT devices, students internalize abstract concepts through hands-on experience and experimentation."
                                        examples={[
                                            "Learning by building physical devices",
                                            "Tinkering and experimentation encouraged",
                                            "Knowledge constructed through making",
                                            "Tangible artifacts as learning outcomes"
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Curriculum Modules */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold mb-6 text-center text-blue-400">Learning Modules</h3>
                                <p className="text-gray-200 text-center mb-8 max-w-3xl mx-auto">
                                    The curriculum is structured as four scaffolded modules that progressively build students' IoT skills, culminating in their ability to design and implement complete smart devices.
                                </p>
                                
                                <div className="space-y-6">
                                    <TimelineModule
                                        number="A"
                                        title="Basic Electronic Components and Wiring"
                                        description="Students learn fundamental electronics concepts including resistors, LEDs, sensors, and actuators. They practice wiring circuits, understanding schematics, and building simple electronic devices. This foundation is essential for all subsequent IoT work."
                                        skills={["Electronics Fundamentals", "Circuit Design", "Component Identification", "Wiring Techniques", "Safety Practices"]}
                                        color="blue"
                                    />
                                    
                                    <TimelineModule
                                        number="B"
                                        title="Basics of Microcontroller Programming"
                                        description="Students are introduced to microcontroller programming using Arduino and block-based tools. They learn to write code that reads sensors, controls actuators, and implements basic logic. This module bridges hardware and software."
                                        skills={["Arduino Programming", "Block-based Coding", "Sensor Reading", "Actuator Control", "Logic Implementation"]}
                                        color="cyan"
                                    />
                                    
                                    <TimelineModule
                                        number="C"
                                        title="Connecting Devices to the Internet"
                                        description="Students learn about networking protocols, WiFi connectivity, and how to connect their devices to the internet. They explore concepts of IoT communication, data transmission, and remote control capabilities."
                                        skills={["WiFi Communication", "Network Protocols", "IoT Connectivity", "Remote Control", "Data Transmission"]}
                                        color="green"
                                    />
                                    
                                    <TimelineModule
                                        number="D"
                                        title="Design of Physical Things and Interfaces"
                                        description="Students learn design principles for creating user-friendly physical interfaces. They explore how to integrate electronics into physical forms, design for usability, and create engaging interactions between users and IoT devices."
                                        skills={["Physical Design", "User Interface Design", "Interaction Design", "Prototyping", "Usability"]}
                                        color="purple"
                                    />
                                    
                                    <div className="glass rounded-xl p-6 border-orange-500/30 border bg-gradient-to-br from-orange-500/10 to-yellow-500/10 text-center">
                                        <div className="text-5xl mb-4">🎉</div>
                                        <h4 className="text-2xl font-bold text-orange-300 mb-3">Culminating Project: Smart Toys and Robots</h4>
                                        <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto">
                                            Students integrate all learned skills to design and implement their own smart toys and robots. This capstone project demonstrates mastery of electronics, programming, networking, and design through the creation of functional, interactive IoT devices.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Course Implementation Section */}
            <section 
                id="implementation" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Course Implementation"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Course Implementation
                        </h2>

                        {/* Course Details */}
                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Smart Toys and Robots Course</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <div className="text-sm font-semibold text-blue-300 mb-2">Institution</div>
                                        <div className="text-gray-200">Purdue University - GER²I (Gifted Education Research and Resource Institute)</div>
                                    </div>
                                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                        <div className="text-sm font-semibold text-cyan-300 mb-2">Target Audience</div>
                                        <div className="text-gray-200">High school students (Rising 9th to 12th graders)</div>
                                    </div>
                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <div className="text-sm font-semibold text-green-300 mb-2">Course Format</div>
                                        <div className="text-gray-200">Summer Residential Workshop</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                        <div className="text-sm font-semibold text-purple-300 mb-2">Course Title</div>
                                        <div className="text-gray-200">Design and Prototyping of Smart Things</div>
                                    </div>
                                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                        <div className="text-sm font-semibold text-orange-300 mb-2">Learning Approach</div>
                                        <div className="text-gray-200">Hands-on, project-based constructionist learning</div>
                                    </div>
                                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <div className="text-sm font-semibold text-yellow-300 mb-2">Tools & Technologies</div>
                                        <div className="text-gray-200">Arduino, TinkerCAD, everyday materials (cardboard, plastic, etc.)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Projects */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-purple-400">Featured Projects</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProjectCard
                                    title="BattleBots Challenge"
                                    description="Students collaborate in teams to design and build robots with the primary objective of popping an opponent's balloon. These robots are controlled via Wi-Fi, showcasing the integration of mechanical design, electronics, and wireless communication. This project reinforces technical skills while fostering teamwork, strategic thinking, and problem-solving abilities."
                                    technologies={["Arduino", "WiFi Control", "Mechanical Design", "Team Collaboration"]}
                                />
                                <ProjectCard
                                    title="Smart Device Prototypes"
                                    description="Students design and build their own IoT devices using everyday materials like cardboard, plastic bottles, and aluminum cans. They integrate electronic circuits, program microcontrollers, and create functional prototypes that demonstrate IoT concepts. This project allows for creative expression while applying learned technical skills."
                                    technologies={["IoT Prototyping", "Material Design", "Circuit Integration", "Creative Problem Solving"]}
                                />
                            </div>
                        </div>

                        {/* Student Feedback */}
                        <div className="glass rounded-xl p-6 border-green-500/20 border bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                            <h3 className="text-xl font-bold mb-4 text-green-400 text-center">Student Feedback</h3>
                            <div className="glass rounded-xl p-6 border-white/10 border relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-6xl text-green-500/20">"</div>
                                <p className="text-base sm:text-lg text-gray-200 italic mb-4 leading-relaxed relative z-10 pl-8">
                                    I have been coming back to GERI for four years now, and it was by far the best class I have taken. I truly have learned a lot. It is an amazing experience; Terrell is an excellent instructor, and so is Pashin, my coach. Pashin and Terrell taught me about circuits, augmented reality, and the use of CAD software.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-400 relative z-10 pl-8">
                                    <span className="font-semibold text-gray-300">— GER²I Student</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Research Contributions Section */}
            <section 
                id="contributions" 
                className="min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-20 scroll-mt-20"
                aria-label="Research Contributions"
            >
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                            Research Contributions
                        </h2>

                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Integration of Prior Research</h3>
                            <p className="text-gray-200 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                                My contributions to this curriculum design drew heavily from insights gained through my research with IoT Maker and StoryMakAR projects. These studies informed the pedagogical approaches, activity design, and skill scaffolding used in the curriculum.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                    <div className="text-4xl mb-3">🔌</div>
                                    <h4 className="text-lg font-bold text-white mb-3">IoT Maker Insights</h4>
                                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                        From IoT Maker research, I learned about effective approaches to teaching physical computing through live programming and simulation. These insights informed how we introduce microcontroller programming and sensor-actuator interactions in the curriculum.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-blue-400 mb-2">Key Applications:</div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Live programming concepts for immediate feedback</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Scaffolding complex electronics through block-based tools</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-blue-500 mt-1">•</span>
                                            <span>Reducing barriers to physical computing</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                    <div className="text-4xl mb-3">📖</div>
                                    <h4 className="text-lg font-bold text-white mb-3">StoryMakAR Insights</h4>
                                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                        From StoryMakAR research, I gained understanding of how youth engage with AR-IoT systems and create narratives through physical prototyping. These findings influenced how we approach the design and interface modules of the curriculum.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-purple-400 mb-2">Key Applications:</div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-purple-500 mt-1">•</span>
                                            <span>Narrative-driven project design</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-purple-500 mt-1">•</span>
                                            <span>Integrating storytelling with technical skills</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <span className="text-purple-500 mt-1">•</span>
                                            <span>Encouraging creative expression in technical projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum Development Process */}
                        <div className="glass rounded-xl p-6 border-white/10 border">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Curriculum Development Process</h3>
                            <div className="space-y-4">
                                <div className="glass rounded-xl p-6 border-cyan-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">1</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-cyan-300 mb-2">Define Learning Outcomes</h5>
                                            <p className="text-sm text-gray-300 mb-3">Using backward design, we first identified the end goal: students should be able to design and implement Smart Toys and Robots. This required defining what skills and knowledge students need to achieve this goal.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-green-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">2</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-green-300 mb-2">Design Scaffolded Modules</h5>
                                            <p className="text-sm text-gray-300 mb-3">Based on research insights from IoT Maker and StoryMakAR, we designed four progressive modules that build skills systematically, ensuring each module prepares students for the next.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-purple-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">3</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-purple-300 mb-2">Create Hands-On Activities</h5>
                                            <p className="text-sm text-gray-300 mb-3">Following constructionist principles, we developed activities where students learn by building. Each activity provides opportunities for tinkering, experimentation, and knowledge construction through making.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border-orange-500/20 border">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">4</div>
                                        <div className="flex-1">
                                            <h5 className="text-lg font-bold text-orange-300 mb-2">Implement and Iterate</h5>
                                            <p className="text-sm text-gray-300 mb-3">The curriculum was implemented in the Smart Toys and Robots course at GER²I. Student feedback and outcomes informed iterative improvements to the curriculum design.</p>
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
                                The curriculum successfully enabled high school students with minimal prior experience to develop comprehensive IoT skills and create functional smart devices. The constructionist approach combined with backward design principles proved effective in scaffolding learning and maintaining student engagement.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass rounded-xl p-6 border-blue-500/20 border">
                                    <div className="text-4xl mb-3">✅</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Skill Development</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Students successfully progressed through all four curriculum modules</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Demonstrated ability to integrate electronics, programming, and design</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Created functional IoT prototypes in culminating projects</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-400">✓</span>
                                            <span>Developed confidence in working with complex technical systems</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="glass rounded-xl p-6 border-green-500/20 border">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h4 className="text-lg font-bold text-white mb-3">Pedagogical Effectiveness</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Backward design ensured alignment between objectives and outcomes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Constructionist approach maintained high student engagement</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Scaffolded progression enabled students with diverse backgrounds</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Research-informed design validated through implementation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Key Achievements */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-purple-400">Key Achievements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">📚</div>
                                    <h4 className="text-base font-bold text-white mb-2">Structured Curriculum</h4>
                                    <p className="text-xs text-gray-300">
                                        Four scaffolded modules providing clear learning pathway
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">🎓</div>
                                    <h4 className="text-base font-bold text-white mb-2">Evidence-Based</h4>
                                    <p className="text-xs text-gray-300">
                                        Informed by research from IoT Maker and StoryMakAR studies
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">🔨</div>
                                    <h4 className="text-base font-bold text-white mb-2">Hands-On Learning</h4>
                                    <p className="text-xs text-gray-300">
                                        Constructionist approach enables learning through making
                                    </p>
                                </div>
                                <div className="glass rounded-xl p-5 border-purple-500/20 border hover:-translate-y-1 transition-all text-center">
                                    <div className="text-3xl mb-3">✨</div>
                                    <h4 className="text-base font-bold text-white mb-2">Student Success</h4>
                                    <p className="text-xs text-gray-300">
                                        Students create functional IoT devices in culminating projects
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Student Work Images */}
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-blue-400">Student Projects in Action</h3>
                            <div className="glass rounded-xl p-6 border-white/10 border overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-white rounded-lg p-2">
                                        <img 
                                            src="/assets/images/iotcourse/IMG_20180726_182534.jpg" 
                                            alt="Student-created IoT prototypes showcasing the integration of electronics, programming, and physical design from the curriculum modules" 
                                            className="w-full rounded-lg"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/iotcourse/IMG_20180726_182534.jpg`);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="bg-white rounded-lg p-2">
                                        <img 
                                            src="/assets/images/iotcourse/IMG_20180726_182638.jpg" 
                                            alt="Student-created IoT prototypes showcasing the integration of electronics, programming, and physical design from the curriculum modules" 
                                            className="w-full rounded-lg"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/iotcourse/IMG_20180726_182638.jpg`);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="bg-white rounded-lg p-2">
                                        <img 
                                            src="/assets/images/iotcourse/IMG_20190712_170057.jpg" 
                                            alt="Student-created IoT prototypes showcasing the integration of electronics, programming, and physical design from the curriculum modules" 
                                            className="w-full rounded-lg"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(`Failed to load image: /assets/images/iotcourse/IMG_20190712_170057.jpg`);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 italic text-center">
                                    Student-created IoT prototypes showcasing the integration of electronics, programming, and physical design from the curriculum modules. Some students adopted an offensive mindset, placing sharp edges and traps to pop the balloon on their opponents bot, while other teams decided to take a more defensive approach with shields to help protect their balloon.
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

                        <div className="glass rounded-xl p-6 border-white/10 border mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Summary</h3>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                                This curriculum design project demonstrates the effective integration of backward design methodology with constructionist learning principles to create a comprehensive IoT education program for high school students. By drawing on insights from IoT Maker and StoryMakAR research, I contributed to developing a scaffolded curriculum that enables students with minimal prior experience to successfully design and implement smart devices.
                            </p>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                The implementation of this curriculum in the Smart Toys and Robots course at Purdue's GER²I program validated the effectiveness of this approach. Students successfully progressed through all modules and created functional IoT prototypes, demonstrating that the combination of structured learning outcomes (backward design) with hands-on knowledge construction (constructionism) provides an effective pathway for IoT skill development in high school settings.
                            </p>
                        </div>

                        {/* Impact and Future Work */}
                        <div className="glass rounded-xl p-6 border-white/10 border">
                            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Impact and Future Directions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <div className="text-sm font-semibold text-blue-300 mb-2">Educational Impact</div>
                                    <div className="text-xs text-gray-300">Provides a replicable model for IoT curriculum design that can be adapted for various educational contexts and student populations.</div>
                                </div>
                                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <div className="text-sm font-semibold text-cyan-300 mb-2">Research Contribution</div>
                                    <div className="text-xs text-gray-300">Demonstrates how research insights from technology development projects can inform effective curriculum design.</div>
                                </div>
                                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <div className="text-sm font-semibold text-green-300 mb-2">Future Refinements</div>
                                    <div className="text-xs text-gray-300">Continued iteration based on student outcomes and feedback to further optimize the learning progression and activities.</div>
                                </div>
                                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                    <div className="text-sm font-semibold text-purple-300 mb-2">Scalability</div>
                                    <div className="text-xs text-gray-300">Potential to expand curriculum to include advanced topics and adapt for different age groups and learning contexts.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </main>
    );
};

export default IoTCourse;

