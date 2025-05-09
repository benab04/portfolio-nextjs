import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const projectsFilePath = path.join(__dirname, '../data/projects.json');
const outputFilePath = path.join(__dirname, '../data/projects-reversed.json');

// Read the projects file
try {
    console.log('Reading projects file...');
    const projectsData = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));

    // Reverse the projects array
    const reversedProjects = {
        ...projectsData,
        projects: [...projectsData.projects].reverse()
    };

    // Write the reversed projects to a new file
    fs.writeFileSync(outputFilePath, JSON.stringify(reversedProjects, null, 2), 'utf8');

    console.log(`Successfully reversed projects and saved to ${outputFilePath}`);
    console.log(`Original projects count: ${projectsData.projects.length}`);
    console.log(`Reversed projects count: ${reversedProjects.projects.length}`);

    // Print the first and last project titles for verification
    if (projectsData.projects.length > 0) {
        console.log('\nVerification:');
        console.log(`Original first project: "${projectsData.projects[0].title}"`);
        console.log(`Reversed first project: "${reversedProjects.projects[0].title}"`);
    }
} catch (error) {
    console.error('Error processing projects file:', error);
} 