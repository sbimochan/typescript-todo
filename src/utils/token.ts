import boom from 'boom';
import httpError from 'http-status-codes';
import * as jwtGenerator from '../utils/jwt';

export function fetchTokens(params:string) {
  return jwtGenerator.generateTokens(params);
}

/**
 * Verify refresh token.
 *
 * @param token
 * @returns {string}
 */
export function verifyRefreshToken(token:string) {
  try {
    return jwtGenerator.verifyRefreshToken(token);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // await sessionService.destroy(token);
      throw boom.create(httpError.UNAUTHORIZED, 'Session Expired');
    }
    throw boom.create(httpError.UNAUTHORIZED, 'Invalid Token');
  }
}
/**
 * Return access token.
 *
 * @param params
 * @returns {string}
 */
export function fetchAccessToken(params:string) {
  return jwtGenerator.generateAccessToken(params);
}

export function verifyAccessToken(token:string) {
  try {
    return jwtGenerator.verifyAccessToken(token);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw boom.create(httpError.UNAUTHORIZED, 'Access token Expired');
    }
    throw boom.create(httpError.UNAUTHORIZED, 'Invalid Token');
  }
}