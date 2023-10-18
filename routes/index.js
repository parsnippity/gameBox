const express = require("express");
const router = express.Router();
const {ensureAuthenticated, checkAuthenticated, checkAuthenticatedTwo} = require("../config/auth");

//homepage page
router.get("/", checkAuthenticatedTwo, (req, res) => {
    //looking for the page called welcome
    res.render("pages/welcome", {
        user: ""
    })
})

router.get("/dashboard", checkAuthenticated, (req, res) => {
    res.render("pages/welcome", {
        user: req.user
    })
})

router.get("/scoreboard", (req, res) => {
    res.render("pages/scoreboard")
})

//dashboard-Homepage redirect
router.get("/game",ensureAuthenticated,(req, res)=> {
    res.render("pages/game", {
        user: req.user
    })
})
//it check if it's authenticated, and it it is, it takes the user from the request (who'll be there until the session ends) and passes that to the dashboard page

module.exports = router;