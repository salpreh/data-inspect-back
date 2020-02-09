/**
 * @param {Object} err 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 * @param {CallableFunction} next 
 */
export default function(err, req, res, next) {
    let body = {
        "error" : err.msg ? err.msg : "Error during request processing",
    }

    if (process.env.ENV == 'dev') {
        body.context = {
            message: err.ctx.message,
            stack: err.ctx.stack
        }
    }

    res
        .status(err.status ? err.status : 500)
        .json(body)
}