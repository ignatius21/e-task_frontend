import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={'/'}>
      <img src="/logo.svg" alt="logotipo e-task" />
    </Link>
  )
}

export default Logo