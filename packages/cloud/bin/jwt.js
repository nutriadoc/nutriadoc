const jwt = require('jsonwebtoken')
const token = jwt.sign({ allowed: ['*', '0000'] }, 'secret')

console.debug(token)