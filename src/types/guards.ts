export function isServiceError(obj: Service.Error | unknown): obj is Service.Error {
    return (obj as Service.Error).error !== undefined;
}
