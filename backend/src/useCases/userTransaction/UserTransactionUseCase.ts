import { cliente } from "../../prisma/client";

interface IUserTransaction {
    userId: number
    value: number
    username: string;
}

class UserTransactionUseCase {
    async execute({userId, username, value} : IUserTransaction) {
        
        const userDebited = await cliente.user.findFirst({
            where : {
                id: userId
            }
        })

        if(!userDebited) {
            throw new Error("User not Found!");
        }

        const accountDebited = await cliente.account.findFirst({
            where : {
                id : userDebited.accountId
            }
        })

        if(!accountDebited) {
            throw new Error("User has no account");
        }

        if(value > accountDebited.balance) {
            throw new Error("Insufficient balance for this transaction");
        }

        if(username === userDebited.username) {
            throw new Error("You cant transfer to yourself");
        }

        const userCredited = await cliente.user.findFirst({
            where : {
                username
            }
        }) 

        if(!userCredited) {
            throw new Error("User invalid!");
        }

        const accountCredited = await cliente.account.findFirst({
            where : {
                id : userCredited.accountId
            }
        })

        const newAccountCredited = {...accountCredited};
        const newAccountDebited = {...accountDebited};
        newAccountDebited.balance -= value;
        newAccountCredited.balance += value;

        await cliente.account.update({
            where : {
                id : userCredited.accountId
            },
            data : {...newAccountCredited}
        })

        await cliente.account.update({
            where : {
                id : userDebited.accountId
            },
            data : {...newAccountDebited}
        })

        await cliente.transaction.create({
            data : {
                value,
                debitedAccountId : accountDebited.id,
                creditedAccountId : accountCredited.id,
                userNameCredited: username,
                userNameDebited: userDebited.username,
                createdAt: new Date().toISOString()
            }
        })

        return newAccountDebited.balance
    }
}

export { UserTransactionUseCase }