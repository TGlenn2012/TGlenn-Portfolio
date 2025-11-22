import { useLocation, Link } from "react-router-dom";

export const MobileMenu = ({menuOpen, setMenuOpen}) => {
    const location = useLocation();
    const isCaseStudyPage = location.pathname !== "/";

    return (
        <div className={`fixed top-0 left-0 w-full bg-[rgba(10, 10, 10, 0.8)] z-40 flex flex-col items-center justify-center
                        transition-all duration-300 ease-in-out

                            ${
                                menuOpen 
                                    ? "h-screen opacity-100 pointer-events-auto" 
                                    : "h-0 opacity-0 pointer-events-none"
                            }
                       `}
        >
            <button 
                onClick={() => setMenuOpen(false)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl focus:outline-none cursor-pointer touch-target min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Close Menu"
            >
                &times;
            </button>

            {isCaseStudyPage ? (
                <>
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Home
                    </Link>
                    <a
                        href="#overview"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Overview
                    </a>
                    <a
                        href="#problem"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Problem
                    </a>
                    <a
                        href="#rr"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        R&R
                    </a>
                    <a
                        href="#process"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Process
                    </a>
                    <a
                        href="#results"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Results
                    </a>
                    <a
                        href="#conclusion"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}
                    >
                        Conclusion
                    </a>
                </>
            ) : (
                <>
                    <a
                        href="#home" 
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `} 
                    >
                        Home 
                    </a>
                    <a
                        href="#about" 
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}             
                    >
                        About 
                    </a>
                    <a
                        href="#projects" 
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}             
                    >
                        Projects 
                    </a>
                    <a
                        href="#contact" 
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}             
                    >
                        Contact
                    </a>
                    <a
                        href="assets/papers/terrell-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                            ${
                                menuOpen 
                                    ? "translate-y-0" 
                                    : "opacity-0 translate-y-5"
                            }
                        `}             
                    >
                        Resume
                    </a>
                </>
            )}
        </div>
    );
};