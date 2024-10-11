export type Response<T> = {
    data: T | undefined;
    error: string | undefined;
    success: boolean;
    message: string | undefined;
}