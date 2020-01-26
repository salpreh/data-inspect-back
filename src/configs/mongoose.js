import mongoose from 'mongoose'
import { config } from 'dotenv'

const envConfig = config()

const mongoSetUp = () => {
    if (envConfig.parsed.ENV === 'dev') {
        mongoose.set('debug', true)
    }
    mongoose.Promise = global.Promise

    const dbURL = `mongodb://${envConfig.parsed.DB_USER}:${envConfig.parsed.DB_PASS}@mongo:27017/${envConfig.parsed.DB_NAME}?authSource=admin`
    mongoose.connect(dbURL, {useNewUrlParser: true})

    const conn = mongoose.connection

    conn.on('error', (err) => {
        console.log('Error connecting to DB', err)
    })

    conn.on('connected', () => {
        console.log('Connected to mongo')
    })

    return conn
}

export default mongoSetUp
