export function isServiceError(obj: Service.Error | unknown): obj is Service.Error {
    return !!obj && (obj as Service.Error).error !== undefined;
}
