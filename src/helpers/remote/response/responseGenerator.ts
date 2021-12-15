import { responseBody } from './../../../utils/vars/remote/RemoteVars';
import { Request, Response } from 'express'

export const responseGenerator = (res: Response, responseBody: responseBody) => {
  return {
    ...responseBody,
    metadata: {
      requestDate: new Date().getDate()
    }
  }
}