import express from 'express'
import DataTable from '~/models/DataTable'

const router = express.Router()

router.get('/', async (req, res, next) => {

    try {
        const dataSets = await DataTable.find()
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
    
        res.json(dataSets)

    } catch (err) {
        console.error(err)
        next({
            msg: 'Error while retrieving Data sets',
            ctx: err
        })
    }
})

router.get('/:id', async (req, res, next) => {
    let dataSet = {}

    try {
        dataSet = await DataTable.findById(req.params.id).exec()
    } catch(err) {
        console.error(err)
        next({
            msg: 'Error retrieving data set',
            ctx: err
        })
        return
    }
    
    if (!dataSet) {
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
