import { useState } from "react";
import { useRoutine } from "../hooks/useRoutine";
import { useNavigate } from "react-router";

export default function RoutineCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cooldownDays, setCooldownDays] = useState(1);
    const [errors, setErrors] = useState<{
        name?: string;
        cooldownDays?: string;
    }>({});

    const { createRoutine } = useRoutine();

    const validateForm = () => {
        const newErrors: { name?: string; cooldownDays?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Le nom de la routine est obligatoire";
        } else if (name.trim().length < 3) {
            newErrors.name = "Le nom doit faire au moins 3 caractères";
        } else if (name.trim().length > 50) {
            newErrors.name = "Le nom ne peut pas dépasser 50 caractères";
        }

        if (cooldownDays < 1) {
            newErrors.cooldownDays = "Le cooldown doit être d'au moins 1 jour";
        } else if (cooldownDays > 365) {
            newErrors.cooldownDays =
                "Le cooldown ne peut pas dépasser 365 jours";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            createRoutine({ name: name.trim(), cooldown_days: cooldownDays });
            // Reset form
            setName("");
            setCooldownDays(1);
            setErrors({});

            navigate("/routine");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#240046] via-[#3c096c] to-[#5a189a] p-4 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="bg-[#3c096c]/50 backdrop-blur-sm rounded-2xl border border-[#ffffff]/10 p-6 sm:p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate("/routine")}
                                className="p-2 text-font hover:bg-primary-2 rounded-lg transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <div className="text-5xl mb-4">📝</div>
                            <div className="w-10"></div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Nouvelle routine
                        </h1>
                        <p className="text-white/70 text-sm sm:text-base">
                            Créez une nouvelle routine pour développer vos
                            habitudes
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Nom de la routine */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-white/90 mb-2"
                            >
                                Nom de la routine
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                                    errors.name
                                        ? "border-red-500/50"
                                        : "border-white/20"
                                } text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-300`}
                                placeholder="Ex: Faire du sport, Méditer, Lire..."
                                maxLength={50}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1 flex items-center">
                                    <svg
                                        className="w-3 h-3 mr-1 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.name}
                                </p>
                            )}
                            <div className="text-right text-xs text-white/50 mt-1">
                                {name.length}/50
                            </div>
                        </div>

                        {/* Cooldown */}
                        <div>
                            <label
                                htmlFor="cooldown"
                                className="block text-sm font-medium text-white/90 mb-2"
                            >
                                Période de cooldown
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="cooldown"
                                    value={cooldownDays}
                                    onChange={(e) =>
                                        setCooldownDays(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                    min="1"
                                    max="365"
                                    className={`w-full px-4 py-3 pr-16 rounded-xl bg-white/10 border ${
                                        errors.cooldownDays
                                            ? "border-red-500/50"
                                            : "border-white/20"
                                    } text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-300`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm">
                                    jour{cooldownDays > 1 ? "s" : ""}
                                </div>
                            </div>
                            {errors.cooldownDays && (
                                <p className="text-red-400 text-xs mt-1 flex items-center">
                                    <svg
                                        className="w-3 h-3 mr-1 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.cooldownDays}
                                </p>
                            )}
                            <p className="text-white/50 text-xs mt-1">
                                Temps d'attente avant de pouvoir refaire cette
                                routine
                            </p>
                        </div>

                        {/* Boutons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7209b7] to-[#a663cc] text-white font-medium hover:from-[#8b21d4] hover:to-[#b575d6] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={!name.trim() || cooldownDays < 1}
                            >
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Créer la routine
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Info supplémentaire */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-start space-x-2">
                            <svg
                                className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-blue-300 text-sm">
                                <p className="font-medium mb-1">
                                    Comment ça marche ?
                                </p>
                                <p className="text-blue-300/80 leading-relaxed">
                                    Une fois validée, votre routine ne pourra
                                    être refaite qu'après le délai de cooldown.
                                    Si vous oubliez, votre streak repare a 0 !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
