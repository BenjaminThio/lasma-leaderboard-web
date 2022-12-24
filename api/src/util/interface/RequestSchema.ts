export enum RequestType {
    GET,
    POST,
    PUT,
    DELETE
}

export enum RequestBodyDataType {
    STRING = "string",
    NUMBER = "number",
    BIGINT = "bigint",
    BOOLEAN = "boolean",
    SYMBOL = "symbol",
    UNDEFINED = "undefined",
    OBJECT = "object",
    FUNCTION = "function",
    ANY = "any",
    OPTIONAL = "optional",
    OPTIONAL_STRING = "string",
    OPTIONAL_NUMBER = "number",
    OPTIONAL_BOOLEAN = "boolean",
    OPTIONAL_OBJECT = "object",
    OPTIONAL_FUNCTION = "function",
}

/**
 * Describe how the request should look like
 */
export interface RequestSchema {
    type: RequestType,

    /**
     * Expected Content
     */
    content: { [key: string]: any }
}