import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../lib/mongodb.js';
import Project from '../models/Project.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function reverseProjects() {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');

        // Get all projects sorted by createdAt in ascending order
        const projects = await Project.find().sort({ createdAt: 1 });
        console.log(`Found ${projects.length} projects in the database`);

        if (projects.length === 0) {
            console.log('No projects to reverse');
            process.exit(0);
        }

        console.log('\nOriginal order (first 3):');
        projects.slice(0, 3).forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        // Calculate new positions for each project
        const totalProjects = projects.length;
        const updateOperations = projects.map((project, index) => {
            const newCreatedAt = new Date(Date.now() - (index * 60000)); // 1 minute apart
            return {
                updateOne: {
                    filter: { _id: project._id },
                    update: { $set: { createdAt: newCreatedAt, updatedAt: newCreatedAt } }
                }
            };
        });

        // Execute the bulk update
        const result = await Project.bulkWrite(updateOperations);
        console.log(`Updated ${result.modifiedCount} projects`);

        // Verify the new order
        const reversedProjects = await Project.find().sort({ createdAt: -1 });
        console.log('\nNew order (first 3):');
        reversedProjects.slice(0, 3).forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        console.log('\nProjects have been successfully reversed in the database');
        process.exit(0);
    } catch (error) {
        console.error('Error reversing projects:', error);
        process.exit(1);
    }
}

reverseProjects(); 