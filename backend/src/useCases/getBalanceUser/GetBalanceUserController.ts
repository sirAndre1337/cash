import { Request, Response } from "express";
import { GetBalanceUserUseCase } from "./GetBalanceUserUseCase";
import { getIdFromTokenJWT } from "../../utils/utils"

class GetBalanceUserController {
    async handle(request: Request, response: Response) {
        const userId = getIdFromTokenJWT(request);

        const getBalanceUserUseCase = new GetBalanceUserUseCase();

        const balance = await getBalanceUserUseCase.execute({
            userId
        });

        return response.json(balance.toFixed(2));
    }
}

export { GetBalanceUserController }