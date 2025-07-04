"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const CategorySection = ({ title, items, sectionId, loading }) => (
    <section id={sectionId} className="py-20 px-4 relative">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-12"
            >
                {title}
            </motion.h2>

            {loading ? (
                <motion.div
                    initial={{ opacity: 1 }}
                    className="flex justify-center"
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </motion.div>
            ) : items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-gray-400"
                >
                    <p>No {title.toLowerCase()} available at the moment.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id || item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard project={item} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    </section>
);


export default CategorySection;