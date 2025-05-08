"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Project Image Container */}
            <div className="aspect-video relative bg-gray-800 overflow-hidden">
                {!imageError ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Image not available
                    </div>
                )}

                {/* Brand Logo */}
                {project.brand && (
                    <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                        <Image
                            src={project.brand.logo}
                            alt={project.brand.name}
                            width={40}
                            height={40}
                            className="object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                {/* Project Type Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-black/80 text-white backdrop-blur-sm border border-white/20">
                        {project.type}
                    </span>
                </div>

                {/* Overlay with Project Details */}
                <AnimatePresence>
                    {isHovered && project.details && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm overflow-y-auto"
                        >
                            <div className="p-6 h-full flex flex-col">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="space-y-4 flex-grow"
                                >
                                    {project.details.overview && (
                                        <p className="text-gray-200 text-sm">{project.details.overview}</p>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        {project.details.role && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-purple-400">Role</h4>
                                                <p className="text-gray-300 text-sm">{project.details.role}</p>
                                            </div>
                                        )}

                                        {project.details.duration && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-purple-400">Duration</h4>
                                                <p className="text-gray-300 text-sm">{project.details.duration}</p>
                                            </div>
                                        )}
                                    </div>

                                    {project.details.highlights && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-purple-400 mb-2">Highlights</h4>
                                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                                {project.details.highlights.map((highlight, index) => (
                                                    <li key={index}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Links - Always at bottom */}
                                {(project.links?.deployed || project.links?.source) && (
                                    <div className="flex gap-4 pt-4 mt-auto border-t border-white/10">
                                        {project.links.deployed && (
                                            <a
                                                href={project.links.deployed}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                                            >
                                                <IconExternalLink size={16} />
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                        {project.links.source && (
                                            <a
                                                href={project.links.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                                            >
                                                <IconBrandGithub size={16} />
                                                <span>Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content Below Image */}
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                </h3>

                {/* Description with expandable height */}
                <motion.div
                    className="overflow-hidden"
                    animate={{
                        height: isHovered ? "auto" : "3rem"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-gray-400 mb-4">
                        {project.description}
                    </p>
                </motion.div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 py-1">
                    {project.keywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard; 