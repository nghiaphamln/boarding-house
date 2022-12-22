const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.json({
        error: false,
        message: 'Api Code By NghiaPH 😎.'
    });
});

module.exports = router;
