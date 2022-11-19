import { useForm } from 'react-hook-form'
import { api } from "../services/api";
import { toast } from "react-toastify";
import Router from 'next/router';
import Head from 'next/head';

export const FormTransanction = () => {

    const { register, handleSubmit } = useForm();

    function handleForm(data: any) {
        let { username, value } = data;
        value = value.replace(',', '.');

        api.post('/transaction', {
            value,
            username
        }).then((res) => {
            toast.success('Transferência concluida!');
            Router.push('/');
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    return (
        <>
            <Head>
                <title>Transaction</title>
            </Head>
            <form onSubmit={handleSubmit(handleForm)}>
                <label className="block mb-2 text-sm font-medium text-white">Username</label>
                <div className="flex pb-4">
                    <span className="inline-flex items-center px-3 text-sm  rounded-l-md border border-r-0 bg-gray-600 text-gray-400 border-gray-600">
                        @
                    </span>
                    <input
                        {...register('username')}
                        type="text"
                        className="rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                        placeholder="Nome do usuário" />
                </div>
                <label className="block mb-2 text-sm font-medium text-white">Valor</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm rounded-l-md border border-r-0 bg-gray-600 text-gray-400 border-gray-600">
                        R$
                    </span>
                    <input
                        {...register("value", {
                            min: 0.1,
                            required: true
                        })}
                        type="text"
                        required
                        className="rounded-none rounded-r-lg block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Valor da transferência" />
                </div>
                <button
                    type="submit"
                    className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Transferir
                </button>
            </form>
        </>
    )
}