import { hash } from "bcryptjs";
import { cliente } from "../../prisma/client";

interface IuserRequest {
    username: string
    password: string
}

class CreateUserUseCase {
    async execute({username, password} : IuserRequest) {
        if(!username) {
            throw new Error("Username field is a mandatory attribute");
        }

        if(!password) {
            throw new Error("Password field is a mandatory attribute");
        }

        if(username.length < 3){
            throw new Error("Username must have at least 3 characters");
        }

        const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}/;

        if(!regex.test(password)) {
            throw new Error("Password must have at least 8 characters a number and a capital letter");
        }   

        const userExists = await cliente.user.findFirst({
            where: {
                username
            }
        })

        if(userExists) {
            throw new Error("User already exists!")
        }

        const account = await cliente.account.create({
            data: {
                balance : 100.00
            }
        })

        const passwordHash = await hash(password, 8);

        const user = await cliente.user.create({
            data: {
                username,
                password : passwordHash,
                accountId : account.id
            }
        })

        return user;
    }
}

export { CreateUserUseCase };