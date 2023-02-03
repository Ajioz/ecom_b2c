const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler = (req, res, error) => {
    const statuscode = res.statusCode === 200 ? 404 : res.statusCode;
    res.status(statuscode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "Production" ? null : `Not Found - ${req.originalUrl}`,
    });

}

export { notFound, errorHandler };