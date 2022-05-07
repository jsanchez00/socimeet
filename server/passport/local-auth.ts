import { Guid } from "guid-typescript";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local"; 
import { userModel } from "../models/user";

passport.use("local-signup", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        // check if user exists
        const userExists = await userModel.findOne({
            "email": email
        });
        if (userExists) {
            return done(null, false)
        }
        // Create a new user with the user data provided
        const user = await userModel.create({
            email,
            password
        });
        return done(null, {user, token: Guid.create().toString()});
    } catch (error) {
        done(error);
    }
}));

passport.use("local-login", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({
            email: email
        });
        if (!user) return done(null, false);
        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return done(null, false);
        // if passwords match return user
        return done(null, {user, token: Guid.create().toString()});
    } catch (error) {
        console.log(error)
        return done(error, false);
    }
}));

