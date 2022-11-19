import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { cliente } from "../../prisma/client"

interface IuserRequest {
    username: string
    password: string
}

class AuthenticateUserUseCase {

    async execute ({username, password} : IuserRequest) {

        if(!username) {
            throw new Error("Username field is a mandatory attribute");
        }

        if(!password) {
            throw new Error("Password field is a mandatory attribute");
        }

         const userExists = await cliente.user.findFirst({
            where: {
                username
            }
        })

        if(!userExists) {
            throw new Error('User or password incorrect!')
        }

        const passwordMatch = await compare(password,  userExists.password)

        if(!passwordMatch) {
            throw new Error('User or password incorrect!')
        }

        const token = sign({id: userExists.id}, 'cb07bfc9-42db-4087-85e8-a6636e39f62d', {
            subject :  userExists.id.toString(),
            expiresIn: '24h'
        });

        const user = {id : userExists.id, username: userExists.username}
        return { token, user }
    }
}

export { AuthenticateUserUseCase }