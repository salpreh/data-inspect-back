import express from 'express'
import config from './config'


const server = {
    _server: null,

    start() {
        const app = express()

        config(app)

        const port = app.get('config').PORT
        this._server = app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    },

    stop() {
        this._server.close()
    }
}

export default server

// If module is not imported run the server
if (!module.parent) {
    server.start()
}
