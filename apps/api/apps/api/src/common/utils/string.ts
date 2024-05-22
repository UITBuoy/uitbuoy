export function trimString(str: string) {
    return str
        .replace(/\n|\t/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}
