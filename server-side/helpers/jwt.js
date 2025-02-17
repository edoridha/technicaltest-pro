const jwt = require('jsonwebtoken')
const KEY = "SEHARUSNYADIDALAMENV"

const generateTokenMember = (user) => {
  return jwt.sign({id: user.id, fullname: user.name, email: user.email}, KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, KEY)
}

module.exports = {generateTokenMember, verifyToken}