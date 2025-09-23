import React, { useEffect, useState } from "react"
import PasswordInput from "../../components/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loading, currentUser } = useSelector((state) => state.user)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter your password.")
      return
    }

    setError(null)

    // SignUp API call
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      })

      // handle successful sign-up response
      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/")
    }
  }, [currentUser])

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40 hidden sm:block" />

      <div className="container h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 mx-auto">
        <div className="hidden md:flex md:w-1/2 h-[90vh] items-end bg-[url('https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center rounded-lg p-6 lg:p-10 z-50">
          <div>
            <h4 className="text-3xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
              Create Your <br /> Travel Stories
            </h4>

            <p className="text-sm lg:text-[15px] text-white leading-6 pr-4 lg:pr-7 mt-4">
              Record your travel experiences and memories in your travel journey
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-auto md:h-[75vh] bg-white rounded-lg md:rounded-l-none md:rounded-r-lg relative p-6 sm:p-8 md:p-10 lg:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-7">Create Your Account</h4>

            <input
              type="text"
              placeholder="Enter Your Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {loading ? (
              <p className="animate-pulse w-full text-center btn-primary text-sm sm:text-base">
                LOADING...
              </p>
            ) : (
              <button type="submit" className="btn-primary text-sm sm:text-base">
                SIGN UP
              </button>
            )}

            <p className="text-xs text-slate-500 text-center my-3 sm:my-4">Or</p>

            <button
              type="submit"
              className="btn-primary btn-light text-sm sm:text-base"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            
            <p className="text-xs text-slate-500 text-center mt-4 sm:mt-6 mb-2">Want to see public grievances?</p>
            <button
              type="button"
              className="btn-primary btn-light bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs sm:text-sm"
              onClick={() => navigate("/public")}
            >
              VIEW PUBLIC GRIEVANCES
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
