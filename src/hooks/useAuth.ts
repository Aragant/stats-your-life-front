import { useCallback } from "react";
import type { Account } from "../schemas/account";
import { useAccountStore } from "./useAccountStore";
import { apiFetch } from "../services/api";

export type AuthStatus = "Unknown" | "Authenticated" | "Guest";

export function useAuth() {
    const { account, setAccount } = useAccountStore();
    let status: AuthStatus = "Unknown";

    switch (account) {
        case null:
            status = "Guest";
            break;
        case undefined:
            status = "Unknown";
            break;
        default:
            status = "Authenticated";
            break;
    }

    const authenticate = useCallback(() => {
        console.log("authenticate");
        apiFetch<Account>("/users/me")
            .then(setAccount)
            .catch(() => setAccount(null));
    }, []);

    const login = useCallback((username: string, password: string) => {
        apiFetch<any>("/auth/cookie/login", {
            method: 'POST',
            formData: {
                grant_type: "password",
                username,
                password,
                scope: "",
                client_id: "string",
                client_secret: "",
            },
        })
            .then(() => authenticate())
            .catch(() => setAccount(null));
    }, []);

    const logout = useCallback(() => {
        apiFetch<Account>("/auth/cookie/logout", { method: "POST" })
            .then(setAccount)
            .catch(() => setAccount(null));
    }, []);

    return {
        account,
        status,
        authenticate,
        login,
        logout,
    };
}
