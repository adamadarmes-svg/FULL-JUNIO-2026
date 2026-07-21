const fs = require('fs')

const readCSV = (path) => {
  const data = fs.readFileSync(path, 'utf8')
  if (!data.trim()) return []

  const [headerLine, ...rows] = data.trim().split('\n')
  const headers = headerLine.split(',')

  return rows.map(row =>
    row.split(',').reduce((obj, value, index) => {
      obj[headers[index]] = value
      return obj
    }, {})
  )
}

const writeCSV = (path, data) => {
  if (data.length === 0) {
    fs.writeFileSync(path, '', 'utf8')
    return
  }
  const headers = Object.keys(data[0])
  const rows = data.map(obj => headers.map(h => obj[h]).join(','))
  const csvContent = [headers.join(','), ...rows].join('\n')
  fs.writeFileSync(path, csvContent, 'utf8')
}

module.exports = { readCSV, writeCSV }