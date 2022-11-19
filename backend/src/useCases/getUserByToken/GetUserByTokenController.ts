import { Request, Response } from "express";
import { getIdFromTokenJWT } from "../../utils/utils";
import { GetUserByTokenUseCase } from "./GetUserByTokenUseCase";


class GetUserByTokenController {
    async handle(request: Request, response: Response) {
        const userId = getIdFromTokenJWT(request);

        const getUserByTokenUseCase = new GetUserByTokenUseCase();

        const user = await getUserByTokenUseCase.execute({userId})

        return response.json(user);
    }
}

export { GetUserByTokenController }