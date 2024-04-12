export function dateToShortString(
    date: Date,
    dateStyle?: 'full' | 'long' | 'medium' | 'short',
    timeStyle?: 'full' | 'long' | 'medium' | 'short',
): string {
    return new Intl.DateTimeFormat('vi-VN', {
        dateStyle,
        timeStyle,
        timeZone: 'Asia/Ho_Chi_Minh',
    }).format(date);
}
