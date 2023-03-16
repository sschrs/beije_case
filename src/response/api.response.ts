/**
 * ApiResponse is used as a response template to establish a standard across the api
 */
export class ApiResponse{
    constructor(status: number, message: string, path: string = undefined, data: any = undefined){
        this.status = status;
        this.message = message;
        this.path = path;
        this.data = data;
    }
    status: number; // http status code
    message: string; // response message
    path: string; // response path
    timestamp: number = new Date().getTime(); // current timestamp
    data: any; // extra data if necessary
}