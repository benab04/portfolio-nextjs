"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import {
    IconChevronDown,
    IconChevronUp,
    IconBriefcase,
    IconFlask,
    IconBrandGithub,
    IconTrophy,
    IconRocket
} from "@tabler/icons-react";

const ProjectsSection = ({ projects }) => {
    // Group projects by category
    const [projectsByCategory, setProjectsByCategory] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [visibleProjects, setVisibleProjects] = useState({});

    // Define category order, colors, and icons
    const categoryOrder = ["Internship", "Research", "Open Source", "Competition", "Self Project"];
    const categoryColors = {
        "Internship": "from-blue-500 to-cyan-500",
        "Research": "from-purple-500 to-pink-500",
        "Open Source": "from-green-500 to-emerald-500",
        "Competition": "from-orange-500 to-amber-500",
        "Self Project": "from-indigo-500 to-violet-500"
    };

    const categoryIcons = {
        "Internship": <IconBriefcase size={28} />,
        "Research": <IconFlask size={28} />,
        "Open Source": <IconBrandGithub size={28} />,
        "Competition": <IconTrophy size={28} />,
        "Self Project": <IconRocket size={28} />
    };

    useEffect(() => {
        if (!projects || projects.length === 0) return;

        // Group projects by category
        const grouped = {};
        categoryOrder.forEach(category => {
            grouped[category] = projects.filter(project => project.category === category && project.show);
        });
        setProjectsByCategory(grouped);

        // Set initial expanded state - Internship category is expanded by default
        const initialExpanded = {};
        categoryOrder.forEach(category => {
            initialExpanded[category] = category === "Internship";
        });
        setExpandedCategories(initialExpanded);

        // Set initial visible projects - show first 2 projects for each category
        const initialVisible = {};
        categoryOrder.forEach(category => {
            initialVisible[category] = 2;
        });
        setVisibleProjects(initialVisible);
    }, [projects]);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const showMoreProjects = (category) => {
        setVisibleProjects(prev => ({
            ...prev,
            [category]: projectsByCategory[category].length
        }));
    };

    return (
        <section id="projects" className="py-20 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-50" />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto relative z-10"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Projects
                </motion.h2>

                <div className="space-y-8">
                    {categoryOrder.map((category, index) => {
                        const categoryProjects = projectsByCategory[category] || [];
                        if (categoryProjects.length === 0) return null;

                        const visibleCount = visibleProjects[category] || 2;
                        const hasMore = categoryProjects.length > visibleCount;

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all shadow-lg"
                            >
                                {/* Category Header */}
                                <div
                                    onClick={() => toggleCategory(category)}
                                    className={`cursor-pointer p-5 flex justify-between items-center bg-gradient-to-r ${categoryColors[category]} bg-opacity-20 hover:bg-opacity-30 transition-all`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-white/10">
                                            {categoryIcons[category]}
                                        </div>
                                        <h3 className="text-2xl font-semibold">{category}</h3>
                                        <span className="ml-2 px-2 py-1 bg-white/10 rounded-full text-sm">
                                            {categoryProjects.length}
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white/10 p-2 rounded-full"
                                    >
                                        {expandedCategories[category] ? (
                                            <IconChevronUp size={20} />
                                        ) : (
                                            <IconChevronDown size={20} />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Projects Grid */}
                                <AnimatePresence>
                                    {expandedCategories[category] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {categoryProjects
                                                        .slice(0, visibleCount)
                                                        .map((project, idx) => (
                                                            <motion.div
                                                                key={project._id || project.title}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                            >
                                                                <ProjectCard project={project} />
                                                            </motion.div>
                                                        ))}
                                                </div>

                                                {/* Show More Button */}
                                                {hasMore && (
                                                    <div className="flex justify-center mt-8">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => showMoreProjects(category)}
                                                            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 transition-all"
                                                        >
                                                            Show More
                                                            <IconChevronDown size={18} />
                                                        </motion.button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default ProjectsSection; 