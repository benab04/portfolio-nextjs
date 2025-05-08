"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconSchool, IconBriefcase, IconTrophy, IconAward, IconUsers, IconCode, IconDeviceDesktop, IconTools, IconStar, IconBook } from "@tabler/icons-react";
import resumeData from "@/data/resume.json";

const ResumeSection = ({ title, icon: Icon, items }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={mounted ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/5 rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <IconCode size={20} className="text-purple-400" />
                        <h3 className="text-lg font-semibold">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.languages.map((skill, index) => (
                            <span key={index} className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={mounted ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/5 rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <IconDeviceDesktop size={20} className="text-purple-400" />
                        <h3 className="text-lg font-semibold">Frameworks</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.frameworks.map((skill, index) => (
                            <span key={index} className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={mounted ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white/5 rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <IconTools size={20} className="text-purple-400" />
                        <h3 className="text-lg font-semibold">Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.tools.map((skill, index) => (
                            <span key={index} className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={mounted ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/5 rounded-lg p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <IconStar size={20} className="text-purple-400" />
                        <h3 className="text-lg font-semibold">Other</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.other.map((skill, index) => (
                            <span key={index} className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

const CourseworkSection = ({ title, icon: Icon, courses }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-400">{course.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default function Resume() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                >
                    Resume
                </motion.h1>

                <ResumeSection title="Education" icon={IconSchool} items={resumeData.education} />
                <ResumeSection title="Experience" icon={IconBriefcase} items={resumeData.experience} />
                <ResumeSection title="Projects" icon={IconAward} items={resumeData.projects} />
                <ResumeSection title="Achievements" icon={IconTrophy} items={resumeData.achievements} />
                <ResumeSection title="Competitions" icon={IconAward} items={resumeData.competitions} />
                <SkillsSection title="Skills" icon={IconCode} skills={resumeData.skills} />
                <ResumeSection title="Extra Curricular Activities" icon={IconUsers} items={resumeData.extracurricular} />
                <CourseworkSection title="Coursework" icon={IconBook} courses={resumeData.coursework} />
            </div>
        </main>
    );
} 