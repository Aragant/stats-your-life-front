import type { Task } from "../../schemas/task";

interface TaskListProps {
    tasks: Task[];
    validateTask: (id: number) => void;
}

export default function TaskList({ tasks, validateTask }: TaskListProps) {
    const getPriorityColor = (priority: number) => {
        switch (priority) {
            case 1:
                return "bg-red-500";
            case 2:
                return "bg-orange-500";
            case 3:
                return "bg-yellow-500";
            case 4:
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    const getPriorityText = (priority: number) => {
        console.log("priority", priority);
        switch (priority) {
            case 1:
                return "Urgent";
            case 2:
                return "Élevée";
            case 3:
                return "Moyenne";
            case 4:
                return "Faible";
            default:
                return "Non définie";
        }
    };

    const formatDate = (date: string | number | Date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const isOverdue = (deadline: string | number | Date) => {
        return new Date(deadline) < new Date();
    };

    return (
        <>
            {!tasks || tasks.length === 0 ? (
                <div className="bg-[#3c096c]/50 backdrop-blur-sm rounded-2xl border border-[#ffffff]/10 p-12 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-semibold text-[#ffffff] mb-2">
                        Aucune tâche
                    </h3>
                    <p className="text-[#ffffff]/70">
                        Vous n'avez pas encore de tâches. Créez-en une pour
                        commencer !
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((taskItem) => (
                        <div
                            key={taskItem.id}
                            onClick={() => validateTask(taskItem.id)}
                            className="bg-[#3c096c]/50 backdrop-blur-sm rounded-2xl border border-[#ffffff]/10 p-4 md:p-6 hover:bg-[#3c096c]/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                        >
                            <div className="flex items-start justify-between pb-3">
                                <h3
                                    className={`text-xl font-semibold  ${
                                        taskItem.validated
                                            ? "text-[#ffffff]/60 line-through"
                                            : "text-[#ffffff]"
                                    }`}
                                >
                                    {taskItem.name}
                                </h3>

                                <div className="flex self-end items-center space-x-3">
                                    {!taskItem.validated && (
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(
                                                taskItem.priority
                                            )}`}
                                        >
                                            {getPriorityText(taskItem.priority)}
                                        </span>
                                    )}

                                    {taskItem.validated && (
                                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
                                            ✓ Terminée
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm gap-3">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-4 h-4 text-[#ffffff]/60"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span
                                            className={`${
                                                isOverdue(taskItem.deadline) &&
                                                !taskItem.validated
                                                    ? "text-red-400 font-medium"
                                                    : "text-[#ffffff]/70"
                                            }`}
                                        >
                                            : {formatDate(taskItem.deadline)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {isOverdue(taskItem.deadline) &&
                                        !taskItem.validated && (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30">
                                                ⚠️ En retard
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
