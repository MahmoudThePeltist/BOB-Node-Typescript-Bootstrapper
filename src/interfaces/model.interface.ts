export interface BaseModelInterface<T> {
    get(query?: any): Promise<any>,
    create(data: Partial<T> | Partial<T>[]): Promise<any>,
    update(query: any, data: Partial<T>): Promise<any>,
    delete(query: any): Promise<any>,
}