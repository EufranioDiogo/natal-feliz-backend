export type requestBody = {
  url: string,
  token: string,
  data?: object
}

export type responseBody = {
  url: string,
  status: number,
  result: boolean,
  data: object
}