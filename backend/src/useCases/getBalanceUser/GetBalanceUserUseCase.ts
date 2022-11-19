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
            throw new Error("User not found!")
        }

        const account = await cliente.account.findFirst({
            where : {
                id :  user.accountId
            }
        })

        if(!account) {
            throw new Error("Account not found!")
        }

        return account.balance;
    }
}

export { GetBalanceUserUseCase }