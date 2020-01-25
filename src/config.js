import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import { Express } from 'express'

const envConfig = config()

/**
 * @param {Express} app 
 */
export default function(app) {
   app.disable('x-powered-by') 
   app.set('config', envConfig.parsed)

   app.use(logger('combined'))
   app.use(cors())

   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({extended: false}))
}