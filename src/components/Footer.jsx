import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const Footer = () => {
    return (
        <footer className="bg-black/50 backdrop-blur-sm text-white py-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            Ben Abraham Biju
                        </h3>
                        <p className="text-gray-400 mt-1">Full Stack Developer & UI/UX Enthusiast</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold mb-2 text-purple-400">Navigation</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/#projects" className="text-gray-400 hover:text-white transition-colors">
                                    Projects
                                </Link>
                                <Link href="/resume" className="text-gray-400 hover:text-white transition-colors">
                                    Resume
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold mb-2 text-purple-400">Contact</h4>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="mailto:benabiju18@gmail.com"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <IconMail size={16} />
                                    <span>benabiju18@gmail.com</span>
                                </a>
                                <a
                                    href="https://github.com/benab04"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconBrandGithub size={16} />
                                    <span>GitHub</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ben-abraham-biju-2038a4244/"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconBrandLinkedin size={16} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} Ben Abraham Biju. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 