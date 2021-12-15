import { UserType } from './../../utils/vars/user/userVars';
import { generateJWT, verifyUserByToken } from './../../helpers/security/jwt/jwtHelper';
import { encryptString } from './../../helpers/security/encryption/encryptHelper';
import { responseGenerator } from './../../helpers/remote/response/responseGenerator';
import { Request, Response } from 'express';
import { userModel } from "../../models/user/userModel";
import { JwtPayload } from 'jsonwebtoken';


export const createUserController = async (req: Request, res: Response) => {
  const user: UserType = {
    username: req.body?.username,
    password: req.body?.password,
  }

  try {
    const newPasswordGenerated: string = encryptString(user.password)

    const creationResult = await userModel.create({
      ...user,
      password: newPasswordGenerated
    })

    const token = generateJWT({
      _id: creationResult?._id,
      ...user
    })

    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        ...creationResult,
        token
      }
    })
  } catch (error) {
    responseGenerator(res, {
      url: req.url,
      status: 500,
      result: true,
      data: {
      }
    })
  }
}

export const getUserData = async (req: Request, res: Response) => {
  const user: string | JwtPayload | null | object = verifyUserByToken(req.body?.token)


  if (user !== null) {

    try {
      const userFounded = await userModel.findOne({ _id: user?._id || '' })

      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...userFounded
        }
      })
    } catch (error) {
      responseGenerator(res, {
        url: req.url,
        status: 500,
        result: false,
        data: {
          message: 'Erro no servidor',
          error: String(error)
        }
      })
    }
  }
}

export const updateUserData = async (req: Request, res: Response) => {
  const user: string | JwtPayload | null | object = verifyUserByToken(req.body?.token)
  const newPasswordGenerated: any = encryptString(req.body?.password)

  const newUserData = {
    username: req.body?.username,
    password: newPasswordGenerated,
    desires: req.body?.desires
  }

  if (user !== null) {
    try {

      const userUpdated = await userModel
        .updateOne({
          _id: user?._id || ''
        }, {newUserData})

      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...userUpdated
        }
      })
    } catch (error) {
      responseGenerator(res, {
        url: req.url,
        status: 500,
        result: false,
        data: {
          message: 'Erro no servidor',
          error: String(error)
        }
      })
    }
  }
}