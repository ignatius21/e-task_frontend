import api from "@/lib/axios";
import { Dashboard, ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";



export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData);
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data);
        }
        
    }
}


export async function getProjects() {
    try {
        const { data } = await api('/projects');
        const response = Dashboard.safeParse(data)
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}