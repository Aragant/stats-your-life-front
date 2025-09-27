import { useState } from "react";
import { useNavigate } from "react-router";
import { useTask } from "../hooks/useTask";

export default function CreateTask() {
    const navigate = useNavigate();
    const { createTask } = useTask();
    
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState(3);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const priorityOptions = [
        { value: 1, label: "Urgent", color: "bg-red-500" },
        { value: 2, label: "Élevée", color: "bg-orange-500" },
        { value: 3, label: "Moyenne", color: "bg-yellow-500" },
        { value: 4, label: "Faible", color: "bg-green-500" },
    ];

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        
        if (!name.trim()) {
            setError("Le nom de la tâche est requis");
            return;
        }
        
        if (!deadline) {
            setError("La date limite est requise");
            return;
        }

        setIsSubmitting(true);
        
        try {
            await createTask({
                name: name.trim(),
                deadline: new Date(deadline).toISOString(),
                priority: priority
            });
            navigate("/task");
        } catch {
            setError("Une erreur est survenue lors de la création de la tâche");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-3 p-4 pb-20">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pt-4">
                    <button
                        onClick={() => navigate("/task")}
                        className="p-2 text-font hover:bg-primary-2 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <h1 className="text-2xl font-bold text-font">
                        Nouvelle Tâche
                    </h1>
                    
                    <div className="w-10"></div>
                </div>

                {/* Form Card */}
                <div className="bg-primary-2/50 backdrop-blur-sm rounded-2xl border border-font/10 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Task Name */}
                        <div>
                            <label className="block text-sm font-medium text-font mb-2">
                                Nom de la tâche *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-primary border border-primary-3 text-font placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-3 focus:border-transparent transition-all"
                                placeholder="Ex: Terminer le rapport mensuel"
                                maxLength={256}
                            />
                            <div className="text-xs text-font/60 mt-1">
                                {name.length}/256 caractères
                            </div>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-font mb-2">
                                Date limite *
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                min={getTodayDate()}
                                className="w-full px-4 py-3 rounded-xl bg-primary border border-primary-3 text-font focus:outline-none focus:ring-2 focus:ring-primary-3 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-font mb-3">
                                Priorité
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {priorityOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setPriority(option.value)}
                                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                            priority === option.value
                                                ? `${option.color} border-font/30 text-white scale-105 shadow-lg`
                                                : 'bg-primary-2/50 border-primary-3 text-font hover:bg-primary-2 hover:scale-[1.02]'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {priority === option.value && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                            <span className="font-medium text-sm">
                                                {option.label}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !deadline}
                            className={`w-full py-4 rounded-xl font-bold text-font transition-all duration-200 ${
                                isSubmitting || !name.trim() || !deadline
                                    ? 'bg-primary-2/50 opacity-50 cursor-not-allowed'
                                    : 'bg-primary-3 hover:bg-primary-2 hover:shadow-lg active:scale-[0.98]'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-font/30 border-t-font rounded-full animate-spin"></div>
                                    <span>Création...</span>
                                </div>
                            ) : (
                                'Créer la tâche'
                            )}
                        </button>
                    </form>
                </div>

                {/* Helper Text */}
                <div className="mt-6 text-center">
                    <p className="text-font/60 text-sm">
                        * Champs obligatoires
                    </p>
                </div>
            </div>
        </div>
    );
}