import api from "@/lib/axios";
import { Project, Task, TaskFormData } from "../types";
import { isAxiosError } from "axios";


// crear una tarea

type TaskAPIType = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: Task['status'];
}

export async function createTask({formData, projectId}: Pick<TaskAPIType, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const {data} = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        }
    }
}

// obtener tareas por proyecto

export async function getTasksByProject(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// obtener tarea por ID


export async function getTaskById({projectId, taskId}: Pick<TaskAPIType, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// actualizar una tarea

export async function updateTask({formData, projectId, taskId}: Pick<TaskAPIType,'formData' | 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
    }
}

// eliminar una tarea

export async function deleteTask({projectId, taskId}: Pick<TaskAPIType,'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
    }
}

// actualizar el estado de una tarea

export async function updateTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPIType, "projectId" | "taskId"> & { status: Task['status'] }) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}