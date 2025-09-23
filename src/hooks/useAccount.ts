import { useAuth } from "./useAuth";

export function useAccount() {
    const { account } = useAuth();
    if (account === undefined) {
        throw new Error("User is not authenticated");
    }
    return {
        account,
    };
}