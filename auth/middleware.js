const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // * check for authorization header and split it
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // * if authorization header is there, auth type is Bearer and we have something at auth[1]
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // remember to try/catch the call toData()
    try {
      // * use the value returned from toData() to look for that user in your database with User.findByPk()
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);

      // if not, we return a 401 status and the message "please enter valid credentials"
      if (!user) {
        // * if not found, set status to 404 "no user found"
        res.status(404).send("User not found");
        // * if user is found, set it to "req.user = user" and call next()
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: `Error ${error.name}: ${error.message}` });
    }
  } else {
    res.status(401).send({ message: "Please enter valid credentials" });
  }
}
module.exports = auth;
