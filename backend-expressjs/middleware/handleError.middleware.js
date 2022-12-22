module.exports = HandleError = (err, req, res, next) => {
    const { stack, status = 400, message } = err;
    if (stack) {
        res.status(status).json({
            error: true,
            status,
            message
        });
    }
    next();
}
