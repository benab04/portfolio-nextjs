import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit')) || 100;

        const query = { show: true };
        if (type) {
            query.type = type;
        }

        const projects = await Project.find(query)
            .sort({ $natural: -1 })
            .limit(limit);

        return NextResponse.json({ projects });
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