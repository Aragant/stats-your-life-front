import { useEffect } from "react";
import RoutineList from "../components/routineList";
import { useRoutine } from "../hooks/useRoutine";
import RoutineHeader from "../components/routineHeader";


export default function Routine() {
    const { routines, getRoutines, validateRoutine, deleteRoutine } = useRoutine();

    useEffect(() => {
        getRoutines();
    }, []);

    return (
        <div className="min-h-screen min-w-screen p-8 bg-gradient-to-br from-[#240046] to-[#5a189a] mb-16">
            <div className="max-w-4xl mx-auto">
                <RoutineHeader />
                <RoutineList routines={routines} validateRoutine={validateRoutine} deleteRoutine={deleteRoutine} />
            </div>
        </div>
    );
}
