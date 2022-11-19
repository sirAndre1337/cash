import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { username,password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();
        
        const  { token , user } = await authenticateUserUseCase.execute({
            username,
            password
        })

        return response.json({token , user});
    }
}

export { AuthenticateUserController }