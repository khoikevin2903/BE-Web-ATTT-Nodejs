const User = require('../models/User');
const Token = require('../models/Token');
const jwtHelper = require('../../helper/helper.jwt');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refreshSecret";

class AuthController {

    // [POST] /auth/sign-up
    signUp(req, res, next) {
        try {
            User.findOne({ username: req.body.username })
                .then(user => {
                    if (user === null) {
                        const user = new User(req.body);
                        user.save()
                            .then(() => {
                                return res.json({ response: "Account successfully created!!!" })
                            })
                            .catch(next)
                    }
                    return res.json({response: "Login account already exists!"});
                })
                .catch(next);
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] /auth/logout
    logout(req, res, next) {
        try {
            Token.deleteOne({ accessToken: req.body.accessToken })
                .then(() => {
                    return res.json({ response: "Logout successfully" })
                })
                .catch(next);
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] /auth/login
    login(req, res, next) {
        try {
            User.findOne({ username: req.body.username })
                .then(async user => {
                    if (user.password === req.body.password) {
                        const accessToken = await jwtHelper.generateToken(user, "" + accessTokenSecret, accessTokenLife);
                        const refreshToken = await jwtHelper.generateToken(user, "" + refreshTokenSecret, refreshTokenLife);
                        const token = new Token({
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                        token.save();
                        return res.json({
                            info: {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                role: user.role
                            },
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                    } else return res.json({ err: "Incorrect password!!!" });
                })
                .catch(() => {
                    return res.json({ err: "User not found!!!" })
                });
        } catch (error) {

        }
    }

    // [POST] /auth/refresh-token
    refreshToken = async (req, res, next) => {
        const refreshTokenFromClient = req.body.refreshToken;
        const tokenFromDB = Token.findOne({ refreshToken: refreshTokenFromClient });
        if (refreshTokenFromClient && tokenFromDB) {
            try {
                const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
                const user = decoded.data;
                const accessToken = await jwtHelper.verifyToken(user, accessTokenSecret, accessTokenLife);
                return res.json({ ...accessToken });
            } catch (error) {
                res.status(403).json({
                    message: 'Invalid refresh token.',
                });
            }
        }
        else {
            return res.status(403).send({
                message: 'No token provided.',
            });
        }
    }

}

module.exports = new AuthController;

