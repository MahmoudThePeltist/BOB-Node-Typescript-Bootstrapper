
export interface RegexResponse {
    $regex: RegExp;
    $options: string;
}

export interface QueryObject {
    $and?: any[],
    $or?: any[]
}

export interface FilterObject {
    attribute: string,
    type: string,
    key?: string
}

/**
 * Light, Opinionated, multi-purpose MongoDb query builder for searching and filtering
 * 
 * @param queryObject The object that contains the query attributes and their values, usually request.params
 * @param filters The conditions array that defines the searchable columns and their types
 * @param andMode If true, all conditions must be true, if false only one condition must be true
 * @param searchAllAttribute If defined and exists in queryObject, will search all columns for it, ignoring keys and attributes in filters array
 * @returns Returns a MongoDB compatible query object
 */
export const filterQueryBuilder = (
    queryObject: any,
    filters: FilterObject[] = [],
    andMode: boolean = false,
    searchAllAttribute?: string): any => {

    let query: any[] = [];

    filters.map((filter: FilterObject) => {
        let queryKey = filter?.key ? filter.key : filter.attribute;
    
        // This checks if we're searching all columns with one attribute, and turns off andMode since it's unlikely to ever be needed in this case
        if(searchAllAttribute && queryObject[searchAllAttribute]) {
            queryKey = searchAllAttribute;
            andMode = false;
        }

        if(queryObject[queryKey]) {
            // !searchAllAttribute: we don't check the UUIDs due to casting issues.
            if(filter.type == 'uuid' && !searchAllAttribute)
                query.push({[filter.attribute]: queryObject[queryKey]});

            if(filter.type == 'string')
                query.push({[filter.attribute]: getMongoRegex(queryObject[queryKey])});
        
            // !searchAllAttribute: we don't check the numbers due to casting issues.
            if(filter.type == 'number' && !searchAllAttribute)
                query.push({[filter.attribute]: Number(queryObject[queryKey])});
        
            if(filter.type == 'boolean')
                query.push({[filter.attribute]: !!(queryObject[queryKey])});
        }
    })
    
    if(!query.length) return {};

    return (andMode ? { $and: query } : { $or: query });
}
    
export const getMongoRegex = (query: any): RegexResponse => ({
    $regex: new RegExp(`.*${query}.*`), $options: "i"
});