import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from '../lib/mongodb.js';
import Resume from '../models/Resume.js';
import Project from '../models/Project.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');

        // Read JSON files
        const resumeData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/resume.json'), 'utf8')
        );

        const projectsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf8')
        ).projects;

        // Clear existing data
        await Resume.deleteMany({});
        await Project.deleteMany({});
        console.log('Cleared existing data');

        // Transform skills from array format to object format if needed
        let skillsData = resumeData.skills;
        if (Array.isArray(skillsData)) {
            // If skills is an array of {category, items} objects, convert to the expected format
            const transformedSkills = {
                languages: [],
                frameworks: [],
                libraries: [],
                tools: [],
                other: []
            };

            skillsData.forEach(skill => {
                const category = skill.category.toLowerCase();
                if (transformedSkills[category]) {
                    transformedSkills[category] = skill.items;
                } else {
                    transformedSkills.other = [...transformedSkills.other, ...skill.items];
                }
            });

            resumeData.skills = transformedSkills;
        }

        // Transform coursework if needed
        if (resumeData.coursework && resumeData.coursework.some(course => course.name && !course.title)) {
            resumeData.coursework = resumeData.coursework.map(course => ({
                title: course.name || course.title,
                description: course.description
            }));
        }

        // Insert resume data
        const resume = new Resume(resumeData);
        await resume.save();
        console.log('Resume data seeded successfully');

        // Insert projects data
        const insertedProjects = await Project.insertMany(projectsData);
        console.log(`${insertedProjects.length} projects seeded successfully`);

        console.log('Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase(); 