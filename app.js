//connect 4!
/*User login
Scoreboard - Top 10
Post Game Screen
Points
Play new Games and Quit Options at any time
multiplayer -(Locally)*/

//red and yellow
//click the row you want, red
//now you, yellow
//no one wins!
//yellow has won its sixth game!
//and the number of games can be stored under the login so we can call them by names instead of yellow
//Bree's (yellow's) turn!
//Bree has won six games!
//top 10 works with users number they won
//do we need a database to store these? we must
//when you click the quit button it takes you to the home page
//home page has login
//score by times, not points
//so we don't count times won? when they win they store the time, counting up
//timer might be fickle but it might be easier with node.js, I don't think I've ever done a timer actually
//player one play as guest or sign in, player two
//guest doesn't get name, if one signs in do their name and Guest for the other, and if they're both guests just say red and yellow
//at the top we have quit (are you sure?) go to the home page; new game (same players? clear the board. new players? just go to home and sign them out)
//Bree wins! 00.36 Number 5 on the leaderboard! Congratulations!
//Cocoa wins! 00.50! New best score
//Home page Bree Best score: 00.36 Leaderboard No5
// const express = require("express");
// const app = express();
// const path = require("path");

// app.use(express.static("./views/public"));
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// })
// app.get("/game", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/game.html"));
// })
// app.listen(3000, () => {
//     console.log("Listening on port 3000")
// })

//login walkthrough stuff
/*User login
Register
Scoreboard - Top 10
Post Game Screen (what I have is good)
Save Points (number of wins) to mongoose
make register and login and scoreboard pages
make css and js import to ejs(works on welcome, check/finish game)*/

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressEJSLayout = require("express-ejs-layouts");
const passport = require("passport");
//we tell it where the local strategy is
require("./config/passport")(passport);
require("dotenv").config();
const router = express.Router();
const app = express();

try {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`connected on Port: ${process.env.PORT}`))
    .catch((err) => {console.log(err)})
} catch(error) {
    console.log(error);
}

app.use(express.static("./views/public"));
//Development tools
app.use(morgan("tiny"))
//EJS
app.set("view engine", "ejs");
app.use(expressEJSLayout);
//Body parser
app.use(express.urlencoded({extended: false}));
//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//use flash messaging -- express
//sets that up
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use('/public', express.static('./views/public'))
app.listen(process.env.PORT || 3000)