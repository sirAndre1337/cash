import { Request, Response } from "express";
import { UserTransactionUseCase } from "./UserTransactionUseCase";
import { getIdFromTokenJWT } from "../../utils/utils"



class UserTransactionController {
    async handle(request: Request, response : Response) {
        let { value, username } = request.body;
        value = parseFloat(value)
        const userId = getIdFromTokenJWT(request);

        const userTransactionUseCase = new UserTransactionUseCase();

        const balance = await userTransactionUseCase.execute({
            userId,
            username,
            value
        });

        return response.json(balance);
   }
}

export { UserTransactionController }