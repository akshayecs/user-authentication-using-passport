const localStrategy = require('passport-local').Strategy;

const { User } = require('./database');

exports.initializingPassport = (passport) => {

    passport.use(new localStrategy(async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false)

            if (user.password !== password) return done(null, false)

            return done(null, user)
        } catch (error) {

            return done(error, false)

        }

    })
    );

    passport.serializeUser((user,done) => {
        done(null,user.id)
    })

    passport.deserializeUser(async (id,done) => {
        try {
            const user = await User.findById(id);
            done(null,user);
        } catch (error) {
            done(error,false)
        }
    });
};  

exports.isAuthenticated = (req,res,next) => {
    if(req.user) return next ;

    res.redirect("/login")
}