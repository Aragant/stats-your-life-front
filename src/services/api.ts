/* eslint-disable @typescript-eslint/no-explicit-any */
export async function apiFetch<T>(
    url: string,
    {
        json,
        formData,
        method,
        contentType
    }: {
        json?: Record<string, unknown>;
        formData?: Record<string, string>;
        method?: string;
        contentType?: string;
    } = {}
): Promise<T> {
    // Déterminer la méthode HTTP
    method ??= (json || formData) ? 'POST' : 'GET';
   
    // Préparer le body et le content-type
    let body: string | URLSearchParams | undefined;
    let finalContentType: string;
   
    if (formData) {
        // Mode form-urlencoded (pour le login FastAPI)
        body = new URLSearchParams(formData);
        finalContentType = 'application/x-www-form-urlencoded';
    } else if (json) {
        // Mode JSON (comportement par défaut)
        body = JSON.stringify(json);
        finalContentType = 'application/json';
    } else {
        // GET ou autres sans body
        body = undefined;
        finalContentType = 'application/json';
    }
   
    // Utiliser le contentType personnalisé si fourni
    if (contentType) {
        finalContentType = contentType;
    }

    // Log pour debug
    console.log(`🌐 API Call: ${method} ${url}`, {
        body: body instanceof URLSearchParams ? Object.fromEntries(body) : body,
        contentType: finalContentType
    });
   
    try {
        const response = await fetch("https://api.local.stats:8000" + url, {
            method,
            credentials: 'include',
            headers: {
                accept: 'application/json',
                'Content-Type': finalContentType,
            },
            body,
        });

        console.log(`📡 Response ${response.status}:`, response.statusText);
       
        if (response.ok) {
            // Vérifier si la réponse a du contenu JSON
            const contentType = response.headers.get('content-type');
            const hasJsonContent = contentType && contentType.includes('application/json');
            
            if (response.status === 204 || !hasJsonContent) {
                // Pas de contenu ou pas de JSON (ex: 204 No Content)
                console.log(`✅ Success (no content):`, response.status);
                return null as T;
            } else {
                // Parse le JSON normalement
                const data = await response.json();
                console.log(`✅ Success:`, data);
                return data as T;
            }
        }

        // Gérer les erreurs avec plus de détails
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            // Si la réponse n'est pas du JSON valide
            errorData = { 
                message: response.statusText || `HTTP ${response.status}`,
                error: "Invalid JSON response"
            };
        }

        console.error(`❌ API Error ${response.status}:`, errorData);
        throw new ApiError(response.status, errorData);

    } catch (error) {
        if (error instanceof ApiError) {
            // Re-lancer les erreurs API
            throw error;
        }
        
        // Gérer les erreurs réseau/autres
        console.error(`🚫 Network/Other Error:`, error);
        throw new ApiError(0, {
            message: error instanceof Error ? error.message : 'Unknown network error',
            originalError: error
        });
    }
}

class ApiError extends Error {
    status: number;
    data: { [key: string]: unknown };

    constructor(status: number, data: { [key: string]: unknown }) {
        // Créer un message d'erreur lisible
        let message = `API Error ${status}`;
        
        if (data.message) {
            message += `: ${data.message}`;
        } else if (data.detail) {
            // FastAPI utilise souvent 'detail' pour les erreurs
            if (Array.isArray(data.detail)) {
                // Erreurs de validation FastAPI
                const validationErrors = data.detail
                    .map((err: any) => `${err.loc?.join?.('.') || 'field'}: ${err.msg}`)
                    .join(', ');
                message += `: ${validationErrors}`;
            } else {
                message += `: ${data.detail}`;
            }
        }

        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        
        // Assigner toutes les propriétés de data à l'erreur pour la compatibilité
        Object.assign(this, data);
    }

    // Méthode utilitaire pour obtenir un message d'erreur user-friendly
    getUserMessage(): string {
        if (this.status === 0) {
            return "Erreur de connexion. Vérifiez votre connexion internet.";
        }
        
        if (this.status === 401) {
            return "Identifiants incorrects.";
        }
        
        if (this.status === 403) {
            return "Accès refusé.";
        }
        
        if (this.status === 404) {
            return "Ressource non trouvée.";
        }
        
        if (this.status >= 500) {
            return "Erreur serveur. Veuillez réessayer plus tard.";
        }
        
        return this.message;
    }
}