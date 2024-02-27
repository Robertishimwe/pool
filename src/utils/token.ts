import jwt from 'jsonwebtoken';

interface TokenData {
  [key: string]: any;
}

interface TokenOptions {
  secret: string;
  expiresIn?: string | number;
}

class Token {
  static generateToken(data: TokenData, { secret, expiresIn }: TokenOptions): string {
    return jwt.sign(data, secret, { expiresIn });
  }

  static verifyToken(token: string, secret: string): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
      return 'Invalid token';
    }
  }
}

export default Token;
