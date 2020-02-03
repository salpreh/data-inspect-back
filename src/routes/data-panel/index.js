import express from 'express'
import DataTable from '~/models/DataTable'

const router = express.Router()

router.get('/', async (req, res) => {
    let queryError = false

    const dataNames = await DataTable.find()
        .exec()
        .then((docs) =>
            docs.map((doc) => ({
                id: doc.id,
                name: doc.name,
                headers: doc.headers,
                numRows: doc.data.length,
                numCols: doc.headers.length
            }))
        )
        .catch((err) => {
            queryErr = true,
            console.log(err)
        })

    if (queryError) {
        res
            .status(500)
            .json({
                message: 'Error while retrieving Data sets'
            })

        return
    }

    res.json({
        'pannels': dataNames
    })
})

router.get('/:id', async (req, res) => {
    let dataSet = {}
    let queryError = false

    try {
        dataSet = await DataTable.findById(req.params.id).exec()
    } catch(err) {
        console.log(`Error quering: ${err}`)
        queryError = true
    }
    
    if (queryError || !dataSet) {
        res
            .status(400)
            .json({
                message: 'Data set with given Id not found'
            })

        return
    }

    res.json(dataSet.toObject({ versionKey: false}))
})

export default router
