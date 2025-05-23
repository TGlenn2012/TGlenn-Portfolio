import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { motion } from "framer-motion";
import { Svg, SVG } from "@svgdotjs/svg.js";
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
    "Maker",
    "Dog Dad",
];

const cardIDs = [
    "defaultScreen",
    "Software-Card",
    "Hardware-Card",
    "Gaming-Card"
]

export const Home = () => {
    const [index, setIndex] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const [cardOpacity, setCardOpacity] = useState(1);
    const [cardTransition, setCardTransition] = useState("opacity-100");

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000); // Change word every 3 seconds

        return () => clearInterval(interval);
    }, []);
    const currentWord = words[index];
    const currentCard = cardIDs[cardIndex];
    const nextCard = cardIDs[(cardIndex + 1) % cardIDs.length];

    return (
        <section 
            id="home" 
            className="min-h-screen w-screen flex items-center justify-center relative"
        >
            <RevealOnScroll>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    {/* Left Column: Text Content */}
                    <div className="text-center z-10 px-4 flex-1 flex-col items-center justify-center relative">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent leading-right">
                            Hi, I'm Terrell Glenn!
                        </h1>    

                        <motion.h2 
                            className="text-2xl md:text-4xl font-semibold mb-4 text-white-200"
                            style={{ overflow: "hidden", whiteSpace: "normal" }}
                            key={index}
                        >
                            I'm a <span className="text-blue-500">{currentWord}</span>
                        </motion.h2>

                        <p className="text-white-400 text-lg mb-8 max-w-2xl mx-auto">
                            {/* Multifaceted engineer with a passion for user experience (UX) design and mixed-methods research. 
                            I possess a comprehensive background in conducting qualitative and quantitative research, project management, 
                            data analysis, product design and development, and working with key cross-functional and multi-disciplinary 
                            stakeholders to execute strategic planning. */}
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a 
                                href="#projects" 
                                className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden 
                                hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                            >
                                View Projects
                            </a>

                            <a 
                                href="#contact" 
                                className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200
                                hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        {/* Render the current card */}
                        <LandingImageSVG className="w-full max-w-xl md:max-w-xl object-cover opacity-100" />

                        {/* Navigation Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                aria-label="Previous Card"
                                onClick={() => {
                                    const currentCard = document.getElementById(cardIDs[cardIndex]);
                                    const nextIndex = (cardIndex - 1 + cardIDs.length) % cardIDs.length;
                                    const nextCard = document.getElementById(cardIDs[nextIndex]);

                                    currentCard.classList.add("opacity-0");
                                    nextCard.classList.remove("opacity-0");
                                    setCardIndex(nextIndex);
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-8 rounded shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                aria-label="Next Card"
                                onClick={() => {
                                    const currentCard = document.getElementById(cardIDs[cardIndex]);
                                    const nextIndex = (cardIndex + 1) % cardIDs.length;
                                    const nextCard = document.getElementById(cardIDs[nextIndex]);

                                    currentCard.classList.add("opacity-0");
                                    nextCard.classList.remove("opacity-0");
                                    setCardIndex(nextIndex);
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};