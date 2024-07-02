import api from "@/lib/axios";
import { Dashboard, Project, ProjectFormData, editProjectSchema } from "@/types/index";
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

// Obtener un listado de proyectos

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

// obtener projectos por ID

export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


// actualizar un proyecto

type ProjectAPIType = {
    formData: ProjectFormData;
    projectId: Project['_id'];
}

export async function updateProject({formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


// eliminar un proyecto

export async function deleteProject(id: Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}