export function htmlToPlainText(html: string) {
    return html
        .replace(/<br.*?\/>/, '\n')
        .split(/<\/?p.*?>/)
        .filter((v) => v)
        .join('\n');
}
