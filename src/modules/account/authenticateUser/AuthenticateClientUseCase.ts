import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string
}


export class AuthenticateClientUseCase {
  async execute({username, password}: IAuthenticateClient) {
    // Recebee username e password

    // Verificar se username e senha estão corretos

    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error("Username or password invalid!")
    }

    // Verificar se a senha está correta para o username informado

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Gerar o token

    const token = sign({username}, "019acc25a4e242bb55ad489832ada12d", {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}