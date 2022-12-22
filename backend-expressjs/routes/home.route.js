const router = require('express').Router();
const CustomError = require('../exception/customError.exception');

router.get('/', (req, res, next) => {
    res.json({
        error: false,
        message: 'Api Code By NghiaPH 😎.'
    });
});

router.get('/test-error',async (req, res, next) => {
    try {
        let a = 3, b = 4;
        if (a !== b)
            throw new CustomError('My Error.');

    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
