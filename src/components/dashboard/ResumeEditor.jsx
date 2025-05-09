"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconSchool, IconBriefcase, IconTrophy, IconUsers, IconCode, IconBook, IconPlus, IconTrash, IconEdit, IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

export default function ResumeEditor({ initialData }) {
    const [resumeData, setResumeData] = useState(initialData);
    const [activeSection, setActiveSection] = useState("education");
    const [editingItem, setEditingItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const sections = [
        { id: "education", label: "Education", icon: IconSchool },
        { id: "experience", label: "Experience", icon: IconBriefcase },
        { id: "projects", label: "Projects", icon: IconTrophy },
        { id: "achievements", label: "Achievements", icon: IconTrophy },
        { id: "skills", label: "Skills", icon: IconCode },
        { id: "extracurricular", label: "Extracurricular", icon: IconUsers },
        { id: "coursework", label: "Coursework", icon: IconBook }
    ];

    const handleSave = async () => {
        // Prompt for secret key
        const secretKey = prompt("Please enter the dashboard secret key:");

        if (!secretKey) {
            toast.error("Secret key is required");
            return;
        }

        try {
            const response = await fetch("/api/resume", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...resumeData,
                    secretKey
                }),
            });

            if (response.ok) {
                toast.success("Resume updated successfully!");
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to update resume");
            }
        } catch (error) {
            console.error("Error updating resume:", error);
            toast.error("An error occurred while updating");
        }
    };

    const handleAddItem = () => {
        if (activeSection === "skills") {
            // Handle skills separately as it has a different structure
            return;
        }

        const newItem = createEmptyItem(activeSection);
        const updatedData = {
            ...resumeData,
            [activeSection]: [...(resumeData[activeSection] || []), newItem],
        };

        setResumeData(updatedData);
        setEditingItem(newItem);
        setIsEditing(true);
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    const handleDeleteItem = (itemToDelete) => {
        const updatedItems = resumeData[activeSection].filter(item => item !== itemToDelete);
        setResumeData({
            ...resumeData,
            [activeSection]: updatedItems,
        });

        if (editingItem === itemToDelete) {
            setEditingItem(null);
            setIsEditing(false);
        }
    };

    const handleUpdateItem = (updatedItem) => {
        const updatedItems = resumeData[activeSection].map(item =>
            item === editingItem ? updatedItem : item
        );

        setResumeData({
            ...resumeData,
            [activeSection]: updatedItems,
        });

        setEditingItem(null);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setIsEditing(false);
    };

    const createEmptyItem = (section) => {
        switch (section) {
            case "education":
            case "experience":
                return {
                    title: "",
                    subtitle: "",
                    period: "",
                    description: "",
                    details: []
                };
            case "projects":
                return {
                    title: "",
                    period: "",
                    description: "",
                    details: []
                };
            case "achievements":
                return {
                    title: "",
                    period: "",
                    description: ""
                };
            case "extracurricular":
                return {
                    title: "",
                    period: "",
                    description: "",
                    details: []
                };
            case "coursework":
                return {
                    title: "",
                    description: ""
                };
            default:
                return {};
        }
    };

    const renderEditor = () => {
        if (!isEditing || !editingItem) return null;

        switch (activeSection) {
            case "education":
            case "experience":
                return (
                    <ItemEditor
                        item={editingItem}
                        onSave={handleUpdateItem}
                        onCancel={handleCancelEdit}
                        fields={[
                            { name: "title", label: "Title", type: "text" },
                            { name: "subtitle", label: "Subtitle", type: "text" },
                            { name: "period", label: "Period", type: "text" },
                            { name: "description", label: "Description", type: "text" },
                            { name: "details", label: "Details", type: "array" }
                        ]}
                    />
                );
            case "projects":
                return (
                    <ItemEditor
                        item={editingItem}
                        onSave={handleUpdateItem}
                        onCancel={handleCancelEdit}
                        fields={[
                            { name: "title", label: "Title", type: "text" },
                            { name: "period", label: "Period", type: "text" },
                            { name: "description", label: "Description", type: "text" },
                            { name: "details", label: "Details", type: "array" }
                        ]}
                    />
                );
            case "achievements":
                return (
                    <ItemEditor
                        item={editingItem}
                        onSave={handleUpdateItem}
                        onCancel={handleCancelEdit}
                        fields={[
                            { name: "title", label: "Title", type: "text" },
                            { name: "period", label: "Period", type: "text" },
                            { name: "description", label: "Description", type: "text" }
                        ]}
                    />
                );
            case "extracurricular":
                return (
                    <ItemEditor
                        item={editingItem}
                        onSave={handleUpdateItem}
                        onCancel={handleCancelEdit}
                        fields={[
                            { name: "title", label: "Title", type: "text" },
                            { name: "period", label: "Period", type: "text" },
                            { name: "description", label: "Description", type: "text" },
                            { name: "details", label: "Details", type: "array" }
                        ]}
                    />
                );
            case "coursework":
                return (
                    <ItemEditor
                        item={editingItem}
                        onSave={handleUpdateItem}
                        onCancel={handleCancelEdit}
                        fields={[
                            { name: "title", label: "Title", type: "text" },
                            { name: "description", label: "Description", type: "text" }
                        ]}
                    />
                );
            default:
                return null;
        }
    };

    const renderSkillsEditor = () => {
        if (activeSection !== "skills") return null;

        return (
            <SkillsEditor
                skills={resumeData.skills}
                onSave={(updatedSkills) => {
                    setResumeData({
                        ...resumeData,
                        skills: updatedSkills
                    });
                }}
            />
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Resume Editor</h2>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center"
                >
                    <IconDeviceFloppy size={20} className="mr-2" />
                    Save All Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Sections</h3>
                    <div className="space-y-2">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setEditingItem(null);
                                        setIsEditing(false);
                                    }}
                                    className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${activeSection === section.id
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-300 hover:bg-gray-600"
                                        }`}
                                >
                                    <Icon size={18} className="mr-2" />
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold capitalize">
                            {sections.find(s => s.id === activeSection)?.label || activeSection}
                        </h3>
                        {activeSection !== "skills" && (
                            <button
                                onClick={handleAddItem}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                            >
                                <IconPlus size={18} className="mr-1" />
                                Add Item
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        renderEditor()
                    ) : activeSection === "skills" ? (
                        renderSkillsEditor()
                    ) : (
                        <div className="space-y-4">
                            {resumeData[activeSection]?.map((item, index) => (
                                <div key={index} className="bg-gray-800 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-medium">{item.title}</h4>
                                            {item.subtitle && <p className="text-purple-400">{item.subtitle}</p>}
                                            {item.period && <p className="text-gray-400">{item.period}</p>}
                                            {item.description && <p className="mt-2">{item.description}</p>}
                                            {item.details && item.details.length > 0 && (
                                                <ul className="mt-2 list-disc list-inside">
                                                    {item.details.map((detail, i) => (
                                                        <li key={i} className="text-gray-300">{detail}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditItem(item)}
                                                className="p-1 text-blue-400 hover:text-blue-300"
                                            >
                                                <IconEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item)}
                                                className="p-1 text-red-400 hover:text-red-300"
                                            >
                                                <IconTrash size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ItemEditor({ item, onSave, onCancel, fields }) {
    const [formData, setFormData] = useState({ ...item });
    const [newDetail, setNewDetail] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddDetail = () => {
        if (!newDetail.trim()) return;

        setFormData({
            ...formData,
            details: [...(formData.details || []), newDetail],
        });

        setNewDetail("");
    };

    const handleRemoveDetail = (index) => {
        const updatedDetails = [...formData.details];
        updatedDetails.splice(index, 1);

        setFormData({
            ...formData,
            details: updatedDetails,
        });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
                {item.title ? `Edit: ${item.title}` : "Add New Item"}
            </h3>

            <div className="space-y-4">
                {fields.map((field) => {
                    if (field.type === "array") {
                        return (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm font-medium">{field.label}</label>

                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newDetail}
                                        onChange={(e) => setNewDetail(e.target.value)}
                                        className="flex-1 bg-gray-700 text-white rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder={`Add ${field.label} item...`}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleAddDetail();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={handleAddDetail}
                                        className="bg-blue-600 hover:bg-blue-700 rounded-r-md px-3 py-2"
                                    >
                                        <IconPlus size={20} />
                                    </button>
                                </div>

                                <div className="mt-2 space-y-2">
                                    {formData[field.name]?.map((detail, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-700 rounded-md px-3 py-2">
                                            <span>{detail}</span>
                                            <button
                                                onClick={() => handleRemoveDetail(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={field.name}>
                            <label className="block text-sm font-medium mb-1">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className="w-full bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    );
                })}
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

function SkillsEditor({ skills, onSave }) {
    const [skillsData, setSkillsData] = useState(skills || {
        languages: [],
        frameworks: [],
        libraries: [],
        tools: [],
        other: []
    });
    const [activeCategory, setActiveCategory] = useState("languages");
    const [newSkill, setNewSkill] = useState("");

    const categories = [
        { id: "languages", label: "Languages" },
        { id: "frameworks", label: "Frameworks" },
        { id: "libraries", label: "Libraries" },
        { id: "tools", label: "Tools" },
        { id: "other", label: "Other" }
    ];

    const handleAddSkill = () => {
        if (!newSkill.trim()) return;

        setSkillsData({
            ...skillsData,
            [activeCategory]: [...(skillsData[activeCategory] || []), newSkill],
        });

        setNewSkill("");
    };

    const handleRemoveSkill = (category, index) => {
        const updatedSkills = [...skillsData[category]];
        updatedSkills.splice(index, 1);

        setSkillsData({
            ...skillsData,
            [category]: updatedSkills,
        });
    };

    const handleSaveSkills = () => {
        onSave(skillsData);
        toast.success("Skills updated!");
    };

    return (
        <div>
            <div className="mb-6">
                <div className="flex space-x-2 mb-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-3 py-1 rounded-md ${activeCategory === category.id
                                ? "bg-purple-600 text-white"
                                : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="flex mb-4">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 bg-gray-700 text-white rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={`Add ${activeCategory} skill...`}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSkill();
                            }
                        }}
                    />
                    <button
                        onClick={handleAddSkill}
                        className="bg-blue-600 hover:bg-blue-700 rounded-r-md px-3 py-2"
                    >
                        <IconPlus size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skillsData[activeCategory]?.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 rounded-full px-3 py-1 flex items-center"
                        >
                            <span className="mr-2">{skill}</span>
                            <button
                                onClick={() => handleRemoveSkill(activeCategory, index)}
                                className="text-red-400 hover:text-red-300"
                            >
                                <IconX size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSaveSkills}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center"
                >
                    <IconDeviceFloppy size={20} className="mr-2" />
                    Save Skills
                </button>
            </div>
        </div>
    );
} 