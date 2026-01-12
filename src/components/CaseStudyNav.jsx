import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

export const CaseStudyNav = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("");
    
    const sections = caseStudySections[location.pathname] || [];
    
    // Scroll spy to detect active section
    useEffect(() => {
        if (sections.length === 0) return;
        
        const handleScroll = () => {
            // Account for both main navbar (64-80px) and case study nav (~48px)
            const scrollPosition = window.scrollY + 150;
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
        
        // Initial check
        handleScroll();
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);
    
    // Handle smooth scroll on click
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 140; // Account for fixed navbar + case study nav
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };
    
    if (sections.length === 0) return null;
    
    return (
        <nav className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-[rgba(10, 10, 10, 0.95)] backdrop-blur-lg border-b border-white/10 shadow-md">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide py-3">
                    {/* Desktop: Show all sections horizontally */}
                    <div className="hidden md:flex items-center gap-2 flex-1">
                        {sections.map((section, index) => (
                            <div key={section.id} className="flex items-center">
                                <a
                                    href={`#${section.id}`}
                                    onClick={(e) => handleSectionClick(e, section.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap touch-target min-h-[44px] flex items-center ${
                                        activeSection === section.id
                                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {section.label}
                                </a>
                                {index < sections.length - 1 && (
                                    <span className="text-gray-600 mx-1">•</span>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Mobile: Compact horizontal scroll */}
                    <div className="md:hidden flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => handleSectionClick(e, section.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap touch-target min-h-[44px] flex items-center flex-shrink-0 ${
                                    activeSection === section.id
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {section.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
