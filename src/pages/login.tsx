import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);
    const canSubmit = email && password && isValidEmail(email) && !submitting;

    const handleSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
        setError("");

        if (!isValidEmail(email)) {
            setError("Veuillez saisir une adresse e‑mail valide.");
            return;
        }
        if (!password) {
            setError("Le mot de passe ne peut pas être vide.");
            return;
        }

        setSubmitting(true);
        login(email, password);

        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">
                    Se connecter
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    Entrez votre email et mot de passe pour continuer.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={!isValidEmail(email) && email !== ""}
                            className="block w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder="votre@exemple.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12"
                                placeholder="••••••••"
                                aria-describedby="toggle-password"
                            />

                            <button
                                type="button"
                                id="toggle-password"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                                aria-label={
                                    showPassword
                                        ? "Masquer le mot de passe"
                                        : "Afficher le mot de passe"
                                }
                            >
                                {showPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div></div>
                        <a
                            href="#"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Mot de passe oublié ?
                        </a>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className={`w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-2xl text-white font-medium shadow-md transition disabled:opacity-60 ${
                                canSubmit
                                    ? "bg-indigo-600 hover:bg-indigo-700"
                                    : "bg-indigo-400"
                            }`}
                        >
                            {submitting ? "Connexion..." : "Se connecter"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Pas encore de compte ?{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                        S'inscrire
                    </a>
                </div>
            </div>
        </div>
    );
}
