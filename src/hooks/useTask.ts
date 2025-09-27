import { useState } from "react";
import type { Task } from "../schemas/task";
import { apiFetch } from "../services/api";

export function useTask() {
    const [tasks, setTask] = useState<Task[]>([])

    const getTasks = () => {
        apiFetch<Task[]>("/tasks")
            .then(setTask)
            .catch(() => setTask([]))
    }

    const validateTask = (id: number) => {
        apiFetch<Task[]>(`/tasks/${id}/validate`, {
            method: 'PUT'
        })
            .then(getTasks)
            .catch(() => setTask([]))
    }

    const createTask = (task: { name: string, deadline: string, priority: number }) => {
        apiFetch<Task>("/tasks", {
            method: 'POST',
            json: task
        })
            .then(getTasks)
            .catch(() => setTask([]))
    }

    return {
        tasks,
        getTasks,
        validateTask,
        createTask
    }
}