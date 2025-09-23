import { useState } from "react";
import type { Task } from "../schemas/task";
import { apiFetch } from "../services/api";

export function useTask() {
    const [task, setTask] = useState<Task[]>([])

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

    return {
        task,
        getTasks,
        validateTask,
    }
}