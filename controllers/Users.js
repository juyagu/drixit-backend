'use strict';


var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.authenticate = function authenticate (req, res, next) {
  var body = req.swagger.params['body'].value;
  Users.authenticate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      let resp;
      if(response === 'Not found'){
        resp = utils.respondWithCode(404,'El usuario no se encuentra registrado')
      }else{
        resp = utils.respondWithCode(500,response)
      }
      utils.writeJson(res, resp);
    });
};

module.exports.userInfo = function userInfo (req, res, next) {
  const token = req.headers.authorization;
  if(!token){
    const resp = utils.respondWithCode(405,'No tiene permisos para realizar la acción')
    utils.writeJson(res, resp);
  }
  Users.userInfo(token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
