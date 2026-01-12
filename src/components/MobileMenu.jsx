import { useLocation, Link } from "react-router-dom";

export const MobileMenu = ({menuOpen, setMenuOpen}) => {
    const location = useLocation();
    const caseStudyRoutes = ["/storymakar", "/iotmaker", "/sharediot", "/microkarts", "/6dof", "/iotcourse", "/familytreeapp"];
    const isCaseStudyPage = caseStudyRoutes.includes(location.pathname);

    return (
        <div className={`fixed top-0 left-0 w-full bg-[rgba(0, 0, 0, 0.98)] backdrop-blur-lg z-40 flex flex-col items-center justify-center
                        transition-all duration-300 ease-in-out

                            ${
                                menuOpen 
                                    ? "h-screen opacity-100 pointer-events-auto" 
                                    : "h-0 opacity-0 pointer-events-none"
                            }
                       `}
        >

            {isCaseStudyPage ? (
                location.pathname === "/iotcourse" ? (
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
                            href="#curriculum"
                            onClick={() => setMenuOpen(false)}
                            className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                                ${
                                    menuOpen 
                                        ? "translate-y-0" 
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        >
                            Curriculum
                        </a>
                        <a
                            href="#implementation"
                            onClick={() => setMenuOpen(false)}
                            className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                                ${
                                    menuOpen 
                                        ? "translate-y-0" 
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        >
                            Implementation
                        </a>
                        <a
                            href="#contributions"
                            onClick={() => setMenuOpen(false)}
                            className={`text-xl md:text-2xl font-semibold text-white my-3 md:my-4 px-4 py-3 touch-target min-h-[44px] flex items-center justify-center transform transition-transform duration-300 hover:bg-white/10 rounded-lg
                                ${
                                    menuOpen 
                                        ? "translate-y-0" 
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        >
                            Contributions
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
                            System Design
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
                )
            ) : (
                <>
                    {location.pathname === "/about" ? (
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
                    ) : (
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
                    )}
                    <Link
                        to="/about" 
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
                    </Link>
                    {location.pathname === "/about" ? (
                        <Link
                            to="/#projects" 
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
                        </Link>
                    ) : (
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
                    )}
                    {location.pathname === "/about" ? (
                        <Link
                            to="/#contact" 
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
                        </Link>
                    ) : (
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
                    )}
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