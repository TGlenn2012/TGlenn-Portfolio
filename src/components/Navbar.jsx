import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Section mapping for each case study
const caseStudySections = {
    "/storymakar": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "rr", label: "System Design" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/iotmaker": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "rr", label: "System Design" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/sharediot": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "rr", label: "System Design" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/microkarts": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "rr", label: "System Design" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/6dof": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "rr", label: "System Design" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/iotcourse": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "curriculum", label: "Curriculum" },
        { id: "implementation", label: "Implementation" },
        { id: "contributions", label: "Contributions" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ],
    "/familytreeapp": [
        { id: "overview", label: "Overview" },
        { id: "problem", label: "Problem" },
        { id: "process", label: "Process" },
        { id: "results", label: "Results" },
        { id: "conclusion", label: "Conclusion" }
    ]
};

export const Navbar = ({menuOpen, setMenuOpen}) => {
    const location = useLocation();
    const caseStudyRoutes = ["/storymakar", "/iotmaker", "/sharediot", "/microkarts", "/6dof", "/iotcourse", "/familytreeapp"];
    const isCaseStudyPage = caseStudyRoutes.includes(location.pathname);
    const [caseStudyDropdownOpen, setCaseStudyDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    
    const sections = caseStudySections[location.pathname] || [];
    const activeSectionLabel = sections.find(s => s.id === activeSection)?.label || (sections[0]?.label || "");

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    // Scroll spy for case study pages
    useEffect(() => {
        if (!isCaseStudyPage || sections.length === 0) {
            setActiveSection("");
            return;
        }
        
        // Set initial section
        if (sections.length > 0 && !activeSection) {
            setActiveSection(sections[0].id);
        }
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            let current = "";
            
            // Check each section from bottom to top to find the active one
            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (element) {
                    const elementTop = element.offsetTop;
                    if (scrollPosition >= elementTop) {
                        current = sections[i].id;
                        break;
                    }
                }
            }
            
            // If no section found and we're at the top, default to first
            if (!current && sections.length > 0) {
                if (window.scrollY < 100) {
                    current = sections[0].id;
                } else {
                    // Find the section we're closest to
                    let closestSection = sections[0].id;
                    let closestDistance = Infinity;
                    sections.forEach(section => {
                        const element = document.getElementById(section.id);
                        if (element) {
                            const distance = Math.abs(element.offsetTop - scrollPosition);
                            if (distance < closestDistance) {
                                closestDistance = distance;
                                closestSection = section.id;
                            }
                        }
                    });
                    current = closestSection;
                }
            }
            
            setActiveSection(current);
        };
        
        // Initial check with a small delay to ensure DOM is ready
        setTimeout(handleScroll, 100);
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isCaseStudyPage, sections]);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!caseStudyDropdownOpen) return;
        
        const handleClickOutside = (e) => {
            if (!e.target.closest('.case-study-dropdown')) {
                setCaseStudyDropdownOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [caseStudyDropdownOpen]);

    // Handle smooth scroll on section click
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        setCaseStudyDropdownOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed navbar
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        {isCaseStudyPage ? (
                            <Link to="/" className="font-mono text-lg md:text-xl font-bold text-white touch-target min-h-[44px] min-w-[44px] flex items-center">
                                <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                            </Link>
                        ) : location.pathname === "/about" ? (
                            <Link to="/" className="font-mono text-lg md:text-xl font-bold text-white touch-target min-h-[44px] min-w-[44px] flex items-center">
                                <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                            </Link>
                        ) : (
                            <a href="#home" className="font-mono text-lg md:text-xl font-bold text-white touch-target min-h-[44px] min-w-[44px] flex items-center">
                                <img src="https://tglenn2012.github.io/assets/images/Logo.png" alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                            </a>
                        )}

                        {/* Case Study Section Dropdown - Desktop */}
                        {isCaseStudyPage && sections.length > 0 && (
                            <div className="hidden md:block relative case-study-dropdown">
                                <button
                                    onClick={() => setCaseStudyDropdownOpen(!caseStudyDropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors touch-target min-h-[44px]"
                                    aria-label="Case study sections"
                                    aria-expanded={caseStudyDropdownOpen}
                                >
                                    <span className="text-blue-400">{activeSectionLabel}</span>
                                    <svg 
                                        className={`w-4 h-4 transition-transform ${caseStudyDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {caseStudyDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-white/30 rounded-lg shadow-2xl py-2 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}>
                                        {sections.map((section) => (
                                            <a
                                                key={section.id}
                                                href={`#${section.id}`}
                                                onClick={(e) => handleSectionClick(e, section.id)}
                                                className={`block px-4 py-2 text-sm transition-colors touch-target min-h-[44px] flex items-center ${
                                                    activeSection === section.id
                                                        ? "bg-blue-500/40 text-blue-400"
                                                        : "text-gray-100 hover:text-white hover:bg-gray-800"
                                                }`}
                                            >
                                                {section.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Case Study Section Dropdown - Mobile (next to hamburger) */}
                        {isCaseStudyPage && sections.length > 0 && (
                            <div className="md:hidden relative case-study-dropdown">
                                <button
                                    onClick={() => setCaseStudyDropdownOpen(!caseStudyDropdownOpen)}
                                    className="flex items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors touch-target min-h-[44px]"
                                    aria-label="Case study sections"
                                    aria-expanded={caseStudyDropdownOpen}
                                >
                                    <span className="text-blue-400">{activeSectionLabel}</span>
                                    <svg 
                                        className={`w-3 h-3 transition-transform ${caseStudyDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu - Mobile */}
                                {caseStudyDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-40 bg-black border border-white/30 rounded-lg shadow-2xl py-2 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}>
                                        {sections.map((section) => (
                                            <a
                                                key={section.id}
                                                href={`#${section.id}`}
                                                onClick={(e) => handleSectionClick(e, section.id)}
                                                className={`block px-3 py-2 text-xs transition-colors touch-target min-h-[44px] flex items-center ${
                                                    activeSection === section.id
                                                        ? "bg-blue-500/40 text-blue-400"
                                                        : "text-gray-100 hover:text-white hover:bg-gray-800"
                                                }`}
                                            >
                                                {section.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu Button - Mobile */}
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
                    
                    {/* Main Navigation - Desktop */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {isCaseStudyPage || location.pathname === "/about" ? (
                            <Link
                                to="/" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Home
                            </Link>
                        ) : (
                            <a
                                href="#home" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Home
                            </a>
                        )}
                        <Link
                            to="/about" 
                            className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                        >
                            About
                        </Link>
                        {isCaseStudyPage || location.pathname === "/about" ? (
                            <Link
                                to="/#projects" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Projects
                            </Link>
                        ) : (
                            <a
                                href="#projects" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Projects
                            </a>
                        )}
                        {isCaseStudyPage || location.pathname === "/about" ? (
                            <Link
                                to="/#contact" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Contact
                            </Link>
                        ) : (
                            <a
                                href="#contact" 
                                className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center" 
                            >
                                Contact
                            </a>
                        )}
                        <a
                            href="assets/papers/terrell-resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors py-2 px-1 touch-target min-h-[44px] flex items-center"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
