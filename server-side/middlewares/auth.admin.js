const { verifyToken } = require('../helpers/jwt');
const { Admin } = require('../models');

module.exports = async (req, res, next) => {
    try {        
        const {access_token} = req.headers;
        if (!access_token) throw { name: "NoToken" }

        const payload = verifyToken(access_token)

        const data = await Admin.findByPk(payload.id)
        req.user = {
            id: data.id,
            username: data.username
        }
        next()
    } catch (error) {        
        next(error)
    }
}
