/* eslint-disable consistent-return */
const passport = require('passport');
const JwtStragety = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const userService = require('../services/user.service');

passport.use(
    new JwtStragety(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
        },
        async (payload, done) => {
            try {
                const user = await userService.getById(payload.id);

                return done(null, user);
            } catch (err) {
                done(err);
            }
        },
    ),
);
