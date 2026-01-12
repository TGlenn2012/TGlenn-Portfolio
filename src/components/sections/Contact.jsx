import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const serviceID = import.meta.env.VITE_serviceID;
        const templateID = import.meta.env.VITE_templateID;
        const publicKey = import.meta.env.VITE_publicKey;

        // Validate environment variables
        if (!serviceID || !templateID || !publicKey) {
            console.error("EmailJS configuration missing:", {
                serviceID: !!serviceID,
                templateID: !!templateID,
                publicKey: !!publicKey
            });
            alert("Contact form is not properly configured. Please contact the site administrator.");
            return;
        }

        emailjs
            .sendForm(serviceID, templateID, form, publicKey)
            .then(() => {
                alert("Message sent successfully!");
                form.reset();
                setFormData({ name: "", email: "", message: "" }); // Reset form data
            })
            .catch((err) => {
                console.error("Failed to send message:", err);
                alert("Failed to send message. Please try again.");
            });
    }

    return ( 
        <section 
            id="contact" 
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center"> 
                        Get in Touch!
                    </h2>
                    <div className="glass rounded-xl p-4 sm:p-6 md:p-8 border-white/10 border w-full">
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                className="glass w-full py-3 md:py-4 px-4 text-base md:text-lg text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                className="glass w-full py-3 md:py-4 px-4 text-base md:text-lg text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="johndoe@gmail.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                className="glass w-full py-3 md:py-4 px-4 text-base md:text-lg text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-y"
                                placeholder="Write your message here..."
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="glass w-full bg-blue-500 text-white py-3 md:py-4 px-6 rounded-lg font-medium text-base md:text-lg transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] touch-target min-h-[44px]">
                            Send Message
                        </button>
                    </form>
                    
                    {/* Social Links */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-center text-gray-400 text-sm mb-4">Connect with me on</p>
                        <div className="flex justify-center items-center gap-6">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/tglenn2012"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] touch-target"
                                aria-label="LinkedIn Profile"
                            >
                                <svg 
                                    className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            
                            {/* GitHub */}
                            <a
                                href="https://www.github.com/tglenn2012"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] touch-target"
                                aria-label="GitHub Profile"
                            >
                                <svg 
                                    className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    )
};