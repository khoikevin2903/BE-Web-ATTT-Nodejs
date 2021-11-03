const jwtHelper = require("../../helper/helper.jwt");
const accessTokenSecret  = process.env.ACCESS_TOKEN_SECRET;

const isAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = await jwtHelper.verifyToken(token, "" + accessTokenSecret);
        req.jwtDecoded = decoded;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }

}

module.exports = isAuth;