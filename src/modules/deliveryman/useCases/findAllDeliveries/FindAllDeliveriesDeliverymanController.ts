import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymansUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const {id_deliveryman} = request

    const findAllDeliveriesUseCase = new FindAllDeliveriesDeliverymansUseCase()

    const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)

    return response.json(deliveries)
  }
}