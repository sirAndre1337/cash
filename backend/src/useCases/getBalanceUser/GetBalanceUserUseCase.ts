import { cliente } from "../../prisma/client"

interface IBalanceRequest {
    userId : number
}

class GetBalanceUserUseCase {
    async execute ({userId} : IBalanceRequest) {
        const user = await cliente.user.findFirst({
            where : {
                id : userId
            }
        })

        if(!user) {
            throw new Error("Token invalid!")
        }

        const account = await cliente.account.findFirst({
            where : {
                id :  user.accountId
            }
        })

        if(!account) {
            throw new Error(`Account for user ${user.username} not found!`)
        }

        return account.balance;
    }
}

export { GetBalanceUserUseCase }