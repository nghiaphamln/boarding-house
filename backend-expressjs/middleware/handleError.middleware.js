module.exports = HandleError = (err, req, res, next) => {
    res.json({
        error: err.status !== 200,
        status: err.status,
        message: err.message
    });
}
