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
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project
    const [showAllProjects, setShowAllProjects] = useState(false); // State to show/hide additional projects

    // Data for projects
    const projects = {
        microkarts: {
            title: "MicrokARts: Designing Augmented Reality Enabled Karts for Co-Located Play with Children",
            image: microkartsHeader,
            text: "MicrokARts is an Augmented Reality platform designed to help children design and program high-level electronics, while collaborating on tasks in a dynamic AR-IoT environment. Users (A) decide which electronics they want to put on their MicrokARt, (B) program their MicrokARt using our block-based live programming website, (C) dock the phone onto the MicrokARt, and (D) control their MicrokARt and play with others through AR-IoT interactions.",
            video: "https://www.youtube.com/embed/YeAr83zCgrY?si=SxcdQz43biOSt1PN",
            paper: "assets/papers/microkarts.pdf",
            skills: ["Augmented Reality", "IoT", "Curriculum Design", "Arduino", "Unity3D"],
        },
        sharediot: {
            title: "ShARed IoT: Shared Experiences in Co-Located Spaces with Augmented Reality and Internet of Things Devices",
            image: sharediotHeader,
            text: "ShARed IoT is a mobile augmented reality system that wirelessly communicates with custom built electro-mechanical IoT devices. IoT devices are crafted from low-fidelity materials and electronics from our Electronics Repository, and then programmed with our block-based programming tool called IoT Maker. Cloud Anchors enable the sharing and control of AR content across multiple smartphones, and our wireless communication protocol enables control of a users customized ShARed IoT device across those smartphones.",
            video: "https://www.youtube.com/embed/QB6HfvakF2k?si=z2VDei35drFTI0jS",
            paper: "assets/papers/sharediot.pdf",
            skills: ["Augmented Reality", "IoT", "Cloud Anchors", "Electronics", "Programming"],
        },
        iotmaker: {
            title: "IoT Maker: Creating High-Level Electro-Mechanical Devices Through Live Programming for Youth",
            image: iotmakerHeader,
            text: "IoT Maker is a web app that uses live programming to simulate various electronic devices. Users (a) drag-and-drop blocks of code into the programming environment and (b) watch their code execute in real-time on the screen, while interacting with sensors via sliders, buttons, and color pickers. Once the user has a sufficient understanding of the functionality of their code, they can (c) upload the code to our customized iBoard, and (d) connect their phone, tablet, or computer to the iBoard, and control the electronics via WiFi.",
            video: "https://www.youtube.com/embed/8j_6nkkeK_c?si=Ai_biSI57dN5DuWJ",
            paper: "assets/papers/iotmaker.pdf",
            skills: ["Augmented Reality", "IoT", "Curriculum Design", "Arduino", "Unity3D"],
        },
        storymakar: {
            title: "StoryMakAR: Bringing Stories to Life With An Augmented Reality & Physical Prototyping Toolkit for Youth",
            image: storymakarHeader, 
            text: "Overview of StoryMakAR workflow (from left to right). (a) Users build electro-mechanical devices, program them using our drag-and-drop environment, DeviceMakAR, and control them with our plug-and-play MakAR Board. (b) Users create events for their story with EventMakAR. (c) Finally, using an AR-enabled cell phone, users control the physical devices by using the virtual characters to create Virtual-Physical Interactions.",
            video: "https://www.youtube.com/embed/coiOYpqJi6Q?si=hjtZD1HLd3m5j30u",
            paper: "assets/papers/storymakar.pdf",
            skills: ["Augmented Reality", "IoT", "Curriculum Design", "Arduino", "Unity3D"],
        },
        sixdofroboticarm: {
            title: "Tele-Operation of a 6 DOF Robotic Arm Using ESP32 Over WiFi (IE 590 Final Project)",
            image: sixDofHeader,
            text: "The final project involved designing a 6-DoF robotic arm mounted on a car-like chassis. Controlled by an ESP32 microcontroller and programmed using Arduino IDE, the system featured servo motors, wheels, and electronics. A phone mounted on the chassis streamed its camera feed to a host computer via WiFi. A Unity 3D-based control interface sent UDP messages over WiFi to manage the robot's movements. The project was a culmination of the course, showcasing the integration of hardware and software skills acquired throughout the semester.",
            video: "https://www.youtube.com/embed/vpg0vclQi2Y?si=TCPfVPq23EVROOv8",
            paper: "assets/papers/sixdofarm.pdf",
            skills: ["Computer Vision", "SIFT/SURF", "Python", "Human-Robot Interaction", "ARCore (Android)", "ARKit (iPhone)", "Arduino", "Unity3D"],
        },
        iotconstructionism: {
            title: "Adopting Backward Design into a Constructionist Curriculum Design for IoT Skill Development in High Schoolers",
            image: constructionismHeader,
            text: "IoT curriculum designed using Backward design model. Using scaffolding and learning by doing approach, the learning modules (A) Basic Electronic Components and Wiring, (B) Basics of Microcontroller Programming, (C) Connecting Devices to the Internet, and (D) Design of Physical Things and Interfaces, can provide necessary skills to E) design and implement Smart Toys and Robots.",
            paper: "assets/papers/constructionism.pdf",
            skills: ["Learning Theories", "Backward Design", "TinkerCAD", "Constructionism", "Internet of Things", "Curriculum Design", "Vocational Education", "Arduino"],
        },
    };

    // Function to open the modal and set the selected project
    const openModal = (projectKey) => {
        setSelectedProject(projects[projectKey]);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false); // Function to close modal

    // Close modal on Escape key
    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

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
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col">
                            <div className="mb-4">
                                <img 
                                    src={microkartsHeroImage} 
                                    alt="MicrokARts" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                            <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">MicrokARts</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                MicrokARts empowers children to design, build, and program their own IoT-enabled karts using a block-based programming environment. The system encourages creative play and collaboration in a shared AR-IoT environment. Through hands-on activities, youth gain foundational skills in physical computing and interactive technology. The project was evaluated with both graduate experts and youth participants.
                            </p>
                            {/* Grouped Categories with Icons - Visual Test */}
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🌐</span>
                                        <span className="text-sm font-semibold text-blue-400">AR/IoT Platform</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Augmented Reality", "Cloud Anchors", "Multiplayer AR", "AR-IoT Interactions"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">⚙️</span>
                                        <span className="text-sm font-semibold text-blue-400">Hardware/Embedded</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["PCB Design", "ESP32", "Electronics Design", "Embedded Systems"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">💻</span>
                                        <span className="text-sm font-semibold text-blue-400">Software Development</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["Unity3D/ARFoundation", "Photon Networking", "Blockly/Blocklyduino", "Firebase"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🔬</span>
                                        <span className="text-sm font-semibold text-blue-400">Research & Evaluation</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["User Studies", "Mixed-Methods Research", "Workshop Facilitation", "Human-Computer Interaction"].map((tech, key) => (
                                    <span 
                                        key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                        {tech}
                                    </span>
                                ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/microkarts"
                                    className="block w-full bg-blue-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg font-medium text-base md:text-lg transition relative overflow-hidden text-center touch-target min-h-[44px] flex items-center justify-center
                                    hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>
                        </div>
                        {/* Project card #2 STORYMAKAR - FEATURED */}
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col">
                            <div className="mb-4">
                                <img 
                                    src={storymakarHeroImage} 
                                    alt="StoryMakAR" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                            <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">StoryMakAR</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-justify">
                                StoryMakAR combines physical prototyping and storytelling through AR, allowing youth to build devices and create interactive stories. The toolkit uses block programming and event-based logic to bring virtual and physical worlds together. Workshops with high school students revealed strong engagement and creativity. The system is designed to lower barriers for maker-based storytelling in educational settings.
                            </p>
                            {/* Grouped Categories with Icons */}
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🌐</span>
                                        <span className="text-sm font-semibold text-blue-400">AR/IoT</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Augmented Reality", "SLAM", "Physical Computing", "IoT/Wireless Communication"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base md:text-lg">💻</span>
                                        <span className="text-xs sm:text-sm font-semibold text-blue-400">Development</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Blockly/BlocklyDuino", "Arduino Programming", "Unity3D", "ESP32/Embedded Systems"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base md:text-lg">🔧</span>
                                        <span className="text-xs sm:text-sm font-semibold text-blue-400">Hardware</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["PCB Design", "Electronics Design", "3D Printing & Laser Cutting", "Hardware Prototyping"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base md:text-lg">🔬</span>
                                        <span className="text-xs sm:text-sm font-semibold text-blue-400">Research</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["User Studies & Evaluation", "Mixed-Methods Research", "Workshop Facilitation", "Human-Computer Interaction"].map((tech, key) => (
                                    <span 
                                        key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                        {tech}
                                    </span>
                                ))}
                                    </div>
                                </div>
                            </div>
                            {/* HYPERLINK TO VIEW CASE STUDY */}
                            <div className="mt-auto">
                                <Link 
                                    to="/storymakar"
                                    className="block w-full bg-blue-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg font-medium text-base md:text-lg transition relative overflow-hidden text-center touch-target min-h-[44px] flex items-center justify-center
                                    hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>                        
                        </div>
                        {/* Project card #3 IOT COURSE DESIGN - FEATURED */}
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col">
                            <div className="mb-4">
                                <img 
                                    src={iotcourseHeroImage} 
                                    alt="IoT Course Design" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">IoT Course Design for High Schoolers</h3>
                                <h4 className="text-gray-400 mb-2">Research Paper (2025)</h4>
                            </div>
                            <p className="text-gray-300 mb-4 text-justify">
                                This project developed and implemented an IoT curriculum for high school enrichment programs using backward design and constructionist principles. Students learned electronics, programming, connectivity, and design through hands-on modules. The curriculum enabled students with little prior experience to successfully prototype IoT applications. Results show significant skill development and engagement.
                            </p>
                            {/* Grouped Categories with Icons */}
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🔬</span>
                                        <span className="text-sm font-semibold text-blue-400">Research & Design</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Curriculum Design", "Backward Design", "Constructionism", "Instructional Design", "Learning Assessment"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🌐</span>
                                        <span className="text-sm font-semibold text-blue-400">IoT & Hardware</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["IoT", "Arduino", "TinkerCAD", "Electronics", "Physical Computing"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🎓</span>
                                        <span className="text-sm font-semibold text-blue-400">Education & Facilitation</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["STEM Education", "Workshop Facilitation", "Vocational Education", "Project-Based Learning"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-base md:text-lg">📚</span>
                                        <span className="text-xs sm:text-sm font-semibold text-blue-400">Research Integration</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Research Integration", "Evidence-Based Design", "User Studies"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/iotcourse"
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>  
                        </div>
                        {/* Project card #4 FAMILY TREE GENERATOR - FEATURED */}
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col">
                            <div className="mb-4">
                                <img 
                                    src={familyTreeHeroImage} 
                                    alt="Family Tree Generator" 
                                    className="w-full h-48 sm:h-56 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">Family Tree Generator</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                A full-stack web application that enables customers to design personalized, laser-ready family tree signs. Built for FlareTech Laser & Design, this tool transforms a complex customization process into an intuitive, real-time design experience with instant SVG/PDF export for manufacturing. Features include a 3-layer design system, AI-powered mockups, and secure Etsy order verification.
                            </p>
                            {/* Grouped Categories with Icons */}
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">💻</span>
                                        <span className="text-sm font-semibold text-orange-400">Frontend Development</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["React 18", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-orange-500/10 text-orange-400 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-orange-500/20 hover:shadow-[0_2px_8px_rgba(249,115,22,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">⚙️</span>
                                        <span className="text-sm font-semibold text-orange-400">Backend & Services</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Node.js/Express", "Firebase Auth", "Firestore", "Replicate AI", "Etsy OAuth"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-orange-500/10 text-orange-400 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-orange-500/20 hover:shadow-[0_2px_8px_rgba(249,115,22,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">✏️</span>
                                        <span className="text-sm font-semibold text-orange-400">Vector Processing</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["opentype.js", "Paper.js", "SVG Manipulation", "Text-to-Path", "PDF Export"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-orange-500/10 text-orange-400 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-orange-500/20 hover:shadow-[0_2px_8px_rgba(249,115,22,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">📊</span>
                                        <span className="text-sm font-semibold text-orange-400">Product & Analytics</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Google Analytics 4", "UX Design", "Figma", "CI/CD", "GitHub Pages"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-orange-500/10 text-orange-400 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-orange-500/20 hover:shadow-[0_2px_8px_rgba(249,115,22,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/familytreeapp"
                                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>  
                        </div>

                        {/* ========== ADDITIONAL PROJECTS (Hidden by default) ========== */}
                        
                        {/* Project card #5 SHARED IOT - ADDITIONAL */}
                        {showAllProjects && (
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn">
                            <div className="mb-4">
                                <img 
                                    src={sharediotHeroImage} 
                                    alt="ShARed IoT" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                            <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">ShARed IoT</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                ShARed IoT enables users to interact with custom-built IoT devices through mobile augmented reality, supporting shared experiences across multiple smartphones. The system uses cloud anchors and a wireless protocol for real-time device control and AR content sharing.
                            </p>
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🌐</span>
                                        <span className="text-sm font-semibold text-blue-400">AR/IoT</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Augmented Reality", "Cloud Anchors", "Physical Computing", "Multiplayer AR"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">💻</span>
                                        <span className="text-sm font-semibold text-blue-400">Development</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Unity3D", "Blockly", "JavaScript", "Photon Networking"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/sharediot"
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>
                        </div>
                        )}

                        {/* Project card #6 IOT MAKER - ADDITIONAL */}
                        {showAllProjects && (
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <div className="mb-4">
                                <img 
                                    src={iotmakerHeroImage} 
                                    alt="IoT Maker" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                            <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">IoT Maker</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                IoT Maker is a web app for live programming and simulation of electronic devices using a drag-and-drop interface. Users can interact with sensors in real time and upload their code to custom hardware for hands-on control.
                            </p>
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">💻</span>
                                        <span className="text-sm font-semibold text-blue-400">Development</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["Live Programming", "Blockly", "JavaScript", "ESP32/Arduino"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🔧</span>
                                        <span className="text-sm font-semibold text-blue-400">Hardware</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["PCB Design", "Embedded Systems", "Electronics", "WiFi/UDP"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/iotmaker"
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>                        
                        </div>
                        )}

                        {/* Project card #7 6-DOF ROBOTIC ARM - ADDITIONAL */}
                        {showAllProjects && (
                        <div className="glass rounded-xl p-4 sm:p-5 md:p-6 border-white/10 border hover:-translate-y-1 transition-all flex flex-col animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="mb-4">
                                <img 
                                    src={sixDofHeroImage} 
                                    alt="6-DoF Robotic Arm" 
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 md:mb-4"
                                />
                                <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4">6-DoF Robotic Arm</h3>
                            </div>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base text-justify leading-relaxed">
                                A 6-DoF robotic arm mounted on a mobile chassis, controlled via ESP32 and programmed in Arduino. A Unity3D interface enables remote operation using UDP with live video streaming.
                            </p>
                            <div className="mb-4 space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">🤖</span>
                                        <span className="text-sm font-semibold text-blue-400">Robotics</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["ESP32", "Arduino", "Servo Control", "Robotics"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">👁️</span>
                                        <span className="text-sm font-semibold text-blue-400">Computer Vision</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {["OpenCV", "Python", "Unity3D", "Tele-operation"].map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="inline-block bg-blue-500/10 text-blue-500 px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Link
                                    to="/6dof"
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center touch-target min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    View Case Study
                                </Link>
                            </div>  
                        </div>
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

            {/* Modal */}
            {isModalOpen && selectedProject && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={(e) => {
                        // Only close if the overlay itself is clicked, not the modal content
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="bg-blue-900/90 rounded-lg shadow-lg p-8 relative w-4/5 max-w-5xl h-4/5 overflow-y-auto">
                        {/* Close Button */}
                        <button 
                            onClick={closeModal} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
                        >
                            &times;
                        </button>
                        {/* Title */}
                        {selectedProject.title && (
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                {selectedProject.title}
                            </h2>
                        )}
                        {/* Image */}
                        {selectedProject.image && (
                            <div className="w-full h-64 flex items-center justify-center mb-6">
                                <img 
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    className="object-cover rounded-lg max-h-64"
                                />
                            </div>
                        )}
                        {/* Text */}
                        {selectedProject.text && (
                            <p className="text-gray-300 text-lg mb-6">
                                {selectedProject.text}
                            </p>
                        )}
                        {/* Skills */}
                        {selectedProject.skills && selectedProject.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                        {/* Video */}
                        {selectedProject.video && (
                            <div className="flex justify-center items-center mb-6">
                                <iframe 
                                    width="560" 
                                    height="315" 
                                    className="rounded-lg"
                                    src={selectedProject.video} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                />
                            </div>
                        )}
                        {/* Download Button */}
                        {selectedProject.paper && (
                            <div className="mt-6 text-center">
                                <a 
                                    href={selectedProject.paper} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition hover:bg-blue-600"
                                >
                                    Download the Paper Here
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};