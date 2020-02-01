import index from './routes/index'
import dataPanel from './routes/data-panel'
import { Express } from 'express'

/**
 * 
 * @param {Express} app 
 */
export default function(app) {
    app.use('/', index)
    app.use('/data-panel', dataPanel)
}
