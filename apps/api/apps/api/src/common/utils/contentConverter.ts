export function htmlToPlainText(html: string) {
    return html
        .replace(/<br.*?\/>/g, '\n')
        .split(/<\/?p.*?>/)
        .filter((v) => v)
        .join('\n');
}
