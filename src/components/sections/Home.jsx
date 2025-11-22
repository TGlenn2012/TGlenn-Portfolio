import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LandingImageSVG } from "../LandingImageSVG";

const words = [
    "Hardware Engineer",
    "Product Engineer",
    "UX Designer",
    "Researcher",
    "Data Analyst",
    "Project Manager",
    "Public Speaker",
    "Mentor",
    "Vibe Coder",
    "Maker",
    "Dog Dad",
];

const cardIDs = [
    "defaultScreen",
    "Software-Card",
    "Hardware-Card",
    "Gaming-Card",
    "AI-ML-Card"
]

export const Home = () => {
    const [index, setIndex] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);
    const currentWord = words[index];

    return (
        <section 
            id="home" 
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    {/* Left Column: Text Content */}
                    <div className="text-center z-10 px-4 flex-1 flex-col items-center justify-center relative">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent leading-tight">
                            Hi, I'm Terrell Glenn!
                        </h1>    

                        <motion.h2 
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 text-gray-200"
                            style={{ overflow: "hidden", whiteSpace: "normal" }}
                            key={index}
                        >
                            I'm a <span className="text-blue-500">{currentWord}</span>
                        </motion.h2>

                        <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                            {/* Multifaceted engineer with a passion for user experience (UX) design and mixed-methods research. 
                            I possess a comprehensive background in conducting qualitative and quantitative research, project management, 
                            data analysis, product design and development, and working with key cross-functional and multi-disciplinary 
                            stakeholders to execute strategic planning. */}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                            <a 
                                href="#projects" 
                                className="bg-blue-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg font-medium text-base md:text-lg transition relative overflow-hidden touch-target min-h-[44px] flex items-center justify-center
                                hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                            >
                                View Projects
                            </a>

                            <a 
                                href="#contact" 
                                className="border-2 border-blue-500/50 text-blue-500 py-3 md:py-4 px-6 md:px-8 rounded-lg font-medium text-base md:text-lg transition-all duration-200 touch-target min-h-[44px] flex items-center justify-center
                                hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        {/* Render the current card */}
                        <LandingImageSVG activeCard={cardIDs[cardIndex]} className="w-full max-w-xl md:max-w-xl object-cover" />

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 px-4 w-full sm:w-auto">
                            <button
                                className="bg-blue-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base md:text-lg touch-target min-h-[44px] flex items-center justify-center"
                                aria-label="Previous Card"
                                onClick={() => setCardIndex((cardIndex - 1 + cardIDs.length) % cardIDs.length)}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-blue-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base md:text-lg touch-target min-h-[44px] flex items-center justify-center"
                                aria-label="Next Card"
                                onClick={() => setCardIndex((cardIndex + 1) % cardIDs.length)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};