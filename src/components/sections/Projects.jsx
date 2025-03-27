import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
    
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
                            {/* Project card #1 */}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Project 1</h3>
                                <p className="text-gray-300 mb-4">
                                    Description of project 1. This project focuses on...
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["React", "Tailwind CSS", "JavaScript"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Project →</a> {/* TODO: BUILD PAGE FOR EACH PROJECT AND ADD URL INTO HREF */}
                                </div>
                            </div>
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Project 2</h3>
                                <p className="text-gray-300 mb-4">
                                    Description of project 2. This project focuses on...
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["React", "Tailwind CSS", "JavaScript"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Project →</a> {/* TODO: BUILD PAGE FOR EACH PROJECT AND ADD URL INTO HREF */}
                                </div>                        </div>
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Project 3</h3>
                                <p className="text-gray-300 mb-4">
                                    Description of project 3. This project focuses on...
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["React", "Tailwind CSS", "JavaScript"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Project →</a> {/* TODO: BUILD PAGE FOR EACH PROJECT AND ADD URL INTO HREF */}
                                </div>                        </div>
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Project 4</h3>
                                <p className="text-gray-300 mb-4">
                                    Description of project 4. This project focuses on...
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["React", "Tailwind CSS", "JavaScript"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {/* HYPERLINK TO VIEW PROJECT AND HOVER ANIMATION */}
                                <div className="mt-4">
                                    <a href="#" className="text-blue-500 hover:underline">View Project →</a> {/* TODO: BUILD PAGE FOR EACH PROJECT AND ADD URL INTO HREF */}
                                </div>                        
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
                {/* END GRID FOR PROJECTS */}
        </section>
    );
};