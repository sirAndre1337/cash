import Link from "next/link"

interface IHeader {
  logOut: () => void
  userName?: string
}

export const Header = ({ logOut, userName }: IHeader) => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          <Link href="/">
            <span className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Dashboard
            </span>
          </Link>
          <Link href="/transaction">
            <span className="text-white px-1 md:px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Transferir
            </span>
          </Link>
          <span className="invisible flex-1" />
          <span className="hidden md:flex text-white py-2 lg:ml-20 rounded-md text-xs font-medium">
            @{userName}
          </span>
          <span onClick={() => logOut()} className="text-white px-1 md:px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer">
            LogOut
          </span>
        </div>
      </div>
    </div>
  )
}