module.exports = Log = (req, res, next) => {
    console.log(`[${req.method}][${req.ip}] ${req.originalUrl}`);
    next();
}
