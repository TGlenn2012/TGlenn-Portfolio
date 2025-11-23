import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const Navbar = ({menuOpen, setMenuOpen}) => {
    const location = useLocation();
    const isCaseStudyPage = location.pathname !== "/";

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {isCaseStudyPage ? (
                        <Link to="/" className="font-mono text-lg md:text-xl font-bold text-white touch-target min-h-[44px] min-w-[44px] flex items-center">
                            <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                        </Link>
                    ) : (
                        <a href="#home" className="font-mono text-lg md:text-xl font-bold text-white touch-target min-h-[44px] min-w-[44px] flex items-center">
                            <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                        </a>
                    )}

                    <button 
                        className="w-11 h-11 relative cursor-pointer md:hidden flex items-center justify-center text-white text-2xl hover:bg-white/10 rounded-lg transition-colors touch-target min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black" 
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <span className="text-3xl">&times;</span>
                        ) : (
                            <span>&#9776;</span>
                        )}
                    </button>
                    
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {isCaseStudyPage ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Home
                                </Link>
                                <a
                                    href="#overview"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Overview
                                </a>
                                <a
                                    href="#problem"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Problem
                                </a>
                                <a
                                    href="#rr"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    R&R
                                </a>
                                <a
                                    href="#process"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Process
                                </a>
                                <a
                                    href="#results"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Results
                                </a>
                                <a
                                    href="#conclusion"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Conclusion
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="#home" 
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                                >
                                    Home
                                </a>
                                <a
                                    href="#about" 
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                                >
                                    About
                                </a>
                                <a
                                    href="#projects" 
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact" 
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                                >
                                    Contact
                                </a>
                                <a
                                    href="assets/papers/terrell-resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                                >
                                    Resume
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};