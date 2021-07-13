'use strict';
const userConnection = require('./../connection/UserConnection');
const jwt = require("jsonwebtoken")
const jwtKey = "drixit_secret_key";
const jwtExpirySeconds = 30000


/**
 * Validate User Credentials
 * 
 *
 * body UserLogin User object that is used to check credentials
 * returns String
 **/
exports.authenticate = function (body) {
  return new Promise(async function (resolve, reject) {
    try {
      const collection = await userConnection.getCollection();
      const result = await collection.findOne(body)
      if (result) {
        const token = jwt.sign(result, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds
        })
        resolve(token)
      } else {
        reject("Not found")
      }
    } catch (ex) {
      reject(ex)
    }
  });
}


/**
 * Get info about a user using a JWT
 * 
 *
 * returns User
 **/
exports.userInfo = function (token) {
  return new Promise(async function (resolve, reject) {
    try{
      const decoded = jwt.decode(token)
      const user = {email: decoded.email, password: decoded.password}
      const collection = await userConnection.getCollection();
      const result = await collection.findOne(user)
      if (result) {
        resolve(result)
      } else {
        reject("Not found")
      }
      resolve();
    }catch(ex){
      reject(ex)
    }
  });
}

