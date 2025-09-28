export default class DateServices {
    public static getDaysDifference(dateString: Date | null): number {
        if (!dateString) {
            return -1;
        }

        const today = new Date();
        const pastDate = new Date(dateString);

        today.setHours(0, 0, 0, 0);
        pastDate.setHours(0, 0, 0, 0);

        return Math.floor(
            (today.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
    }
}
