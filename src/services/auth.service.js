const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const User = require('./users.service');
const service = new User();
const pool = require('../../db');
const bcryp = require('bcrypt');

require('dotenv').config();

class Auth {
  async authenticateUser(email, password) {
    const user = await service.getUserByEmail(email);
    if(!user) throw boom.unauthorized('Email incorrecto');

    const passwordMatch = await bcryp.compare(password, user.password);
    if(!passwordMatch) throw boom.unauthorized('Password incorrecto');

    delete user.password;
    return user;
  }

  async registerUser(data) {
    const hashPassword = await bcryp.hash(data.password, 10);
    console.log(hashPassword);
    const newUser = {
      username: data.username,
      password: hashPassword,
      email: data.email,
      role: data.role
    }
    const info = await service.createNewUser(newUser);
    delete newUser.password;
    newUser.id = info.newId;
    return newUser;
  }

  async setToken(data) {
    const payload = {
      sub: data.id,
      role: data.role,
      username: data.username
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '4d'});
    return {user: data, token};
  }

}

module.exports = Auth;