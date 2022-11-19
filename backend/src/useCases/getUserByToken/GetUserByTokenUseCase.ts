import { cliente } from "../../prisma/client"

interface IUserId {
    userId : number
}

class GetUserByTokenUseCase {
    async execute({userId} : IUserId) {
        const userExists = await cliente.user.findFirst({
            where : {
                id: userId
            }
        })

        if(!userExists) {
            throw new Error("User not found!")
        }

        const user = {id: userExists.id, username: userExists.username }
        return { user };
    }
}

export { GetUserByTokenUseCase }