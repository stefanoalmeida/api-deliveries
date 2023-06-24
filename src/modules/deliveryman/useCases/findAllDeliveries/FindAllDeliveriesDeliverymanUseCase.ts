import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesDeliverymansUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        Deliveries: true,
        id: true,
        username: true
      }
    })

    return deliveries
  }
}