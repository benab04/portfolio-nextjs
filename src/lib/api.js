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

export async function fetchProjects(type = null, limit = 100) {
    try {
        const params = new URLSearchParams();
        if (type) {
            params.append('type', type);
        }
        if (limit) {
            params.append('limit', limit.toString());
        }

        const url = `/api/projects${params.toString() ? `?${params.toString()}` : ''}`;
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
