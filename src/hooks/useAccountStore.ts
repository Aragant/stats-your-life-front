import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { Account } from "../schemas/account";

export const useAccountStore = create(
    combine(
        {
            account: undefined as undefined | null | Account,
        },
        (set) => ({
            setAccount: (account: Account | null) => {console.log("setAccount", account); set({ account })},
        })
    )
);
