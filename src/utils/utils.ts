export default function getDayRange(dateStr: string): { start: Date; end: Date } {
    const base = dateStr.split('T')[0];
    return {
        start: new Date(`${base}T00:00:00.000Z`),
        end: new Date(`${base}T23:59:59.999Z`),
    };
}