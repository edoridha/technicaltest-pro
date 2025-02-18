const { verifyToken } = require('../helpers/jwt');
const { Member } = require('../models');

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) throw { name: "NoToken" }

        const payload = verifyToken(access_token)

        const data = await Member.findByPk(payload.id)
        req.user = {
            id: data.id,
            fullName: data.fullName
        }
        next()
    } catch (error) {
        next(error)
    }
}
