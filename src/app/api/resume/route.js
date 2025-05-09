import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';

export async function GET() {
    try {
        await connectDB();

        const resume = await Resume.findOne().sort({ createdAt: -1 });

        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        return NextResponse.json({ resume });
    } catch (error) {
        console.error('Error fetching resume:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 