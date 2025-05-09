import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    education: [{
        title: String,
        subtitle: String,
        period: String,
        description: String,
        details: [String]
    }],
    experience: [{
        title: String,
        subtitle: String,
        period: String,
        description: String,
        details: [String]
    }],
    projects: [{
        title: String,
        period: String,
        description: String,
        details: [String]
    }],
    skills: {
        languages: [String],
        frameworks: [String],
        libraries: [String],
        tools: [String],
        other: [String]
    },
    coursework: [{
        title: String,
        description: String
    }],
    achievements: [{
        title: String,
        period: String,
        description: String
    }],
    extracurricular: [{
        title: String,
        period: String,
        description: String,
        details: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'resumes' // Explicitly set collection name
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema); 