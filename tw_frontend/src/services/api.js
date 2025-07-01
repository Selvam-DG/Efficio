import axios from "./axios";

// Projects 
export const getProjects = () => axios.get('/projects/');
export const getProject = id => axios.get(`/projects/${id}/`);
export const createProject = data => axios.post('/projects/', data);
export const updateProject = (id, data) => axios.put(`/projects/${id}/`, data);
export const deleteProject = id => axios.delete(`/projects/${id}`);


// Tasks
export const getTasks = () => axios.get('/tasks/');
export const getTask = id => axios.get(`/tasks/${id}/`);
export const createTask = data => axios.post('/tasks/', data);
export const updateTask = (id, data) => axios.put(`/tasks/${id}/`, data);
export const deleteTask = id => axios.delete(`/tasks/${id}/`);

// Teams
export const getTeams = () => axios.get('/teams/');
export const getTeam = id => axios.get(`/teams/${id}/`);
export const createTeam = data => axios.post('/teams/', data);
export const updateTeam = (id, data) => axios.put(`/teams/${id}/`, data);
export const deleteTeam = id => axios.delete(`/teams/${id}/`);

// Comments
export const getComments = () => axios.get('/comments/');
export const getComment = id => axios.get(`/comments/${id}/`);
export const createComment = data => axios.post('/comments/', data);
export const updateComment = (id, data) => axios.put(`/comments/${id}/`, data);
export const deleteComment = id => axios.delete(`/comments/${id}/`);


