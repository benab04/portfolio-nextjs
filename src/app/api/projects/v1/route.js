import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const show = searchParams.get('show') === 'true';
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit')) || 100;
        const category = searchParams.get('category') || null;
        const query = {};

        query.show = show;

        if (type) {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }


        const projects = await Project.find(query)
            .limit(limit);

        // Sort projects based on duration
        const sortedProjects = projects.sort((a, b) => {
            const durationA = a.details?.duration;
            const durationB = b.details?.duration;

            // If both have no duration, maintain original order
            if (!durationA && !durationB) return 0;

            // If only A has no duration, A comes first
            if (!durationA && durationB) return -1;

            // If only B has no duration, B comes first
            if (durationA && !durationB) return 1;

            // If both have duration, parse and compare dates
            // Extract end dates from duration strings like "April 2024 - May 2024"
            const getEndDate = (duration) => {
                const parts = duration.split(' - ');
                if (parts.length === 2) {
                    const endPart = parts[1].trim();
                    // Handle cases like "May 2024" or "Present"
                    if (endPart.toLowerCase() === 'present') {
                        return new Date(); // Current date for ongoing projects
                    }
                    return new Date(endPart + ' 01'); // Add day for parsing
                }
                return new Date(duration + ' 01'); // Single date format
            };

            const endDateA = getEndDate(durationA);
            const endDateB = getEndDate(durationB);

            // Sort by end date in descending order (most recent first)
            return endDateB - endDateA;
        });

        return NextResponse.json({ projects: sortedProjects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(request) {
    try {
        await connectDB();

        const { projects, secretKey } = await request.json();

        // Verify secret key
        if (secretKey !== process.env.DASHBOARD_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized. Invalid secret key.' },
                { status: 401 }
            );
        }

        if (!projects || !Array.isArray(projects)) {
            return NextResponse.json(
                { error: 'Invalid request body. Expected an array of projects.' },
                { status: 400 }
            );
        }

        // Delete all existing projects
        await Project.deleteMany({});

        // Insert new projects
        await Project.insertMany(projects);

        return NextResponse.json({ success: true, message: 'Projects updated successfully' });
    } catch (error) {
        console.error('Error updating projects:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 