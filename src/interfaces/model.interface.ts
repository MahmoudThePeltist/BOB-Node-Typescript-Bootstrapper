
export interface GetResponse<T> {
    data: T | T[],
    page?: number
    pageSize?: number
    total: number
}
export interface BaseModelInterface<T> {
    get(query?: any, page?: number, pageSize?: number): Promise<GetResponse<T>>
    create(data: Partial<T> | Partial<T>[]): Promise<any>
    update(query: any, data: Partial<T>): Promise<any>
    updateMany(query: any, data: Partial<T>): Promise<any>
    upsert(query: any, data: Partial<T>): Promise<any>
    delete(query: any | any[]): Promise<any>
    count(query: any): Promise<any>
}