class ResponseHandler {
    static success(response: any, data: any = null, message: string = "Success", statusCode: number = 200) {
        return response.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
        });
    };

    static error(response: any, message: string="Something went wrong", statusCode: number = 404, error: any = null) {
        return response.status(statusCode).json({
            success: false,
            statusCode,
            message,
            error: error ? error.toString() : undefined,
        })
    };

    static paginatedResponse(
        res: any,
        data: any,
        totalItems: number,
        currentPage: number,
        pageSize: number,
        message: string = "Success"
    ) {
        const totalPages = Math.ceil(totalItems / pageSize);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message,
            data,
            pagination: {
                totalItems,
                currentPage,
                totalPages,
                pageSize,
            },
        });
    };

}

export default ResponseHandler;