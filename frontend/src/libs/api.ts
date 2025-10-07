import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
})

export const getEmployees = () => api.get("/");
export const createEmployee = (data: any) => api.post("/", data);
export const updateEmployee = (id: number, data: any) => api.put(`/${id}`, data);
export const deleteEmployee = (id: number) => api.delete(`/${id}`);

