"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconSchool, IconBriefcase, IconTrophy, IconAward, IconUsers, IconCode, IconDeviceDesktop, IconTools, IconStar, IconBook } from "@tabler/icons-react";
import { fetchResume } from "@/lib/api";

const ResumeSection = ({ title, icon: Icon, items }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <Icon size={24} className="text-purple-400" />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={mounted ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-6"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <span className="text-sm text-gray-400">{item.period}</span>
                        </div>
                        {item.subtitle && (
                            <p className="text-purple-400 mb-2">{item.subtitle}</p>
                        )}
                        <p className="text-gray-400">{item.description}</p>
                        {item.details && (
                            <ul className="list-disc list-inside mt-2 text-gray-400">
                                {item.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

const SkillsSection = ({ title, icon: Icon, skills }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!skills) {
        return null;
    }

    // Check if skills is an object with categories or an array of category objects
    const isObjectFormat = !Array.isArray(skills);

    // If it's in object format, convert it to array format for rendering
    const skillCategories = isObjectFormat
        ? Object.entries(skills).map(([category, items]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            items
        }))
        : skills;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <Icon size={24} className="text-purple-400" />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((skillCategory, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={mounted ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="bg-white/5 rounded-lg p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <IconStar size={20} className="text-purple-400" />
                            <h3 className="text-lg font-semibold">{skillCategory.category}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skillCategory.items.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

const CourseworkSection = ({ title, icon: Icon, courses }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!courses || courses.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
        >
            <div className="flex items-center gap-3 mb-6">
                <Icon size={24} className="text-purple-400" />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={mounted ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-6"
                    >
                        <h3 className="text-lg font-semibold mb-2">{course.title || course.name}</h3>
                        <p className="text-gray-400">{course.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default function Resume() {
    const [mounted, setMounted] = useState(false);
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);

        // Fetch resume data from the API
        const loadResume = async () => {
            try {
                const data = await fetchResume();
                setResumeData(data.resume);
                console.log("Fetched resume data:", data.resume);
            } catch (error) {
                console.error('Error loading resume:', error);
            } finally {
                setLoading(false);
            }
        };

        loadResume();
    }, []);

    if (loading || !resumeData) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                >
                    Resume
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-left mb-12"
                >
                    <a
                        href="https://drive.google.com/file/d/147TzXMZSqsRa9d_QVlyzXJO51S0MEApf/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-purple-500 hover:bg-purple-600 transition-colors duration-200 rounded-lg text-white font-semibold flex items-center gap-2"
                    >
                        View PDF
                    </a>
                </motion.div>

                <ResumeSection title="Education" icon={IconSchool} items={resumeData.education} />
                <ResumeSection title="Experience" icon={IconBriefcase} items={resumeData.experience} />
                {resumeData.projects && <ResumeSection title="Projects" icon={IconAward} items={resumeData.projects} />}
                <ResumeSection title="Achievements" icon={IconTrophy} items={resumeData.achievements} />
                <SkillsSection title="Skills" icon={IconCode} skills={resumeData.skills} />
                <ResumeSection title="Extra Curricular Activities" icon={IconUsers} items={resumeData.extracurricular} />
                <CourseworkSection title="Coursework" icon={IconBook} courses={resumeData.coursework} />
            </div>
        </main>
    );
} 