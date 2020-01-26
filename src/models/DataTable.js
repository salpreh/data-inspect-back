import mongoose from 'mongoose'

const DataTableSchema = mongoose.Schema({
    name: String,
    fileName: String,
    headers: [String],
    data: Array,
})

const DataTable = mongoose.model('DataTable', DataTableSchema)

export default DataTable
