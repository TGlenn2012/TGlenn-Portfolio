import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const Navbar = ({menuOpen, setMenuOpen}) => {
    const location = useLocation();
    const isCaseStudyPage = location.pathname !== "/";

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-35">
                    {isCaseStudyPage ? (
                        <Link to="/" className="font-mono text-xl font-bold text-white">
                            <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-30 w-30 rounded-full" />
                        </Link>
                    ) : (
                        <a href="#home" className="font-mono text-xl font-bold text-white">
                            <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-30 w-30 rounded-full" />
                        </a>
                    )}

                    <div 
                        className="w-7 h-5 relative cursor-pointer z-40 md:hidden" 
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        &#9776;
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        {isCaseStudyPage ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Home
                                </Link>
                                <a
                                    href="#overview"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Overview
                                </a>
                                <a
                                    href="#problem"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Problem
                                </a>
                                <a
                                    href="#rr"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    R&R
                                </a>
                                <a
                                    href="#process"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Process
                                </a>
                                <a
                                    href="#results"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Results
                                </a>
                                <a
                                    href="#conclusion"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Conclusion
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="#home" 
                                    className="text-gray-300 hover:text-white transition-colors" 
                                >
                                    Home
                                </a>
                                <a
                                    href="#about" 
                                    className="text-gray-300 hover:text-white transition-colors" 
                                >
                                    About
                                </a>
                                <a
                                    href="#projects" 
                                    className="text-gray-300 hover:text-white transition-colors" 
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact" 
                                    className="text-gray-300 hover:text-white transition-colors" 
                                >
                                    Contact
                                </a>
                                <a
                                    href="assets/papers/terrell-resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
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