import { Request, Response } from "express";
import { getIdFromTokenJWT } from "../../utils/utils";
import { GetTransactionsUserUseCase } from "./GetTransactionsUserUseCase";

class GetTransactionsUserController {
    async handle(request: Request, response : Response) {
        const getTransactionsUserUseCase = new GetTransactionsUserUseCase();
        const userId = getIdFromTokenJWT(request);
        let { onlyDebited ,  onlyCredited , date }  =  request.query;
        onlyDebited = onlyDebited?.toString();
        onlyCredited = onlyCredited?.toString();
        date = date?.toString();

        const transactions = await getTransactionsUserUseCase.execute({
            userId,
            onlyDebited,
            onlyCredited,
            date

        });

        return response.json(transactions);
    }
}

export { GetTransactionsUserController }