export function extraIncludes(firstString: string, secondString: string) {
    return firstString.normalize('NFD').includes(secondString.normalize('NFD'));
}
