import { responseGenerator } from './../../../helpers/remote/response/responseGenerator';
import { userHasHiddenFriendHelper, getUserHiddenFriendHelper, registerHiddenFriendRelationShipHelper, getUserHiddenFriendDesiresHelper } from './../../../helpers/hiddenFriend/hiddenFriendHelper';
import { getUserByTokenHelper, getRandomUserNotSelectedForHiddenFriendHelper } from './../../../helpers/user/userHelper';
import { Request, Response } from 'express';

export const getUserHiddenFriendController = async (req: Request, res: Response) => {
  const user = await getUserByTokenHelper(req.body?.token)

  if (await userHasHiddenFriendHelper(user?._id)) {
    const hiddenFriend = await getUserHiddenFriendHelper(user?._id)

    if (hiddenFriend !== null) {
      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          ...hiddenFriend
        }
      })
    } else {
      responseGenerator(res, {
        url: req.url,
        status: 200,
        result: true,
        data: {
          message: 'Sem amigo oculto'
        }
      })
    }
    
  } else {
    const hiddenFriend = await getRandomUserNotSelectedForHiddenFriendHelper()
    await registerHiddenFriendRelationShipHelper(user?._id, hiddenFriend._id)

    responseGenerator(res, {
      url: req.url,
      status: 200,
      result: true,
      data: {
        ...hiddenFriend
      }
    })
  }
}

export const getUserHiddenFriendDesiresController = async (req: Request, res: Response) => {
  const user = await getUserByTokenHelper(req.body?.token)
  
  const hiddenFriendDesires = await getUserHiddenFriendDesiresHelper(user?._id)

  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      ...hiddenFriendDesires
    }
  })
}

export const userHasHiddenFriendController = async (req: Request, res: Response) => {
  const user = await getUserByTokenHelper(req.body?.token)

  const hasHiddenFriend = await userHasHiddenFriendHelper(user?._id)

  responseGenerator(res, {
    url: req.url,
    status: 200,
    result: true,
    data: {
      hasHiddenFriend
    }
  })
}