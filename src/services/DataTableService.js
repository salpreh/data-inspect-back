import fs from 'fs'
import path from 'path'
import { parse } from '@fast-csv/parse'
import DataTable from '../models/DataTable'

class DataTableService {

    static getDataTableFromFile(filePath, fileName) {
        return new Promise((res, rej) => {
            let data = []
            let headersData = []
            let headersIndex = []

            fs.createReadStream(path.resolve(filePath))
                .pipe(parse({ headers: true }))
                .on('headers', (pHeaders) => {
                    ({ headersData, headersIndex } = this._getDataHeaderAndHeaderIndex(pHeaders))
                })
                .on('data', (row) => {
                    data.push(this._processDataRow(headersIndex, row))
                })
                .on('error', (err) => {
                    console.error('Error parsing csv', err)
                    rej(err)
                })
                .on('end', (numRows) => {
                    if (!numRows) rej(new Error('Empty csv file'))

                    res(
                        new DataTable({
                            fileName,
                            headers: headersData,
                            data
                        })
                    )
                })
        })
    }
    
    /**
     * @param {[string]} headers 
     * 
     * @returns {Object} Object with headersData in {DataTable} format and headersKeys
     */
    static _getDataHeaderAndHeaderIndex(headers) {
        let headersData = []
        let headersIndex = []

        headers.forEach((header) => {
            const headerKey = header
                .replace(/^([^\s]*)\s/, (str, g1) => `${g1.toLowerCase()}`)
                .replace(/\s(\w)([^\s]*)/g, (str, g1, g2) => `${g1.toUpperCase()}${g2.toLowerCase()}`)

            headersData.push({
                name: header,
                key: headerKey
            })

            headersIndex[header] = headerKey
        })


        return { headersData, headersIndex }
    }

    /**
     * Changes row object keys for header keys
     * 
     * @param {Object} headersIndex Object where keys are the csv headers and values are headers keys
     * @param {Object} rowObj 
     */
    static _processDataRow(headersIndex, rowObj) {
        return Object
            .entries(rowObj)
            .reduce((obj, [key, val], i) =>
                Object.defineProperty(obj, headersIndex[key], {value: val, enumerable: true})
            , {})
    }

    /**
     * @deprecated
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
}

export default DataTableService
