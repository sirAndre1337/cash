import { cliente } from "../../prisma/client"

interface IUserTransaction {
    userId: number
    onlyDebited: string
    onlyCredited: string
    date: string
}

class GetTransactionsUserUseCase {
    async execute({ userId, onlyCredited, onlyDebited, date }: IUserTransaction) {
        const plus1day = new Date(date);
        const minus1day = new Date(date);

        plus1day.setDate(plus1day.getDate() + 1);
        minus1day.setDate(minus1day.getDate() - 1);

        const user = await cliente.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("User invalid!")
        }

        if (!onlyCredited && !onlyDebited && !date) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    OR: [
                        {
                            creditedAccountId: user.accountId
                        },
                        {
                            debitedAccountId: user.accountId
                        }
                    ]
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "User has not yet made any transactions" }
            }
            return transactions;
        }

        if (!onlyCredited && !date) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    debitedAccountId: user.accountId
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "No transactions" }
            }
            return transactions;
        }

        if (!onlyDebited && !date) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    creditedAccountId: user.accountId
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "No transactions" }
            }
            return transactions;
        }

        if (!onlyDebited && !onlyCredited) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    OR: [
                        {
                            creditedAccountId: user.accountId
                        },
                        {
                            debitedAccountId: user.accountId
                        }
                    ],
                    AND: [
                        {
                            createdAt: {
                                lt: plus1day,
                                gt: minus1day
                            }
                        }
                    ]
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "No transactions" }
            }
            return transactions;
        }

        if (!onlyDebited) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    creditedAccountId: user.accountId
                    ,
                    AND: {
                        createdAt: {
                            lt: plus1day,
                            gt: minus1day
                        }
                    }
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "No transactions" }
            }
            return transactions;
        }

        if (!onlyCredited) {
            const transactions = await cliente.transaction.findMany({
                where: {
                    debitedAccountId: user.accountId
                    ,
                    AND: {
                        createdAt: {
                            lt: plus1day,
                            gt: minus1day
                        }
                    }
                },
                orderBy : {
                    id : 'desc'
                }
            })
            if (transactions.length < 1) {
                return { message: "No transactions" }
            }
            return transactions;
        }
    }
}

export { GetTransactionsUserUseCase }