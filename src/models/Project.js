import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    keywords: [String],
    type: String,
    category: {
        type: String,
        enum: ['Internship', 'Research', 'Open Source', 'Competition', 'Self Project'],
        default: 'Self Project'
    },
    brand: {
        name: String,
        logo: String
    },
    details: {
        overview: String,
        role: String,
        duration: String,
        technologies: [String],
        highlights: [String]
    },
    links: {
        deployed: String,
        source: String
    },
    show: {
        type: Boolean,
        default: true
    },
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
    collection: 'projects' // Explicitly set collection name
});

// Create indexes for faster queries
ProjectSchema.index({ type: 1 });
ProjectSchema.index({ show: 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ category: 1 }); // Add index for category

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 