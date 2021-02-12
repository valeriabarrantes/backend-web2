const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      jwt.verify(req.token, process.env.SECRET, async (err) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      })
    } else {
      res.sendStatus(403);
    }
  }
}
