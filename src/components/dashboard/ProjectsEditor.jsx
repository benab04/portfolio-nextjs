"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconDeviceFloppy, IconPlus, IconTrash, IconEdit, IconX } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

export default function ProjectsEditor({ initialData }) {
    const [projects, setProjects] = useState(initialData || []);
    const [editingProject, setEditingProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        // Prompt for secret key
        const secretKey = prompt("Please enter the dashboard secret key:");

        if (!secretKey) {
            toast.error("Secret key is required");
            return;
        }

        try {
            const response = await fetch("/api/projects", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projects,
                    secretKey
                }),
            });

            if (response.ok) {
                toast.success("Projects updated successfully!");
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to update projects");
            }
        } catch (error) {
            console.error("Error updating projects:", error);
            toast.error("An error occurred while updating");
        }
    };

    const handleAddProject = () => {
        const newProject = {
            title: "",
            description: "",
            image: "",
            keywords: [],
            type: "",
            category: "Self Project",
            brand: null,
            details: {
                overview: "",
                role: "",
                duration: "",
                technologies: [],
                highlights: []
            },
            links: {
                deployed: "",
                source: ""
            },
            show: true
        };

        setProjects([...projects, newProject]);
        setEditingProject(newProject);
        setIsEditing(true);
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setIsEditing(true);
    };

    const handleDeleteProject = (projectToDelete) => {
        const updatedProjects = projects.filter(project => project !== projectToDelete);
        setProjects(updatedProjects);

        if (editingProject === projectToDelete) {
            setEditingProject(null);
            setIsEditing(false);
        }
    };

    const handleUpdateProject = (updatedProject) => {
        const updatedProjects = projects.map(project =>
            project === editingProject ? updatedProject : project
        );

        setProjects(updatedProjects);
        setEditingProject(null);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects Editor</h2>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center"
                >
                    <IconDeviceFloppy size={20} className="mr-2" />
                    Save All Changes
                </button>
            </div>

            {isEditing ? (
                <ProjectEditor
                    project={editingProject}
                    onSave={handleUpdateProject}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleAddProject}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                        >
                            <IconPlus size={18} className="mr-1" />
                            Add Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium">{project.title || "Untitled Project"}</h3>
                                        <div className="flex gap-2 mt-1">
                                            {project.type && <p className="text-sm text-purple-400">{project.type}</p>}
                                            {project.category && (
                                                <p className="text-sm text-blue-400">{project.category}</p>
                                            )}
                                        </div>
                                        {project.description && (
                                            <p className="mt-2 text-gray-300 line-clamp-2">{project.description}</p>
                                        )}
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {project.tags.map((tag, i) => (
                                                    <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {project.featured && (
                                            <div className="mt-2">
                                                <span className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded">
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditProject(project)}
                                            className="p-1 text-blue-400 hover:text-blue-300"
                                        >
                                            <IconEdit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project)}
                                            className="p-1 text-red-400 hover:text-red-300"
                                        >
                                            <IconTrash size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function ProjectEditor({ project, onSave, onCancel }) {
    const [formData, setFormData] = useState({ ...project });
    const [newTag, setNewTag] = useState("");

    // Available categories
    const categories = ["Internship", "Research", "Open Source", "Competition", "Self Project"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddTag = () => {
        if (!newTag.trim()) return;

        setFormData({
            ...formData,
            tags: [...(formData.tags || []), newTag],
        });

        setNewTag("");
    };

    const handleRemoveTag = (index) => {
        const updatedTags = [...formData.tags];
        updatedTags.splice(index, 1);

        setFormData({
            ...formData,
            tags: updatedTags,
        });
    };

    return (
        <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
                {project.title ? `Edit: ${project.title}` : "Add New Project"}
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image || ""}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type || ""}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category || "Self Project"}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Source Code URL</label>
                        <input
                            type="text"
                            name="source_code"
                            value={formData.source_code || ""}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Demo URL</label>
                        <input
                            type="text"
                            name="demo"
                            value={formData.demo || ""}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm">
                            Featured Project
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-1 bg-gray-800 text-white rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Add tag..."
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                        />
                        <button
                            onClick={handleAddTag}
                            className="bg-blue-600 hover:bg-blue-700 rounded-r-md px-3 py-2"
                        >
                            <IconPlus size={20} />
                        </button>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.tags?.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-full px-3 py-1 flex items-center"
                            >
                                <span className="mr-2">{tag}</span>
                                <button
                                    onClick={() => handleRemoveTag(index)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <IconX size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md flex items-center"
                >
                    <IconX size={20} className="mr-2" />
                    Cancel
                </button>
                <button
                    onClick={() => onSave(formData)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center"
                >
                    <IconDeviceFloppy size={20} className="mr-2" />
                    Save
                </button>
            </div>
        </div>
    );
} 