"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "loading", message: "Sending message..." });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: "Message sent successfully!",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Failed to send message. Please try again.",
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 pt-6 pb-2 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                        Your Name
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 pt-6 pb-2 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                        Your Email
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 pt-6 pb-2 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="subject"
                        className="absolute text-sm text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                        Subject (Optional)
                    </label>
                </div>

                <div className="relative">
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 pt-6 pb-2 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="message"
                        className="absolute text-sm text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                        Your Message
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
                >
                    {status.type === "loading" ? "Sending..." : "Send Message"}
                </button>

                {status.message && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center ${status.type === "success"
                            ? "text-green-400"
                            : status.type === "error"
                                ? "text-red-400"
                                : "text-gray-400"
                            }`}
                    >
                        {status.message}
                    </motion.p>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm; 