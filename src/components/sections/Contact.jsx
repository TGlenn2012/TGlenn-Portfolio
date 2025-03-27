import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // const serviceID = "service_8s99nvi"; // Replace with your EmailJS service ID
    // const templateID = "template_b6wq7ak"; // Replace with your EmailJS template ID
    // const publicKey = "kDck-ANTTDIqta-0o"; // Replace with your EmailJS public key
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;


        emailjs
            .sendForm(
                import.meta.env.VITE_serviceID, 
                import.meta.env.VITE_templateID, 
                form, 
                import.meta.env.VITE_publicKey
            )
            .then((result) => {
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
                <div className="px-4 w-150">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent text-center"> 
                        Get in Touch!
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                className="glass w-full py-3 px-4 text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                                className="glass w-full py-3 px-4 text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                                className="glass w-full py-3 px-4 text-white border border-gray-700 rounded-lg transition focus:outline-none focus:border-blue-500 hover:bg-blue-500/5 hover:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your message here..."
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="glass w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                            Send Message
                        </button>
                    </form>
                </div>
            </RevealOnScroll>
        </section>
    )
};