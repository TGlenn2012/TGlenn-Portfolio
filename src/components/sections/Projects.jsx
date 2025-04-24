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
                            {/* Project card #1 MICROKARTS*/}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">MicrokARts</h3>
                                <p className="text-gray-300 mb-4 text-justify">
                                    MicrokARts is an Augmented Reality (AR) application that allows users to create and design and build electro-mechanical karts, program them, and collaborate in a shared AR environment to complete tasks, race against each other, or play games together. The application was developed using the Unity3D game engine and AR Foundation. View the full project to see more details about the project, including the research paper and video demonstration of the application in use.
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Unity3D", "ARCore (Android)", "ARKit (iPhone)", "Blockly", "Javascript", "C#", "Arduino", "SLAM", "UI/UX Design", "Research"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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
                            {/* Project card #2 SHARED IOT*/}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">ShARed IoT</h3>
                                <p className="text-gray-300 mb-4 text-justify">
                                    ShARed IoT is a mobile AR system that wirelessly communicates with custom built electro-mechanical IoT devices. IoT devices are crafted from low-fidelity materials and electronics from our Electronics Repository, and then programmed with our block-based programming tool called IoT Maker. Cloud Anchors enable the sharing and control of AR content across multiple smartphones, and our wireless communication protocol enables control of a users customized ShARed IoT device across those smartphones.

                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Unity3D", "ARCore (Android)", "ARKit (iPhone)", "Blockly", "Javascript", "C#", "Arduino", "SLAM", "UI/UX Design", "Research"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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
                            {/* Project card #3 IOT MAKER*/}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">IoT Maker</h3>
                                <p className="text-gray-300 mb-4">
                                    IoT Maker is a web app that uses live programming to simulate various electronic devices. Users (a) drag-and-drop blocks of code into the programming environment and (b) watch their code execute in real-time on the screen, while interacting with sensors via sliders, buttons, and color pickers. Once the user has a sufficient understanding of the functionality of their code, they can (c) upload the code to our customized iBoard, and (d) connect their phone, tablet, or computer to the iBoard, and control the electronics via WiFi.
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Blockly", "Javascript", "Adobe Illustrator", "Arduino", "Autodesk Eagle", "UI/UX Design", "Research"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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
                            {/* Project card #4 */}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">StoryMakAR</h3>
                                <p className="text-gray-300 mb-4">
                                    StoryMakAR is an AR-IoT system for children that uses block programming, physical prototyping, and event-based storytelling to bring stories to life. StoryMakAR reduces the barriers to entry for youth (Age=14-18) as an accessible, plug-and-play system through which users merge both electro-mechanical devices and virtual characters to create stories.
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Unity3D", "ARCore (Android)", "ARKit (iPhone)", "Blockly", "Javascript", "C#", "Arduino", "SLAM", "UI/UX Design", "Research"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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
                            {/* Project card #5 */}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">6-DoF Robotic Arm</h3>
                                <p className="text-gray-300 mb-4">
                                    The final project involved designing a 6-DoF robotic arm mounted on a car-like chassis. Controlled by an ESP32 microcontroller and programmed using Arduino IDE, the system featured servo motors, wheels, and electronics. A phone mounted on the chassis streamed its camera feed to a host computer via WiFi. A Unity 3D-based control interface sent UDP messages over WiFi to manage the robot's movements. The project was a culmination of the course, showcasing the integration of hardware and software skills acquired throughout the semester.
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Computer Vision", "SIFT/SURF", "Python", "Human-Robot Interaction", "ARCore (Android)", "ARKit (iPhone)", "Arduino", "Unity3D"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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
                            {/* Project card #6 */}
                            <div className="glass rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-bold mb-4">IoT Course Design for High Schoolers</h3>
                                <h4 className="text-gray-400 mb-2">Research Paper (2025)</h4>
                                <p className="text-gray-300 mb-4">
                                Through this research, we aim to utilize the principles of Backward Design and constructionism in designing an IoT curriculum for enrichment programs for high school students, while incorporating electro-mechanical concepts from electronics, programming, connectivity, and design. The curriculum was used to teach IoT concepts to 28 high school students during two enrichment programs. It was found that students with hardly any prior knowledge in IoT could acquire the necessary skills to design and prototype IoT applications.
                                </p>
                                <div classname="flex flex-wrap gap-2 mb-4">
                                    {["Learning Theories", "Backward Design", "TinkerCAD", "Constructionism", "Internet of Things", "Curriculum Design", "Vocational Education", "Arduino"].map((tech, key) => (
                                        <span 
                                            key={key}
                                            className="inline-block bg-blue-500/10 text-blue-500 px-3 rounded-full text-sm hover:bg-blue-500/20 
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