import { useEffect } from "react";

export const Navbar = ({menuOpen, setMenuOpen}) => {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);
    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-35">
                    <a href="#home" className="font-mono text-xl font-bold text-white">
                        {/* <img src="/assets/images/logo.png" alt="Logo" className="h-30 w-30" /> */}
                        <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-30 w-30 rounded-full" />
                    </a>

                    <div 
                        className="w-7 h-5 relative cursor-pointer z-40 md:hidden" 
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        &#9776;
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <a                                                                              /* Home section of the Nav Bar */
                            href="#home" 
                            className="text-gray-300 hover:text-white transition-colors" 
                        >
                            {" "}
                            Home {" "} 
                        </a>

                        <a                                                                              /* About section of the Nav Bar */
                            href="#about" 
                            className="text-gray-300 hover:text-white transition-colors" 
                        >
                            {" "}
                            About {" "} 
                        </a>

                        <a                                                                            /* Projects section of the Nav Bar */
                            href="#projects" 
                            className="text-gray-300 hover:text-white transition-colors" 
                        >
                            {" "}
                            Projects {" "} 
                        </a>

                        <a                                                                            /* Contact section of the Nav Bar */                          
                            href="#contact" 
                            className="text-gray-300 hover:text-white transition-colors" 
                        >
                            {" "}
                            Contact {" "} 
                        </a>
                        <a                                                                            /* Resume section of the Nav Bar */
                            href={`${import.meta.env.BASE_URL}assets/papers/terrell-resume.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {" "}
                            Resume {" "}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};