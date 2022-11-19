import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/AuthContext'
import { api } from '../services/api'
import { Header } from '../components/Header'
import Router from "next/router"
import { toast } from "react-toastify"
import { destroyCookie } from "nookies"

interface ILayout {
  children?: any
}

export default function Layout({ children }: ILayout) {
  const [balance, setBalance] = useState();

  const { logOut , user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/balance')
      .then(res => {
        const newBalance = res.data.replace('.' , ',')
        setBalance(newBalance);
      }).catch((err) => {
        destroyCookie(undefined, 'token')
        toast.error(err.response.message)
        Router.push('/');
      })
  }, [])

  return (
    <div>
      <Header logOut={logOut} userName={user?.username}/>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-gray-700 pb-4">
          <span className="text-2xl font-bold text-gray-200 ">Saldo <span className='text-lg'>R$ </span>{balance}</span>
        </div>
      </div>
      <main>
        <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}