"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for desktop only
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/#projects" },
        { name: "Resume", href: "/resume" },
        { name: "Contact", href: "/#contact" },
        { name: "Blog", href: "https://medium.com/@benabrahambiju", target: "_blank", rel: "noopener noreferrer" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 w-full z-50"
        >
            {/* Desktop Navbar */}
            <motion.div
                className={`
                    w-full transition-all duration-300 ease-in-out
                    ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/"
                                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent transition-all duration-300"
                            >
                                Ben
                            </Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:block">
                            <ul className="flex space-x-6">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                                            target={item.target}
                                            rel={item.rel}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile menu button */}
                        <AnimatePresence>
                            {!mobileMenuOpen && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    type="button"
                                    className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-label="Toggle mobile menu"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <div className="relative w-6 h-5">
                                        <motion.span
                                            className="absolute h-0.5 w-6 bg-current"
                                            animate={{
                                                rotate: mobileMenuOpen ? 45 : 0,
                                                y: mobileMenuOpen ? 10 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.span
                                            className="absolute h-0.5 w-6 bg-current"
                                            style={{ top: "8px" }}
                                            animate={{
                                                opacity: mobileMenuOpen ? 0 : 1,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />
                                        <motion.span
                                            className="absolute h-0.5 w-6 bg-current"
                                            animate={{
                                                rotate: mobileMenuOpen ? -45 : 0,
                                                y: mobileMenuOpen ? -10 : 20,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ top: "64px" }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="fixed right-0 top-0 h-full w-72 bg-black/95 backdrop-blur-md z-40 md:hidden shadow-2xl"
                            style={{ top: "64px" }}
                        >
                            <div className="flex justify-end p-4 border-b border-gray-800">
                                <motion.button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <IconX size={24} className="text-white" />
                                </motion.button>
                            </div>
                            <nav className="h-[calc(100%-4rem)] overflow-y-auto py-6 px-6">
                                <ul className="space-y-6">
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="border-b border-gray-800/50 pb-4"
                                        >
                                            <Link
                                                href={item.href}
                                                className="flex items-center text-lg font-medium text-white hover:text-purple-400 transition-colors duration-200"
                                                onClick={() => setMobileMenuOpen(false)}
                                                target={item.target}
                                                rel={item.rel}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;