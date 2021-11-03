const Music = require('../models/Music');
const User = require('../models/User');
const Token = require('../models/Token');
const jwtHelper = require('../../helper/helper.jwt');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refreshSecret";

class MeController {

    changePassword(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                if (user.password === req.body.currentPassword) {
                    User.updateOne({ _id: req.params.id }, { password: req.body.newPassword })
                        .then(() => {
                            return res.json("Successfully!!!")
                        })
                        .catch(next);
                }
                else return res.status(400).json({ message: "Current password is not correct" })
            })
            .catch(next);
    }

    editUser(req, res, next) {
        const currentUser = req.jwtDecoded.data;
        const user = {
            _id: currentUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: currentUser.role
        }

        User.updateOne({ _id: req.params.id }, user)
            .then(async () => {
                const accessToken = await jwtHelper.generateToken(user, "" + accessTokenSecret, accessTokenLife);
                const refreshToken = await jwtHelper.generateToken(user, "" + refreshTokenSecret, refreshTokenLife);
                const token = new Token({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                token.save();
                Token.deleteOne({ accessToken: req.token })
                return res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            })
            .catch(next);
    }

    getUser(req, res, next) {
        const user = req.jwtDecoded;
        const role = user.data.role;
        if (role !== "ADMIN") {
            User.find({ role: "USER" })
                .then(users => res.json(users.reverse()))
                .catch(next)
        }
        else {
            User.find({})
                .then(users => {
                    const newList = users.filter(user => user.role !== "ADMIN")
                    return res.json(newList.reverse())
                })
                .catch(next)
        }

    }

    storeMusic(req, res, next) {
        const user = req.jwtDecoded;
        Music.find({ idUser: user.data._id })
            .then(musics => res.json(musics.reverse()))
            .catch(next)
    }

    trashMusic(req, res, next) {
        Music.findDeleted()
            .then(musics => res.render(musics))
            .catch(next)
    }
}

module.exports = new MeController;

