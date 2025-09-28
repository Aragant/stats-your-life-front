import { useState } from "react";
import type { Routine } from "../schemas/routine";
import { apiFetch } from "../services/api";

export function useRoutine() {
    const [routines, setRoutines] = useState<Routine[]>([]);

    const getRoutines = () => {
        apiFetch<Routine[]>("/routines")
            .then(setRoutines)
            .catch(() => setRoutines([]));
    };

    const validateRoutine = (id: number) => {
        apiFetch<Routine[]>(`/routines/${id}/validate`, {
            method: "PUT",
        })
            .then(getRoutines)
            .catch(() => setRoutines([]));
    };

    const createRoutine = (routine: {
        name: string;
        cooldown_days: number;
    }) => {
        apiFetch<Routine>("/routines", {
            method: "POST",
            json: routine,
        })
            .then(getRoutines)
            .catch(() => setRoutines([]));
    };

    const deleteRoutine = (id: number) => {
        apiFetch<Routine[]>(`/routines/${id}`, {
            method: "DELETE",
        })
            .then(getRoutines)
            .catch(() => setRoutines([]));
    };

    return { routines, getRoutines, validateRoutine, createRoutine, deleteRoutine };
}
