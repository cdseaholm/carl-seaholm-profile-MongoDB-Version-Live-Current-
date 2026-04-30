export function serializeDoc<T>(doc: any): T {
    return JSON.parse(JSON.stringify(doc));
}