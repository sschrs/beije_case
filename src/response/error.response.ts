import { ApiResponse } from "./api.response";

/**
 * ErrorResponse is an extended class from ApiResponse
 * It is used to standardize error responses across the api, similar to the ApiResponse class
 */
export class ErrorResponse extends ApiResponse {
    constructor(status: number, message: string, path: string = undefined, errors: Map<string, string> = undefined, data: any = undefined){
        super(status, message, path, data);
        this.errors = errors;
    }
    errors: Map<string, string>;
}