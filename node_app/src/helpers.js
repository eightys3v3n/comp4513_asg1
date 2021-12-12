//Page 11
// Adding password and authentication checks, extended from the User.js schema changes.

// Uses passport authentication to check if authentication is
// needed at some point in the middleware pipeline.
function ensureAuthenticated (req, resp, next) {
    if (req.isAuthenticated()) {
        console.log("isAuthenticated is true.");
        return next();
    }
    console.log("isAuthenticated not false");
    res.json("Must be authenticated to use this API. Post email and password to /login");
}
// Notice the use of req.flash. The flash mechanism in express is a way to create pseudo global
// variables. In this case , the string 'Please log in to view that resource' is first being send to a flash
// variable names 'info'. Then in the resp.render() call, this flash variable content is being passed to
// the login page. It should show up as red text.


module.exports = {ensureAuthenticated};
