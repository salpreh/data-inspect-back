import express from 'express'
import formidable from 'formidable'
import DataTableService from '../services/DataTableService'

const router = express.Router()

router.post('/load-data', (req, res) => {
    let form = new formidable.IncomingForm()
    let parseResult = {error: false, message: 'Data recieved'}

    form.parse(req, async (err, fields, files) => {
        if (err) {
            parseResult = {
                error: true,
                message: 'Error parsing form data'
            }

            return
        }

        try {
            const dataTable = await DataTableService.getDataTableFromFile(
                files['data-file'].path,
                files['data-file'].name
            )
            dataTable.name = fields.name
            dataTable.save()

        } catch(err) {
            parseResult = {
                error: true,
                message: 'Error processing data file'
            }
        }

    })

    res
        .status(parseResult.error ? 500 : 200)
        .json({
            message: parseResult.message
        })
})

export default router
