export function extractDateFromCreatedDateString(dateStr: string): Date {
    const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const timeRegex = /(\d{2}):(\d{2})/;

    const [_, day, month, year] = dateStr.match(dateRegex);
    const [__, hour, minute] = dateStr.match(timeRegex);

    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10),
    );
}
