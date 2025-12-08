import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is not running, return mock data for testing
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      const url = error.config.url;
      
      // Mock responses for testing
      if (url.includes('/projects/my-projects')) {
        return Promise.resolve({
          data: [
            {
              _id: 'mock-project-1',
              name: 'Demo Proje 1',
              description: 'Bu bir demo projedir',
              members: [
                { user: { username: 'admin', email: 'admin@admin.com' }, role: 'admin' }
              ]
            },
            {
              _id: 'mock-project-2',
              name: 'Demo Proje 2',
              description: 'İkinci demo proje',
              members: [
                { user: { username: 'admin', email: 'admin@admin.com' }, role: 'admin' }
              ]
            }
          ]
        });
      }
      
      if (url.includes('/tasks/by-project')) {
        return Promise.resolve({
          data: [
            { _id: 'task-1', title: 'Demo Görev 1', description: 'Todo görevi', status: 'todo', assignedTo: { username: 'admin' } },
            { _id: 'task-2', title: 'Demo Görev 2', description: 'Devam eden görev', status: 'in-progress', assignedTo: { username: 'admin' } },
            { _id: 'task-3', title: 'Demo Görev 3', description: 'Tamamlanan görev', status: 'done', assignedTo: { username: 'admin' } }
          ]
        });
      }
      
      if (url.includes('/projects/create')) {
        return Promise.resolve({
          data: { _id: 'new-mock-project', name: 'Yeni Proje', description: 'Mock proje' }
        });
      }
      
      if (url.includes('/tasks/create')) {
        return Promise.resolve({
          data: { _id: 'new-mock-task', title: 'Yeni Görev', status: 'todo' }
        });
      }
      
      if (url.includes('/add-member')) {
        return Promise.resolve({ data: { message: 'Mock: Üye eklendi' } });
      }
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
