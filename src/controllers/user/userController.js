import { getUserByTokenHelper, createUserHelper } from '../../helpers/user/userHelper';
import { UserType } from '../../utils/vars/user/userVars';
import { generateJWT, verifyUserByToken } from '../../helpers/security/jwt/jwtHelper';
import { encryptString } from '../../helpers/security/encryption/encryptHelper';
import { responseGenerator } from '../../helpers/remote/response/responseGenerator';
import { UserModel } from "../../models/user/userModel";


export const createUserController = async (req, res) => {
  const user: UserType = {
    username: req.body?.username,
    password: req.body?.password,
  }

  try {
    const newUser = new UserModel(user)

    UserModel
      .create(newUser)
      .then(() => {
        console.log('Creation ', newUser)
        const token = generateJWT({
          _id: newUser?._id,
          ...user
        })

        res.json(
          responseGenerator(res, {
            url: req.url,
            status: 200,
            result: true,
            data: {
              ...newUser,
              token
            }
          }))
      })
      .catch((err: any) => {
        console.log(err)
        res.json(
          responseGenerator(res, {
            url: req.url,
            status: 500,
            result: false,
            data: {
              err
            }
          }))
      })

  } catch (error) {
    console.log(error)
    responseGenerator(res, {
      url: req.url,
      status: 500,
      result: true,
      data: {
      }
    })
  }
}

export const getUserData = async (req, res) => {
  const user = await getUserByTokenHelper(req.body?.token)


  if (user !== null) {

    try {
      const userFounded = await UserModel.findOne({ _id: user?._id || '' })

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

export const updateUserData = async (req, res) => {
  const user = verifyUserByToken(req.body?.token)
  const newPasswordGenerated: any = encryptString(req.body?.password)

  const newUserData = {
    username: req.body?.username,
    password: newPasswordGenerated,
    desires: req.body?.desires
  }

  if (user !== null) {
    try {

      const userUpdated = await UserModel
        .updateOne({
          _id: user?._id || ''
        }, { newUserData })

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