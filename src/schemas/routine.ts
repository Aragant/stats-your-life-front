export type Routine = {
    id: number;
    name: string;
    validated: boolean;
    cooldown_days: number;
    last_validation: Date | null;
    strike: number;
}