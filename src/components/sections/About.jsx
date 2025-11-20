import { RevealOnScroll } from "../RevealOnScroll";
import headshot from "/assets/images/Terrell-Headshot.png";
import purdueLogo from "/assets/images/Purdue_Boilermakers_logo.svg";
import morehouseLogo from "/assets/images/Morehouse_college_seal.svg";

export const About = () => {

    const researchSkills = [
        "User Research",
        "Usability Testing",
        "Mixed-Methods Research",
        "Contextual Inquiry",
        "Statistical Analysis",
        "A/B Testing"
    ];

    const designSkills = [
        "UX Design",
        "UI Design",
        "Data-driven Design",
        "Rapid Prototyping",
        "Design Systems",
        "User-Centered Design"
    ];

    const technicalSkills = [
        "Figma",
        "SolidWorks",
        "Autodesk Suite",
        "Sketch",
        "Principle"
    ];

    const programmingSkills = [
        "Python",
        "R",
        "C#",
        "C",
        "C++",
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Unity3D",
        "MATLAB"
    ];

    const aiMlSkills = [
        "Artificial Intelligence (AI)",
        "OpenCV",
        "Pytorch",
        "SIFT/SURF",
        "Cursor AI",
        "GitHub Copilot"
    ];

    const projectManagementSkills = [
        "Project Management",
        "Notion",
        "Stakeholder Advocacy",
        "Jira",
        "Agile Methodologies",
        "Miro"
    ];

    return (
        <section 
            id="about"
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center">
                        About Me
                    </h2>    
                    <div className="glass rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
                        {/* Headshot and Intro Section */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                            <div className="flex-shrink-0">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-r from-orange-500 to-sky-600">
                                    <img 
                                        src={headshot} 
                                        alt="Terrell Glenn" 
                                        className="w-full h-full rounded-full object-cover"
                                        style={{ objectPosition: 'center 20%' }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-lg">
                                    Technical leader with a Ph.D. in Human-Computer Interaction, and notable work at Microsoft. Skilled in hardware engineering, product design, UX research, and product management, with proven leadership in developing technology roadmaps and collaborating across teams. Experienced in driving data-based decisions, evaluating AI solutions, and enhancing user experiences. Recognized for impactful projects that improved satisfaction through rapid prototyping and design iteration. Committed to using engineering and design expertise for innovation and effective product team leadership.
                                </p>
                            </div>
                        </div>

                        {/* Notable Metrics Section */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Notable Metrics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">📚</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        100+
                                    </div>
                                    <div className="text-sm text-gray-400">Research Citations</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">📄</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        6+
                                    </div>
                                    <div className="text-sm text-gray-400">Publications</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">👥</div>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-400">STEAM Workshop Participants</div>
                                </div>
                                <div className="glass rounded-xl p-6 border-white/10 border text-center hover:-translate-y-1 transition-all">
                                    <div className="text-4xl mb-2">🎓</div>
                                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-sky-600 bg-clip-text text-transparent mb-2">
                                        Ph.D.
                                    </div>
                                    <div className="text-sm text-gray-400">in HCI</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Skills Section with Enhanced Visualization */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Research Skills Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">🔬</span>
                                        <h3 className="text-xl font-bold">Research</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {researchSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Design Skills Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">🎨</span>
                                        <h3 className="text-xl font-bold">Design</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {designSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Technical Skills Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">🛠️</span>
                                        <h3 className="text-xl font-bold">Technical Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {technicalSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Programming Languages Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">💻</span>
                                        <h3 className="text-xl font-bold">Programming Languages</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {programmingSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* AI/ML Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">🤖</span>
                                        <h3 className="text-xl font-bold">AI/ML</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {aiMlSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Management Section */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl">📊</span>
                                        <h3 className="text-xl font-bold">Project Management</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {projectManagementSkills.map((tech, key) => (
                                            <span 
                                                key={key}
                                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                            hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Education Section - Individual Cards */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Education</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Purdue Doctorate Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                    <div className="flex justify-center mb-4">
                                        <img 
                                            src={purdueLogo} 
                                            alt="Purdue University" 
                                            className="h-28 w-auto object-contain"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Doctorate</h4>
                                    <p className="text-gray-300 text-sm mb-2">Human-Computer Interaction</p>
                                    <p className="text-gray-400 text-xs">(Mechanical Engineering)</p>
                                </div>

                                {/* Morehouse Bachelor Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all text-center">
                                    <div className="flex justify-center mb-4">
                                        <img 
                                            src={morehouseLogo} 
                                            alt="Morehouse College" 
                                            className="h-28 w-auto object-contain"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Bachelor of Science</h4>
                                    <p className="text-gray-300 text-sm mb-2">Physics</p>
                                </div>

                                {/* Certifications Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <h4 className="text-lg font-bold mb-4 text-center">Certifications</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h5 className="font-semibold text-blue-400 mb-1">Google UX Design Professional Certificate</h5>
                                                <p className="text-gray-300 text-xs mb-2">
                                                    Industry recognized, 200+ hour program covering the full UX design process. Completed October 2025.
                                                </p>
                                                <a 
                                                    href="https://coursera.org/share/39a90bb26e004de67de5a57a081c8ead"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1 rounded text-xs transition"
                                                >
                                                    View Certificate →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Experience Section - Individual Cards */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Professional Experience</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Microsoft Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold">Hardware Engineer & Technical Product Manager</h4>
                                            <p className="text-gray-400 text-sm">Microsoft Corporation</p>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                            May 2022 - Aug 2025
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">
                                        Led mixed-methods research with internal and partner stakeholders, combining contextual inquiry, semi-structured interviews, and unmoderated usability studies to extract actionable customer insights and inform roadmap strategy for AI-powered infrastructure management tools.
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Hardware Strategy & Planning Culture Award (2023)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">BAM Minority Student Day Volunteer Speaker (2023-2025)</span>
                                    </div>
                                </div>

                                {/* Flare Tech Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold">Product Design Consultant</h4>
                                            <p className="text-gray-400 text-sm">Flare Tech: Laser & Design LLC</p>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                            Jan 2020 - Present
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">
                                        Designed and developed custom, hand-crafted items by integrating product design principles with rapid prototyping techniques. Co-developed custom laser-cut products through iterative A/B testing, achieving a 95% engagement uplift and a 5-star Etsy rating.
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">100% Satisfaction Rate</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">5-Star Etsy Rating</span>
                                    </div>
                                </div>

                                {/* Purdue Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold">Graduate Research Assistant</h4>
                                            <p className="text-gray-400 text-sm">Purdue University (Convergence Design Lab)</p>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                            Aug 2016 - Jun 2022
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">
                                        Executed qualitative and quantitative UX research on AR and IoT technologies, focusing on user interaction design for 150+ youth aged 12-18. Designed and prototyped interactive AR onboarding flows, improving comprehension by 25% in user studies.
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Outstanding Graduate Student Service Award (2020)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">NSF Graduate Research Fellowship Program (2017 - 2022)</span>
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Graduate Education for Minorities (GEM) Fellowship</span>
                                    </div>
                                </div>

                                {/* Intel Card */}
                                <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold">Software Engineering Intern</h4>
                                            <p className="text-gray-400 text-sm">Intel Corporation (Performance Analysis Center)</p>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                                            Jun 2016 - Aug 2016
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">
                                        Benchmarked 40+ workloads across Adobe, Autodesk, Microsoft, Apple, Google, and coding environments on 12 custom system configurations for major OEM customers. Used Intel simulation tools and RStudio (R) to analyze CPU/GPU performance metrics.
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">$2M+ Revenue Impact</span>
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
