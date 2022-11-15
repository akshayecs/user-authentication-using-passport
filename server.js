const express = require('express');
const app = express();
const passport = require("passport");

const{connectMongoose, User} = require("./database.js")
const ejs = require('ejs')
const { initialize, session } = require('passport');
const { initializingPassport,isAuthenticated } = require('./passportConfig.js');
const expressSession = require('express-session')
connectMongoose();

initializingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))


app.use(passport.initialize())
app.use(passport.session())

app.set("view engine","ejs")

app.get("/",(req,res) => {
    res.render("index");
})

app.get("/signup",(req,res) => {
    res.render("register");
})

app.get("/login", (req,res) => {
    res.render("login");
})

app.post("/signup",async (req,res) => {
    
    const user = await User.findOne({email:req.body.email});

    if(user) return res.status(400).send("Email already Exists");

    const newUser = await User.create(req.body);

    res.status(201).send(newUser)
})

app.post(
    "/login",
    passport.authenticate("local",{failureRedirect:"/signup",successRedirect:"/"})
);

app.get("/profile",isAuthenticated,(req,res) =>{
    res.send(req.user)
})

app.get("/logout",(req,res) => {
    req.logout();
    res.send("logged Out");
})

app.listen(3000, () => {
    console.log("server is listening on http://localhost:3000");
})