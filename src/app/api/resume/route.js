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

export async function PUT(request) {
    try {
        await connectDB();

        const { secretKey, ...resumeData } = await request.json();

        // Verify secret key
        if (secretKey !== process.env.DASHBOARD_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized. Invalid secret key.' },
                { status: 401 }
            );
        }

        if (!resumeData) {
            return NextResponse.json(
                { error: 'Invalid request body.' },
                { status: 400 }
            );
        }

        // Find the most recent resume
        const existingResume = await Resume.findOne().sort({ createdAt: -1 });

        if (existingResume) {
            // Update existing resume
            Object.assign(existingResume, resumeData);
            await existingResume.save();
        } else {
            // Create new resume if none exists
            await Resume.create(resumeData);
        }

        return NextResponse.json({ success: true, message: 'Resume updated successfully' });
    } catch (error) {
        console.error('Error updating resume:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 