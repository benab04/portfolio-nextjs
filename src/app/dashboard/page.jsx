"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUser, IconBriefcase, IconSchool, IconCode, IconTrophy, IconUsers, IconBook } from "@tabler/icons-react";
import { fetchResume, fetchProjects } from "@/lib/api";
import ResumeEditor from "@/components/dashboard/ResumeEditor";
import ProjectsEditor from "@/components/dashboard/ProjectsEditor";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("resume");
    const [resumeData, setResumeData] = useState(null);
    const [projectsData, setProjectsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [resumeResponse, projectsResponse] = await Promise.all([
                    fetchResume(),
                    fetchProjects()
                ]);

                setResumeData(resumeResponse.resume);
                setProjectsData(projectsResponse.projects);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const tabs = [
        { id: "resume", label: "Resume", icon: IconUser },
        { id: "projects", label: "Projects", icon: IconBriefcase }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                >
                    Dashboard
                </motion.h1>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                                        }`}
                                >
                                    <Icon size={20} className="mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg p-6">
                        {activeTab === "resume" && resumeData && (
                            <ResumeEditor initialData={resumeData} />
                        )}
                        {activeTab === "projects" && projectsData && (
                            <ProjectsEditor initialData={projectsData} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 