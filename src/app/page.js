"use client";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProjects } from "@/lib/api";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [olderProjects, setOlderProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOlderProjects, setLoadingOlderProjects] = useState(false);
  const [showOlderProjects, setShowOlderProjects] = useState(false);
  const showProfileImage = process.env.NEXT_PUBLIC_SHOW_PROFILE_IMAGE === 'true';

  useEffect(() => {
    setMounted(true);

    // Fetch projects from the API for each category
    const loadAllProjects = async () => {
      try {
        const [internshipsData, projectsData, competitionsData] = await Promise.all([
          fetchProjects(null, 100, 'internship'),
          fetchProjects(null, 100, 'project'),
          fetchProjects(null, 100, 'competition')
        ]);

        setInternships(internshipsData.projects);
        setProjects(projectsData.projects);
        setCompetitions(competitionsData.projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllProjects();
  }, []);

  const loadOlderProjects = async () => {
    if (olderProjects.length > 0) {
      // If older projects are already loaded, just toggle visibility
      setShowOlderProjects(!showOlderProjects);
      return;
    }

    setLoadingOlderProjects(true);
    try {
      const olderProjectsData = await fetchProjects(null, 100, 'project', false);
      setOlderProjects(olderProjectsData.projects);
      setShowOlderProjects(true);
    } catch (error) {
      console.error('Error loading older projects:', error);
    } finally {
      setLoadingOlderProjects(false);
    }
  };

  const hideOlderProjects = () => {
    setShowOlderProjects(false);
    // Scroll to competitions section after hiding older projects
    setTimeout(() => {
      const scrollBackTarget = document.getElementById('moreProjectsButton');
      if (scrollBackTarget) {
        scrollBackTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100); // Small delay to ensure the DOM has updated
  };

  const CategorySection = ({ title, items, sectionId }) => (
    <section id={sectionId} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No {title.toLowerCase()} available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item._id || item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

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
              Full Stack Developer & ML Enthusiast
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

      {/* Internships Section */}
      <CategorySection
        title="Internships"
        items={internships}
        sectionId="internships"
      />

      {/* Competitions Section */}
      <CategorySection
        title="Competitions"
        items={competitions}
        sectionId="competitions"
      />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Projects
          </motion.h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No projects available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((item, index) => (
                  <motion.div
                    key={item._id || item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard project={item} />
                  </motion.div>
                ))}
              </div>

              {/* View Older Projects Button */}
              {!showOlderProjects && (
                <motion.div
                  id="moreProjectsButton"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center mt-12"
                >
                  <motion.button
                    onClick={loadOlderProjects}
                    disabled={loadingOlderProjects}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative flex items-center gap-3">
                      {loadingOlderProjects ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-400"></div>
                          <span className="text-white font-medium">Loading...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-medium">
                            {showOlderProjects ? 'Hide Older Projects' : 'View Older Projects'}
                          </span>
                          <motion.div
                            animate={{ rotate: showOlderProjects ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-5 h-5 text-purple-400"
                          >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {/* Older Projects Section */}
              <motion.div
                initial={false}
                animate={{
                  height: showOlderProjects ? "auto" : 0,
                  opacity: showOlderProjects ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {showOlderProjects && (
                  <div className="mt-12">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold text-center mb-8 text-gray-300"
                    >
                      Older Projects
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {olderProjects.map((item, index) => (
                        <motion.div
                          key={`older-${item._id || item.title}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <ProjectCard project={item} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Hide Older Projects Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex justify-center mt-12"
                    >
                      <motion.button
                        onClick={hideOlderProjects}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-8 py-4 bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 rounded-full border border-gray-500/30 hover:border-gray-500/50 transition-all duration-300 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                        <div className="relative flex items-center gap-3">
                          <span className="text-white font-medium">Hide Older Projects</span>
                          <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            className="w-5 h-5 text-gray-400"
                          >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </div>
                      </motion.button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Get in Touch
          </motion.h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}