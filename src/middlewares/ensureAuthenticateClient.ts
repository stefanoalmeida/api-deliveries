import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}


export async function ensureAuthenticateClient (request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }

  // Recebe Bearer na posição zero e o token na segunda
  const [, token] = authHeader.split(" ")

  try {
    const {sub} = verify(token, "019acc25a4e242bb55ad489832ada12d") as IPayload

    request.id_client = sub

    return next()
  } catch (error) {
    return response.status(401).json({
      message: "Invalid Token"
    })
  }
}