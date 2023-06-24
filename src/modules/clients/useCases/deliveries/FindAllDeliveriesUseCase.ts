import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = prisma.clients.findMany({
      where: {
        id: id_client
      },
      select: {
        Deliveries: true,
        id: true,
        username: true,
      }
    })

    return deliveries
  }
}