const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({
        success: false,
        message: err.message
    })
};

module.exports = errorHandler;