import { CalendarIcon, FilterIcon } from '@heroicons/react/solid'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IFilter {
    selectDate : Date | null
    handleChangeSelectDate : (date : Date | null) => void
    cash : string | undefined
    handleChangeCash : (value : string | undefined) => void
    cleanFilters: (event : any) => void
}

export const FilterTransactions = ({ selectDate , handleChangeSelectDate, cash, handleChangeCash, cleanFilters} : IFilter) => {
    return (
        <form onSubmit={cleanFilters}>
                <div className="flex flex-col lg:flex-row mb-4 items-center gap-8 ">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        <DatePicker
                            selected={selectDate}
                            onChange={date => handleChangeSelectDate(date)}
                            dateFormat="dd/MM/yyyy"
                            // maxDate={new Date()}
                            className="bg-gray-800 text-gray-200 text-sm rounded-lg pl-5 p-1.5 overflow-auto"
                        />
                    </div>
                    {/* <div className='flex lg:flex-row flex-col gap-6'> */}
                    <div className="flex items-center">
                        <input
                            type="radio"
                            value="onlyCredited"
                            onChange={e => handleChangeCash("onlyCredited")}
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            checked={cash === 'onlyCredited'}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-400">Transferências recebidas</label>
                    </div>
                    <div className="flex items-center flex-1">
                        <input
                            onChange={e => handleChangeCash("onlyDebited")}
                            type="radio"
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            checked={cash === 'onlyDebited'}
                        />
                        <label className=" ml-2 text-sm font-medium text-gray-400">Transferências enviadas</label>
                    </div>
                    <div className="flex items-center flex-1">
                        <input
                            onChange={e => handleChangeCash(undefined)}
                            type="radio"
                            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            checked={cash === undefined}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-400">Todas as Transferências</label>
                    {/* </div> */}
                    </div>
                    <button
                        className="group relative w-full lg:w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <FilterIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
                        </span>
                            <span>Limpar Filtros</span> 
                    </button>
                </div>
            </form>
    )
}