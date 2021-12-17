import { responseGenerator } from '../../helpers/remote/response/responseGenerator'
import { verifyUserByToken } from '../../helpers/security/jwt/jwtHelper'
import { UserModel } from '../../models/user/userModel'

export const isOwnerOfData = async (req, res, next) => {
  const user = verifyUserByToken(req.body?.token)

  if (user !== null) {
    try {
      const userFounded = await UserModel.findOne({ _id: user?._id || '' })


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