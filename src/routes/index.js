import express from 'express'
import formidable from 'formidable'
import DataTableService from '../services/DataTableService'

const router = express.Router()

router.post('/load-data', (req, res) => {
    res
        .status(parseResult.error ? 500 : 200)
        .json({
            message: parseResult.message
        })
})

export default router
