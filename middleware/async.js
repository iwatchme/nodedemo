module.exports = function (handler) {
    return async (error, req, res) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    }
}