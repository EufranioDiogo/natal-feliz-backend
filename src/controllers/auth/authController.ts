import { compareEncryptedStringToNormal } from './../../helpers/security/encryption/encryptHelper';
import { userModel } from './../../models/hiddenFriend/hiddenFriendModel';
import { verifyUserByToken, generateJWT } from './../../helpers/security/jwt/jwtHelper';
import { Request, Response } from 'express'
import { responseGenerator } from '../../helpers/remote/response/responseGenerator';
import { UserType } from '../../utils/vars/user/userVars';

export const isAuthenticatedUser = (req: Request, res: Response) => {
  const user = verifyUserByToken(req.body?.token)

  if (user !== null) {
    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        message: 'User authenticated'
      }
    })
  } else {
    responseGenerator(res, {
      url: req.url,
      status: 403,
      result: false,
      data: {
        message: 'Not authenticated'
      }
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const user: UserType = {
    username: req.body?.username,
    password: req.body?.password,
  }

  const userFounded = await userModel.findOne({ username: user.username })

  if (compareEncryptedStringToNormal(userFounded?.password, user?.password)) {
    const token = generateJWT({
      _id: userFounded?._id,
      ...user
    })

    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        ...userFounded,
        token
      }
    })
  } else {
    responseGenerator(res, {
      url: req.url,
      status: 403,
      result: false,
      data: {
        message: 'Erro, dados inválidos'
      }
    })
  }
}

export const logoutUser = (req: Request, res: Response) => {
  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      message: 'Logout user'
    }
  })
}
