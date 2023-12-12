const cookieParser = require("cookie");
const { decodeJwtToken } = require("./jwt.config");
const { findUserPerId } = require("../queries/user.queries");

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).redirect("/auth/signin/form");
  }
};

exports.ensureAuthenticatedOnSocketHandshake = async (request, success) => {
  try {
    const cookies = cookieParser.parse(request.headers.cookie || "");
    if (cookies && cookies.jwt) {
      const decodedToken = await decodeJwtToken(cookies.jwt);
      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        request.user = user;
        success(null, true);
      } else {
        success(400, false);
        throw "Err ensureAuthenticatedOnSocketHandshake =";
      }
    } else {
      success(403, false);
    }
  } catch (e) {
    success(400, false);
    throw ("Err ensureAuthenticatedOnSocketHandshake =", e);
  }
};
