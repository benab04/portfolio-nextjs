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