const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated will return true if the user is logged in
        next()
    } else {
        console.log(req);
        req.flash("error_msg", "please login before you start playing")
        res.redirect("/users/login");
    }
}
const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated will return true if the user is logged in
        next()
    } else {
        console.log(req);
        res.redirect("/");
    }
}
const checkAuthenticatedTwo = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard")
        //req.isAuthenticated will return true if the user is logged in
    } else {
        next()
    }
}
module.exports = {ensureAuthenticated, checkAuthenticated, checkAuthenticatedTwo};
//ensure authenticated verifies if the user has logged in using passport's authentication. it will return back a true (if they're logged in) or false(if they're not).