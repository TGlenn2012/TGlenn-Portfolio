import React, { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import microkartsHeader from "/assets/images/microkarts-header.png";
import sharediotHeader from "/assets/images/sharediot-header.png";
import iotmakerHeader from "/assets/images/iotmaker-header.png";
import storymakarHeader from "/assets/images/storymakar-header.png";
import sixDofHeader from "/assets/images/6dof-header.png"; 
import constructionismHeader from "/assets/images/constructionism-header.jpg"; 

export const Projects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project

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
            video: "https://www.youtube.com/embed/LSWQezcH70U?si=7DhJQalJlBRulNl1",
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
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                        Featured Projects
                    </h2>
                    {/* START GRID FOR PROJECTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project card #1 MICROKARTS */}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">MicrokARts</h3>
                            <p className="text-gray-300 mb-4 text-justify">
                                MicrokARts empowers children to design, build, and program their own IoT-enabled karts using a block-based programming environment. The system encourages creative play and collaboration in a shared AR-IoT environment. Through hands-on activities, youth gain foundational skills in physical computing and interactive technology. The project was evaluated with both graduate experts and youth participants.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Augmented Reality", "IoT", "Blockly", "Javascript", "Adobe Illustrator", "Arduino", "Autodesk Eagle", "UI/UX Design", "Research", "Prototyping", "User Testing", "STEM Education"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4">
                                <button 
                                    onClick={() => openModal("microkarts")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                                </button>
                            </div>
                        </div>
                        {/* Project card #2 SHARED IOT */}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">ShARed IoT</h3>
                            <p className="text-gray-300 mb-4 text-justify">
                                ShARed IoT enables users to interact with custom-built IoT devices through mobile augmented reality, supporting shared experiences across multiple smartphones. The system uses cloud anchors and a wireless protocol for real-time device control and AR content sharing. It lowers barriers for novice makers to create dynamic, networked AR-IoT experiences. Studies with UX experts and users highlight its effectiveness for both beginners and experts.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Augmented Reality", "IoT", "Cloud Anchors", "Electronics", "Programming", "UX Research", "Wireless Communication", "Mobile Development", "Prototyping", "User Study"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4">
                                <button 
                                    onClick={() => openModal("sharediot")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                                </button>
                            </div>
                        </div>
                        {/* Project card #3 IOT MAKER*/}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">IoT Maker</h3>
                            <p className="text-gray-300 mb-4 text-justify">
                                IoT Maker is a web app for live programming and simulation of electronic devices using a drag-and-drop interface. Users can interact with sensors in real time and upload their code to custom hardware for hands-on control. The platform is designed to make advanced electro-mechanical device creation accessible to youth. Evaluation studies show it reduces barriers for novice programmers.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Live Programming", "Web Development", "IoT", "Blockly", "Javascript", "Arduino", "UI/UX Design", "STEM Education", "Simulation", "Electronics", "User Research"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                            <div className="mt-4">
                                <button 
                                    onClick={() => openModal("iotmaker")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                                </button>
                            </div>                        
                        </div>
                        {/* Project card #4 STORYMAKAR*/}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">StoryMakAR</h3>
                            <p className="text-gray-300 mb-4 text-justify">
                                StoryMakAR combines physical prototyping and storytelling through AR, allowing youth to build devices and create interactive stories. The toolkit uses block programming and event-based logic to bring virtual and physical worlds together. Workshops with high school students revealed strong engagement and creativity. The system is designed to lower barriers for maker-based storytelling in educational settings.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Augmented Reality", "Storytelling", "Prototyping", "Blockly", "Unity3D", "C#", "SLAM", "UI/UX Design", "Workshop Facilitation", "Youth Engagement", "Physical Computing"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                            <div className="mt-4">
                                <button 
                                    onClick={() => openModal("storymakar")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                                </button>
                            </div>                        
                        </div>
                        {/* Project card #5 */}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">6-DoF Robotic Arm</h3>
                            <p className="text-gray-300 mb-4 text-justify">
                                This project features a 6-DoF robotic arm mounted on a mobile chassis, controlled via ESP32 and programmed in Arduino. A phone streams live video to a host computer, while a Unity3D interface enables remote operation using UDP. The project integrates computer vision, robotics, and wireless communication. It demonstrates advanced skills in both hardware and software integration.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Robotics", "Computer Vision", "ESP32", "Arduino", "Unity3D", "Wireless Communication", "Python", "Human-Robot Interaction", "UDP Networking", "Embedded Systems", "Mobile Streaming"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                            <div className="mt-4">
                            <button 
                                    onClick={() => openModal("sixdofroboticarm")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                            </button>
                        </div>  
                        </div>
                        {/* Project card #6 */}
                        <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">IoT Course Design for High Schoolers</h3>
                            <h4 className="text-gray-400 mb-2">Research Paper (2025)</h4>
                            <p className="text-gray-300 mb-4 text-justify">
                                This project developed and implemented an IoT curriculum for high school enrichment programs using backward design and constructionist principles. Students learned electronics, programming, connectivity, and design through hands-on modules. The curriculum enabled students with little prior experience to successfully prototype IoT applications. Results show significant skill development and engagement.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Curriculum Design", "IoT", "Constructionism", "Backward Design", "TinkerCAD", "Vocational Education", "Arduino", "STEM Education", "Instructional Design", "Workshop Facilitation", "Learning Assessment"].map((tech, key) => (
                                    <span 
                                        key={key}
                                        className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                            <div className="mt-4">
                                <button 
                                    onClick={() => openModal("iotconstructionism")} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View Project →
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Modal */}
            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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