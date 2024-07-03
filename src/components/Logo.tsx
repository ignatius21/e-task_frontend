import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={'/'} className=" flex justify-center flex-col items-center">
      <img src="/images/dashboardLogo.png" alt="logotipo e-task" className=" w-[180px]"/>
      <p className="font-bold text-5xl mt-3 text-gray-400">E -<span className="text-sky-700">Task</span></p>
    </Link>
  )
}

export default Logo