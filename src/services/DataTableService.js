import fs from 'fs'
import readLine from 'readline'
import DataTable from '../models/DataTable'

class DataTableService {

    static getDataTableFromFile(filePath, fileName) {
        return new Promise((res, rej) => {
            let nLine = 0
            let data = []
            let headers = []

            // Read file line by line
            const rl = readLine.createInterface({
                input: fs.createReadStream(filePath),
                output: process.stdout,
                console: false
            })

            rl.on('line', (line) => {
                const formattedLine = line
                    .split(',')
                    .map((d) => d.replace(/"(.*)"/, '$1').trim())

                try {
                    if (nLine === 0) {
                        headers = this._getDataHeaderObject(formattedLine)
                    } else {
                        data.push(
                            this._getDataRowObject(headers, formattedLine)
                        )
                    }
                    
                    nLine++
                } catch (err) {
                    rej(err)
                }
            })

            // Resolve promise when file is processed
            rl.on('close', () => {
                res(
                    new DataTable({
                        fileName,
                        headers,
                        data
                    })
                )
            })
        })
    }
    
    /**
     * Return a list of headers in a formatted object
     * 
     * @param {[String]} headers 
     * 
     * @returns {[Object]}
     */
    static _getDataHeaderObject(headers) {
        return headers.map((header) => ({
                name: header,
                key: header
                    .replace(/^([A-Z])/, (r) => r.toLowerCase())
                    .replace(/\s(\w)/g, (r) => r.trim().toUpperCase())
            })
        )
    }

    /**
     * 
     * @param {[Object]} headersData 
     * @param {[String]} row 
     */
    static _getDataRowObject(headersData, row) {
        return row.reduce((obj, data, i) =>
            Object.defineProperty(obj, headersData[i].key, {value: data, enumerable: true})
        , {})
    }
}

export default DataTableService
