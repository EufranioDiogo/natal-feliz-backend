import { verifyUserByToken } from './../../helpers/security/jwt/jwtHelper';
import {Request, Response} from 'express'
import { responseGenerator } from '../../helpers/remote/response/responseGenerator';

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

export const loginUser = (req: Request, res: Response) => {

}

export const logoutUser = (req: Request, res: Response) => {

}
