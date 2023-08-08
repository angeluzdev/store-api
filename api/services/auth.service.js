const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const User = require('./users.service');
const service = new User();
const nodemailer = require('nodemailer');
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

  async sendMailR(data) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, 
      port: 465,
      auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail(data);
    return {message: 'send email succesful'};
  }

  async sendRecoveryPassword(email) {
    const user = await service.getUserByEmail(email);
    if(!user) throw boom.unauthorized('Email no existente');
    
    const recoveryToken = jwt.sign({sub: user.id}, process.env.SECRET_KEY, {expiresIn: '30min'});
    const recoveryLink = 'http://localhost:4000/change-password?token='+recoveryToken;
    await service.updateUser({recovery_token: recoveryToken}, user.id);
    const mail = {
      from: 'kevinangelosalazar@gmail.com', 
      to: `${user.email}`, 
      subject: "RECUPERACION DE CONTRASEÑA",
      Text: `Has solicitado una recuperación de contraseña asociada al correo -> ${user.email}`,
      html: `<b>Ingresa aqui -> ${recoveryLink}</b>`, 
    }
    const message = await this.sendMailR(mail);
    return message;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);

      const user = await service.getSingleUser(payload.sub);
      if(user[0].recovery_token !== token) throw boom.badRequest('Token error');
  
      const hashNewPassword = await bcryp.hash(newPassword, 10);
      const message = await service.updateUser({password: hashNewPassword, recovery_token: null}, payload.sub);
      return message; 
    } catch (error) {
      throw boom.unauthorized(error.message);
    }
  }

}

module.exports = Auth;