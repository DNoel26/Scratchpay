/** @format */

class ApiResponse {
    static get ok_200() {
        return {
            status: 'OK',
            code: 200,
            info: 'The request was successfully completed',
        };
    }
    static get badRequest_400() {
        return {
            status: 'Bad Request',
            code: 400,
            info: 'Client side error. The request was not valid',
        };
    }
    static get notFound_404() {
        return {
            status: 'Not Found',
            code: 404,
            info: 'Targeted resource does not exist. URI is either malformed or the resource has been deleted',
        };
    }
    static get internalServerError_500() {
        return {
            status: 'Internal Server Error',
            code: 500,
            info: 'Server side error. The request was not completed and might indicate a problem in the server side code',
        };
    }
}

export default ApiResponse;
