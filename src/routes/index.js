import express from 'express'
import formidable from 'formidable'
import DataTableService from '../services/DataTableService'

const router = express.Router()

router.post('/load-data', (req, res, next) => {
    let form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next({
                msg: 'Error parsing form data',
                ctx: err
            })
            return
        }

        try {
            const dataTable = await DataTableService.getDataTableFromFile(
                files['data-file'].path,
                files['data-file'].name
            )
            dataTable.name = fields.name
            dataTable.save()

            res
                .status(200)
                .json({
                    message: 'Data recieved'
                })

        } catch(err) {
            next({
                msg: 'Error processing data file',
                ctx: err
            })
        }

    })
})

export default router
