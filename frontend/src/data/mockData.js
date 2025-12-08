export const statsData = [
    { title: 'Total Projects', value: '12', trend: 'up', trendValue: '2', icon: 'FaProjectDiagram', color: '#4F46E5' },
    { title: 'Active Tasks', value: '45', trend: 'up', trendValue: '5', icon: 'FaTasks', color: '#10B981' },
    { title: 'Pending Reviews', value: '8', trend: 'down', trendValue: '1', icon: 'FaClipboardList', color: '#F59E0B' },
    { title: 'Team Members', value: '24', trend: 'up', trendValue: '3', icon: 'FaUsers', color: '#EC4899' },
];

export const chartData = [
    { name: 'Mon', completed: 4, active: 6 },
    { name: 'Tue', completed: 3, active: 7 },
    { name: 'Wed', completed: 5, active: 5 },
    { name: 'Thu', completed: 7, active: 4 },
    { name: 'Fri', completed: 6, active: 6 },
    { name: 'Sat', completed: 2, active: 3 },
    { name: 'Sun', completed: 1, active: 2 },
];

export const activitiesData = [
    { id: 1, user: 'Alice Smith', action: 'completed task', target: 'Design Homepage', time: '2 hours ago' },
    { id: 2, user: 'Bob Jones', action: 'commented on', target: 'API Integration', time: '4 hours ago' },
    { id: 3, user: 'Charlie Brown', action: 'created project', target: 'Mobile App', time: '1 day ago' },
    { id: 4, user: 'Diana Prince', action: 'uploaded file', target: 'Specs.pdf', time: '1 day ago' },
];

export const projectsData = [
    {
        id: 1,
        title: 'Website Redesign',
        description: 'Revamp the corporate website with new branding.',
        status: 'In Progress',
        progress: 65,
        dueDate: '2023-12-15',
        members: ['Alice', 'Bob', 'Charlie'],
        priority: 'High'
    },
    {
        id: 2,
        title: 'Mobile App Development',
        description: 'Build a native mobile app for iOS and Android.',
        status: 'Planning',
        progress: 15,
        dueDate: '2024-03-01',
        members: ['Diana', 'Evan'],
        priority: 'Medium'
    },
    {
        id: 3,
        title: 'Marketing Campaign',
        description: 'Q4 marketing push for new product launch.',
        status: 'Completed',
        progress: 100,
        dueDate: '2023-11-20',
        members: ['Frank', 'Grace', 'Alice'],
        priority: 'Low'
    },
    {
        id: 4,
        title: 'Internal Tools',
        description: 'Develop internal tools for the HR department.',
        status: 'In Progress',
        progress: 40,
        dueDate: '2024-01-10',
        members: ['Bob', 'Charlie', 'Diana', 'Evan'],
        priority: 'Medium'
    }
];

export const tasksData = [
    { id: 1, title: 'Design Homepage', status: 'Done', priority: 'High', assignee: 'Alice' },
    { id: 2, title: 'Setup API', status: 'In Progress', priority: 'High', assignee: 'Bob' },
    { id: 3, title: 'Write Documentation', status: 'To Do', priority: 'Medium', assignee: 'Charlie' },
    { id: 4, title: 'Fix Login Bug', status: 'In Progress', priority: 'Critical', assignee: 'Diana' },
    { id: 5, title: 'Create Database Schema', status: 'Done', priority: 'High', assignee: 'Evan' },
    { id: 6, title: 'Research Competitors', status: 'To Do', priority: 'Low', assignee: 'Frank' },
];
