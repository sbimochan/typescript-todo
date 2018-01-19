import * as Boom from 'boom';
import User from '../models/user';
import Session from '../models/session';
import * as jwt from 'jsonwebtoken';
import * as jwtGenerator from '../utils/jwt';
/**
 * login
 */
interface Iuser {
  username:string,
  password:string
}
export function findUser(user:Iuser) {
  return new User({ username: user.username, password: user.password })
    .fetch()
    .then(user => {
      if (!user) {
        throw  Boom.notFound('User not found');
      }
      const payload = {
        id: user.attributes.id,
        password: user.attributes.password
      };
      let token = jwtGenerator.generateTokens(payload.id);
      token.userId = payload.id;
      return token;
    });
}
interface Idata {
  userId: number,
  refreshToken:string
}
export function saveSession(data:Idata) {
  return new Session({ user_id: data.userId, refresh_token: data.refreshToken })
    .save()
    .then(data => data.refresh())
    .catch(err => err);

  // return allToken;
}


export function deleteSession(userId: number) {
  return new Session({ user_id: userId })
    .fetch()
    .then(session => session.destroy());
}
