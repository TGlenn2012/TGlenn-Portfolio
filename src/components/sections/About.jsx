import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {

    const researchSkills = [
        "User Research",
        "Usability Testing",
        "Surveys",
        "Interviews",
        "Data Analysis",
        "Statistical Analysis",
        "Qualitative Research",
        "Quantitative Research"
    ];

    const designSkills = [
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Prototyping",
        "Wireframing",
        "Interaction Design",
        "User-Centered Design",
        "Adobe Creative Suite",
        "Figma"
    ];

    return (
        <section 
            id="about" /*Create the ID for About*/
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                        About Me
                    </h2>    
                    <div className="glass rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
                        <p className="text-gray-300 mb-6">
                            Multifaceted engineer with a passion for user experience (UX) design and mixed-methods research.
                        </p>
                        
                        {/*BEGINNING OF OVERALL SKILLS SECTION*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/*BEGINNING OF RESEARCH SKILLS SECTION*/}
                            <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Research</h3>
                                <div className="flex flex-wrap gap-2">
                                    {researchSkills.map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/*END OF RESEARCH SKILLS SECTION*/}

                            {/*BEGINNING OF DESIGN SKILLS SECTION*/}
                            <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">Design</h3>
                                <div className="flex flex-wrap gap-2">
                                    {designSkills.map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"> {/*Styling for Skill Pills*/}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/*END OF DESIGN SKILLS SECTION*/}
                        </div>
                        {/*END OF OVERALL SKILLS SECTION*/}
                        
                        {/*BEGINNING OF EDUCATION SECTION*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4"> Education </h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2"> {/*Styling for Education Section, specifically adds y space of 2 between each line*/}
                                    <li>
                                        <strong> Ph.D in Human-Computer Interaction (Mechanical Engineering) </strong> - Purdue University
                                        (2016-2022)
                                    </li>

                                    <li>
                                        <strong> B.S. in Physics </strong> - Morehouse College 
                                        (2012-2016)
                                    </li>

                                    <li>
                                        <strong> Relevant Coursework:</strong> Mechatronics, Design for manufacturability, Robotics and Computer Vision, Qualitative Research Methods.
                                    </li>
                                </ul>
                            </div>
                            {/*END OF EDUCATION SECTION*/}

                            {/*BEGINNING OF PROFESSIONAL EXPERIENCE SECTION*/}
                            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4"> Professional Experience </h3>
                                <div className="space-y-4 text-gray-300">
                                    <div>
                                        <h4 className="font-bold"> Hardware Engineer II, Microsoft Corporation (2022 - present) </h4>
                                        <p className="text-sm"> 
                                            - Collaborated with cross-functional teams to design and develop hardware components for Microsoft devices.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold"> Product Design Consultant, Flare Tech: Laser & Design (2020 - present) </h4>
                                        <p className="text-sm"> 
                                            - Made cool stuff for my friends =P
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold"> Graduate Research Assistant, Purdue University (2016 - 2022) </h4>
                                        <p className="text-sm"> 
                                            - Tortured by a man named Dr. Karthik Ramani, but learned a lot about UX design and research.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold"> Software Engineering Intern, Intel Corporation (Summer 2016) </h4>
                                        <p className="text-sm"> 
                                            - Chilled with the homies and had my first intro to tech!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </RevealOnScroll>
        </section>
    );
}