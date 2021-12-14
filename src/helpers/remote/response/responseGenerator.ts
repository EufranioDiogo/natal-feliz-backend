import { responseBody } from './../../../utils/vars/remote/RemoteVars';
import { Request, Response } from 'express'

export const responseGenerator = (res: Response, responseBody: responseBody) => {
  return res
    .status(responseBody.status)
    .json({
      ...responseBody,
      metadata: {
        requestDate: new Date().getDate()
      }
    })
}