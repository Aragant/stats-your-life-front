import type { Routine } from "../schemas/routine";
import DateServices from "../services/dateServices";

interface RoutineListProps {
    routines: Routine[];
    validateRoutine: (id: number) => void;
    deleteRoutine: (id: number) => void;
}

export default function RoutineList({
    routines,
    validateRoutine,
    deleteRoutine,
}: RoutineListProps) {
    const getStatusColor = (routine: Routine) => {
        if (routine.validated) {
            return "bg-green-500";
        }

        const daysSinceLastValidation = DateServices.getDaysDifference(
            routine.last_validation
        );

        if (daysSinceLastValidation == routine.cooldown_days) {
            if (routine.strike >= 3) {
                return "bg-orange-500";
            }
            return "bg-yellow-500";
        } else if (daysSinceLastValidation >= routine.cooldown_days) {
            return "bg-red-500";
        } else if (daysSinceLastValidation == -1) {
            return "bg-yellow-500";
        }

        return "bg-blue-500";
    };

    const getStatusText = (routine: Routine) => {
        if (routine.validated) {
            return "Complétée";
        }

        const daysSinceLastValidation = DateServices.getDaysDifference(
            routine.last_validation
        );

        if (daysSinceLastValidation == routine.cooldown_days) {
            if (routine.strike >= 3) {
                return "Critique";
            }
            return "À faire";
        } else if (daysSinceLastValidation >= routine.cooldown_days) {
            return "En retard";
        } else if (daysSinceLastValidation == -1) {
            return "À faire";
        }

        return "En attente";
    };

    const formatDate = (date: string | number | Date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getDaysRemaining = (routine: Routine) => {
        if (!routine.last_validation) {
            return -1;
        }

        const daysSinceLastValidation = Math.floor(
            (new Date().getTime() -
                new Date(routine.last_validation).getTime()) /
                (1000 * 60 * 60 * 24)
        );

        if (routine.validated) {
            return routine.cooldown_days - daysSinceLastValidation;
        }

        return routine.cooldown_days - daysSinceLastValidation;
    };

    const isOverdue = (routine: Routine) => {
        if (!routine.last_validation) {
            return false;
        }
        const daysSinceLastValidation = Math.floor(
            (new Date().getTime() -
                new Date(routine.last_validation).getTime()) /
                (1000 * 60 * 60 * 24)
        );
        return (
            daysSinceLastValidation > routine.cooldown_days &&
            !routine.validated
        );
    };

    const handleDeleteClick = (
        e: React.MouseEvent,
        routineId: number,
        routineName: string
    ) => {
        e.stopPropagation(); // Empêche le clic de valider la routine

        if (
            window.confirm(
                `Êtes-vous sûr de vouloir supprimer la routine "${routineName}" ? Cette action est irréversible.`
            )
        ) {
            deleteRoutine(routineId);
        }
    };

    return (
        <>
            {!routines || routines.length === 0 ? (
                <div className="bg-[#3c096c]/50 backdrop-blur-sm rounded-2xl border border-[#ffffff]/10 p-6 sm:p-12 text-center">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔄</div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#ffffff] mb-2">
                        Aucune routine
                    </h3>
                    <p className="text-sm sm:text-base text-[#ffffff]/70">
                        Vous n'avez pas encore de routines. Créez-en une pour
                        commencer !
                    </p>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {routines.map((routine) => (
                        <div
                            key={routine.id}
                            className="bg-[#3c096c]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[#ffffff]/10 p-3 sm:p-4 md:p-6 hover:bg-[#3c096c]/70 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-2xl relative"
                        >
                            {/* Header - Mobile optimized */}
                            <div className="flex items-start justify-between pb-2 sm:pb-3 gap-2">
                                <div
                                    onClick={() => validateRoutine(routine.id)}
                                    className="flex-1 cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200"
                                >
                                    <h3
                                        className={`text-lg sm:text-xl font-semibold leading-tight ${
                                            routine.validated
                                                ? "text-[#ffffff]/60"
                                                : "text-[#ffffff]"
                                        }`}
                                    >
                                        {routine.name}
                                    </h3>
                                </div>

                                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                                    <span
                                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                                            routine
                                        )}`}
                                    >
                                        {getStatusText(routine)}
                                    </span>

                                    <div className="relative inline-flex items-center justify-center">
                                        <span className="text-3xl sm:text-3xl md:text-4xl">
                                            🔥
                                        </span>
                                        {routine.strike > 0 ? (
                                            <span className="absolute inset-0 flex items-center justify-center pt-2 sm:pt-2 text-white text-sm sm:text-xl md:text-xl font-bold drop-shadow-md">
                                                {routine.strike}
                                            </span>
                                        ) : (
                                            <span className="absolute inset-0 flex items-center justify-center pt-2 sm:pt-2 text-white text-sm sm:text-xl md:text-xl font-bold drop-shadow-md">
                                                0
                                            </span>
                                        )}
                                    </div>

                                    {/* Bouton supprimer */}
                                    <button
                                        onClick={(e) =>
                                            handleDeleteClick(
                                                e,
                                                routine.id,
                                                routine.name
                                            )
                                        }
                                        className="p-1 sm:p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 group"
                                        title="Supprimer la routine"
                                    >
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 group-hover:text-red-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Content - Stacked on mobile, side by side on desktop */}
                            <div
                                onClick={() => validateRoutine(routine.id)}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2 sm:gap-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200"
                            >
                                {/* Info section */}
                                <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffffff]/60 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-[#ffffff]/70">
                                            <span className="hidden sm:inline">
                                                Dernière validation :{" "}
                                            </span>
                                            <span className="sm:hidden">
                                                Dernière :{" "}
                                            </span>
                                            {formatDate(
                                                routine.last_validation
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffffff]/60 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-[#ffffff]/70">
                                            Cooldown : {routine.cooldown_days}{" "}
                                            jour
                                            {routine.cooldown_days > 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    </div>
                                </div>

                                {/* Status section */}
                                <div className="flex items-center justify-start sm:justify-end">
                                    {routine.validated ? (
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30 whitespace-nowrap">
                                            ✓{" "}
                                            <span className="hidden sm:inline">
                                                Disponible{" "}
                                            </span>
                                            dans{" "}
                                            {Math.max(
                                                0,
                                                getDaysRemaining(routine)
                                            )}{" "}
                                            jour
                                            {Math.max(
                                                0,
                                                getDaysRemaining(routine)
                                            ) !== 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    ) : isOverdue(routine) ? (
                                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30 whitespace-nowrap">
                                            ⚠️{" "}
                                            <span className="hidden sm:inline">
                                                En{" "}
                                            </span>
                                            retard de{" "}
                                            {Math.abs(
                                                getDaysRemaining(routine)
                                            )}{" "}
                                            jour
                                            {Math.abs(
                                                getDaysRemaining(routine)
                                            ) !== 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    ) : getDaysRemaining(routine) <= 0 ? (
                                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30 whitespace-nowrap">
                                            🎯{" "}
                                            <span className="hidden sm:inline">
                                                Disponible{" "}
                                            </span>
                                            maintenant
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30 whitespace-nowrap">
                                            ⏳{" "}
                                            <span className="hidden sm:inline">
                                                Disponible{" "}
                                            </span>
                                            dans {getDaysRemaining(routine)}{" "}
                                            jour
                                            {getDaysRemaining(routine) !== 1
                                                ? "s"
                                                : ""}
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
