const jwt = require('jsonwebtoken')
const KEY = "SEHARUSNYADIDALAMENV"

const generateTokenMember = (user) => {
  return jwt.sign({id: user.id, fullname: user.name, email: user.email}, KEY)
}

const generateTokenAdmin = (user) => {
  return jwt.sign({id: user.id, username: user.username}, KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, KEY)
}

module.exports = {generateTokenMember, verifyToken, generateTokenAdmin}