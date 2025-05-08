"use client";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import projectsData from "@/data/projects.json";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const showProfileImage = process.env.NEXT_PUBLIC_SHOW_PROFILE_IMAGE === 'true';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects to only show those with show: true
  const visibleProjects = projectsData.projects.filter(project => project.show);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20" />
        <div className={`relative z-10 flex ${showProfileImage ? 'flex-col md:flex-row' : 'flex-col'} items-center justify-center gap-12 px-4`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center ${showProfileImage ? 'md:text-left' : ''}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Hi, I&apos;m Ben
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Full Stack Developer & UI/UX Enthusiast
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`flex gap-4 ${showProfileImage ? 'justify-center md:justify-start' : 'justify-center'}`}
            >
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/benab04"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <IconBrandGithub size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/ben-abraham-biju-2038a4244/"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <IconBrandLinkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:benabiju18@gmail.com"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                <IconMail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {showProfileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Ben Abraham Biju"
                  fill
                  className="object-cover rounded-full border-4 border-white/10"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Animated background elements */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 1000,
                }}
                animate={{
                  x: [
                    Math.random() * 1000,
                    Math.random() * 1000,
                  ],
                  y: [
                    Math.random() * 1000,
                    Math.random() * 1000,
                  ],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white/5 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Get in Touch
          </motion.h2>
          <ContactForm />
        </motion.div>
      </section>
    </div>
  );
}
