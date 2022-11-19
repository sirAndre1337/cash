import Head from "next/head"
import { api } from "../services/api"
import { useState, useEffect, useContext, Fragment } from "react"
import { AuthContext } from "../context/AuthContext"
import { destroyCookie } from "nookies"
import { toast } from "react-toastify"
import Router from "next/router"
import { FilterTransactions } from "./FiltersTransactions"
import { format, parse } from "date-fns"


type Transfer = {
    id: number,
    value: number,
    createdAt: string;
    debitedAccountId: number
    creditedAccountaId: number
    userNameDebited: string
    userNameCredited: string
}

export const TableTransactions = () => {
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [selectDate, setSelectDate] = useState<Date | null>(null);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [cash, setCash] = useState<string | undefined>(undefined);

    const { user } = useContext(AuthContext);

    const cleanFilter = (event: any) => {
        event.preventDefault();
        setSelectDate(null);
        setCash(undefined);
    }

    const handleChangeCash = (paramcash: string | undefined) => {
        setCash(paramcash);
    }

    const handleChangeSelectDate = (date: Date | null) => {
        setSelectDate(date)
    }

    const findTransfers = () => {
        let sql = '/getUserTransaction?'

        if (selectDate) {
            const data = selectDate.toISOString();
            sql += `date=${data}`
        }

        if (cash) {
            if (cash === 'onlyCredited') {
                sql += '&onlyCredited=true';
            }
            if (cash === 'onlyDebited') {
                sql += '&onlyDebited=true';
            }
        }
        api.get(sql)
            .then(res => {
                if (res.data.message) {
                    setMessage(res.data.message)
                    setTransfers([])
                } else {
                    setMessage(undefined)
                    setTransfers(res.data);
                }
            }).catch((err) => {
                destroyCookie(undefined, 'token')
                toast.error(err.response.message)
                Router.push('/');
            })
    }

    useEffect(() => {
        findTransfers();
    }, [selectDate, cash])

    return (
        <div className="overflow-x-auto rounded-lg">
            <Head>
                <title>Dashboard</title>
            </Head>
            <FilterTransactions cleanFilters={cleanFilter} cash={cash} handleChangeCash={handleChangeCash} selectDate={selectDate} handleChangeSelectDate={handleChangeSelectDate} />
            {!message ?
                <table className="w-full text-sm text-left text-gray-400">
                    <tbody>
                        {transfers?.map((transfer) => {
                            const newDate = transfer.createdAt.split('T')[0]
                            return (
                                <Fragment key={transfer.id}>
                                    <tr className="max-md:flex max-md:flex-col border-b bg-gray-800 border-gray-700">
                                        <th scope="row" className={`max-md:p-2 max-md:text-center max-md:font-bold py-4 px-6 font-medium  ${user?.username === transfer.userNameCredited ? 'text-green-500' : 'text-red-400'}`}>
                                            {user?.username === transfer.userNameCredited ? 'Transferência recebida' : 'Transferência enviada'}
                                        </th>
                                        <td className="max-md:p-2 max-md:text-center max-md:font-bold py-4 px-6">
                                            @{user?.username === transfer.userNameCredited ? transfer.userNameDebited : transfer.userNameCredited}
                                        </td>
                                        <td className="max-md:p-2 max-md:text-center max-md:font-bold py-4 px-6">
                                            {format(new Date(parse(newDate, 'yyyy-MM-dd', new Date()).toISOString()), 'dd/MM/yyyy')}
                                        </td>
                                        <td className="max-md:p-2 max-md:text-center max-md:font-bold py-4 px-6">
                                            R$ {String(transfer.value).replace('.', ',')}
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table> : message}
        </div>
    )
}