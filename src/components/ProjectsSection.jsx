"use client";
import { useState, useEffect } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import ProjectCard from "./ProjectCard";

// Custom SVG icons
const ResearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path>
        <path d="M8.5 2h7"></path>
        <path d="M7 16h10"></path>
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const OpenSourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
);

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
);

const ProjectsSection = ({ projects }) => {
    // Group projects by category
    const [projectsByCategory, setProjectsByCategory] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [visibleProjects, setVisibleProjects] = useState({});
    const [renderedCategories, setRenderedCategories] = useState({});

    // Define category order and more subtle colors
    const categoryOrder = ["Internship", "Research", "Open Source", "Competition", "Self Project"];
    const categoryColors = {
        "Internship": "from-blue-700/30 to-blue-900/30",
        "Research": "from-purple-700/30 to-purple-900/30",
        "Open Source": "from-green-700/30 to-green-900/30",
        "Competition": "from-amber-700/30 to-amber-900/30",
        "Self Project": "from-indigo-700/30 to-indigo-900/30"
    };

    const categoryIcons = {
        "Internship": <BriefcaseIcon />,
        "Research": <ResearchIcon />,
        "Open Source": <OpenSourceIcon />,
        "Competition": <TrophyIcon />,
        "Self Project": <RocketIcon />
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
        const initialRendered = {};
        categoryOrder.forEach(category => {
            initialExpanded[category] = category === "Internship";
            initialRendered[category] = category === "Internship";
        });
        setExpandedCategories(initialExpanded);
        setRenderedCategories(initialRendered);

        // Set initial visible projects - show first 2 projects for each category
        const initialVisible = {};
        categoryOrder.forEach(category => {
            initialVisible[category] = 2;
        });
        setVisibleProjects(initialVisible);
    }, [projects]);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => {
            const newState = {
                ...prev,
                [category]: !prev[category]
            };

            // If expanding, mark as rendered
            if (!prev[category]) {
                setRenderedCategories(prevRendered => ({
                    ...prevRendered,
                    [category]: true
                }));
            }

            return newState;
        });
    };

    const showMoreProjects = (category) => {
        setVisibleProjects(prev => ({
            ...prev,
            [category]: projectsByCategory[category].length
        }));
    };

    return (
        <section id="projects" className="py-16 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 opacity-50" />
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-3xl font-bold text-center mb-10 text-white">
                    Projects
                </h2>

                <div className="space-y-6">
                    {categoryOrder.map((category, index) => {
                        const categoryProjects = projectsByCategory[category] || [];
                        if (categoryProjects.length === 0) return null;

                        const visibleCount = visibleProjects[category] || 2;
                        const hasMore = categoryProjects.length > visibleCount;
                        const isExpanded = expandedCategories[category];
                        const isRendered = renderedCategories[category];

                        return (
                            <div
                                key={category}
                                className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 shadow-md"
                            >
                                {/* Category Header */}
                                <div
                                    onClick={() => toggleCategory(category)}
                                    className={`cursor-pointer p-4 flex justify-between items-center bg-gradient-to-r ${categoryColors[category]} hover:bg-opacity-80 transition-all border-b border-white/10 backdrop-blur-sm`}
                                >
                                    <h3 className="text-xl font-medium flex items-center">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{category}</span>
                                        <span className="ml-3 px-2.5 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm">
                                            {categoryProjects.length}
                                        </span>
                                    </h3>
                                    <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/20 transition-colors">
                                        {isExpanded ? (
                                            <IconChevronUp size={16} />
                                        ) : (
                                            <IconChevronDown size={16} />
                                        )}
                                    </div>
                                </div>

                                {/* Projects Grid */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'}`}
                                >
                                    {isRendered && (
                                        <div className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {categoryProjects
                                                    .slice(0, visibleCount)
                                                    .map((project, idx) => (
                                                        <div key={project._id || project.title} className="h-full">
                                                            <ProjectCard project={project} />
                                                        </div>
                                                    ))}
                                            </div>

                                            {/* Show More Button */}
                                            {hasMore && (
                                                <div className="flex justify-center mt-6">
                                                    <button
                                                        onClick={() => showMoreProjects(category)}
                                                        className="px-4 py-1.5 rounded-md bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-gray-600/50 hover:to-gray-700/50 text-white font-medium flex items-center gap-2 transition-colors border border-white/10"
                                                    >
                                                        Show More
                                                        <IconChevronDown size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection; 