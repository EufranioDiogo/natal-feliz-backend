import { responseBody } from '../../../utils/vars/remote/RemoteVars';

export const responseGenerator = (res: Response, responseBody: responseBody) => {
  return {
    ...responseBody,
    metadata: {
      requestDate: new Date().getDate()
    }
  }
}