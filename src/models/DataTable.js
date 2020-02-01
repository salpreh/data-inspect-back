import mongoose from 'mongoose'

const DataTableSchema = mongoose.Schema({
    name: String,
    fileName: String,
    headers: [Object],
    data: [Object],
})

const DataTable = mongoose.model('DataTable', DataTableSchema)

export default DataTable
