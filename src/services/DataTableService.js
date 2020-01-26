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
                if (nLine === 0) {
                    headers = line.split(',')
                } else {
                    data.push(line.split(','))
                }
                
                nLine++
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
}

export default DataTableService
