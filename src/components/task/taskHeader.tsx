import { useNavigate } from "react-router";
import type { Task } from "../../schemas/task";

interface TaskHeaderProps {
    tasks: Task[];
}



export default function TaskHeader({ tasks }: TaskHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="">
                        <h1 className="text-4xl font-bold text-[#ffffff] mb-2">
                            Mes Tâches
                        </h1>
                        <p className="text-[#ffffff]/80">
                            {tasks?.length || 0} tâche(s) au total
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/createTask")}
                        className="bg-primary-3 text-white px-4 py-3 md:px-6 md:py-3 rounded-lg font-bold hover:bg-primary-2 active:bg-primary transition-colors shadow-md inline-block text-center"
                    >
                        New task
                    </button>
                </div>
    );
}