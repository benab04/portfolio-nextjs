export async function fetchResume() {
    try {
        const response = await fetch('/api/resume');
        if (!response.ok) {
            throw new Error('Failed to fetch resume data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching resume:', error);
        throw error;
    }
}

export async function fetchProjects(type = null, limit = 100, category = null, show = true) {
    try {
        const params = new URLSearchParams();
        params.append('show', show.toString());
        if (type) {
            params.append('type', type);
        }
        if (limit) {
            params.append('limit', limit.toString());
        }
        if (category) {
            params.append('category', category);
        }

        const url = `/api/projects/v1${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('Fetching projects from URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch projects data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
