import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { responseGenerator } from '../../helpers/remote/response/responseGenerator'
import { verifyUserByToken } from '../../helpers/security/jwt/jwtHelper'
import { userModel } from '../../models/user/userModel'

export const isOwnerOfData = async (req: Request, res: Response, next: NextFunction) => {
  const user: string | JwtPayload | null | object = verifyUserByToken(req.body?.token)

  if (user !== null) {
    try {
      const userFounded = await userModel.findOne({ _id: user?._id || '' })


      if (userFounded !== null) {
        if (userFounded?._id === user?._id) {
          next()
        } else {
          responseGenerator(res, {
            url: req.url,
            status: 403,
            result: false,
            data: {
              message: 'Operação inválida, sem permissões'
            }
          })
        }
      } else {
        responseGenerator(res, {
          url: req.url,
          status: 403,
          result: false,
          data: {
            message: 'Usuário não autenticado'
          }
        })
      }
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