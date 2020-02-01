import express from 'express'
import DataTable from '~/models/DataTable'

const router = express.Router()

router.get('/', async (req, res) => {
    let queryError = false

    const dataNames = await DataTable.find()
        .exec()
        .then((docs) =>
            docs.map((doc) => doc.name)
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

export default router
