import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string
}

export class CreateClientUseCase {
  async execute({username, password}: ICreateClient) {
    // Validar se o usuario existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    if (clientExist) {
      throw new Error("Client already exists!")
    }
    // Criptografar senha
    const hashPassword = await hash(password, 10)

    // Salvar o cliente no DB
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}