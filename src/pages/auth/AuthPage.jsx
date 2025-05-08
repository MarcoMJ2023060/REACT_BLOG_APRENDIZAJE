import { useState } from "react"
import { Login } from '../../components/Login'
import { Register } from '../../components/Register'

import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handlerAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className="auth-container">
      {isLogin ? (
        <Login switchAuthHandler={handlerAuthPageToggle}/>
      ) : (
        <Register switchAuthHandler={handlerAuthPageToggle}/>
      )}
    </div>
  )
}
