var userDao = require('../dao/userDao');
var Response = require("../util/response");

module.exports = function (req, res, next) {

    var response = new Response();
    
    userDao.getUserByMid(req.user.mid)
        .then((user) => {
            if (user.dataValues.role == 'admin') {
                next();
            }
            else {
                response.status.statusCode = '401';
                response.status.message = 'You are not authenticated!';
                res.status(401).json(response);
            }
        });
}
            