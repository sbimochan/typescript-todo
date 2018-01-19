import  * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';

export function generateTokens(data:{}) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

export function generateAccessToken(data:{}) {
  return jwt.sign(
    {
      userId: data
    },
    process.env.SECRET_KEY,
    { expiresIn: 30 * 60 }
  );
}

/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data:{}) {
  return jwt.sign(
    {
      userId: data
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: '7d' }
  );
}

/**
 * Verify access token.
 *
 */
export function verifyAccessToken(token:{}) {
  return jwt.verify(token, process.env.SECRET_KEY, function(err, decode) {
    //  console.log('token',err);
    if (!err) {
      return decode;
    } else if (err.name === 'TokenExpiredError') {
      throw  Boom.unauthorized('token expired');
    } else {
      throw  Boom.unauthorized();
    }
  });
}

/**
 * Verify refresh token.
 *
 */
export function verifyRefreshToken(token:{}) {
  return jwt.verify(token, process.env.REFRESH_SECRET_KEY, function(
    err:any,
    decode:object
  ) {
    if (!err) {
      return decode;
    } else if (err.name === 'TokenExpiredError') {
      throw  Boom.unauthorized('refresh token expired');
    } else {
      throw  Boom.unauthorized('');
    }
  });
}
