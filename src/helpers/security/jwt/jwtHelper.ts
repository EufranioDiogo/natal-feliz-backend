import { UserType } from './../../../utils/vars/user/userVars';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface JwtPayload {
  _id: string
}

dotenv.config();

export const generateJWT = (user: UserType) => {
  const accessToken: string = jwt.sign({
    _id: user._id,
    username: user.username,
    password: user.password
  },
    process.env.JWT_SECRET || 'djnjdsn3jsnj',
    {
      expiresIn: '48h'
    });

  return accessToken;
}

export const verifyUserByToken = (accessToken: string) => {
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET || '') as JwtPayload;

    return user
  } catch (error) {
    return null
  }
}