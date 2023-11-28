import React, { useState, useEffect } from "react";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import { API } from "../services/user-api";
import { signupErrors, loginErrors } from "../utils/error-handler"
import { useData } from "../context/DataProvider";


const signupValues = {
    name: '',
    email: '',
    password: ''
}
const loginValues = {
  email: '',
  password: ''
}

export const Login = () => {
  const [account, setAccount] = useState("login");
  const [signup,setSignup] = useState(signupValues);
  const [login,setlogin] = useState(loginValues);
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('')
  const [isVisible, setIsVisible] = useState(false)



  const navigate = useNavigate();

  useEffect(()=>{
    setIsVisible(true);

    const timer = setTimeout(() =>{
      setIsVisible(false);
    },5000);

    return () => clearTimeout(timer)
  },[success,account])

  useEffect(()=>{
   setError('')
  },[account])

  const toggleAccount = () => {
    setAccount(account === "login" ? "signup" : "login");
    if (account === "login") {
      setSignup(signupValues);
      setSuccess('')
    }else{
      setlogin(loginValues);
      setError('');
    }
  };
  
  const onInputChange = (e) => {
    setSignup({...signup, [e.target.name]: e.target.value});
    setlogin({...login, [e.target.name]: e.target.value});
    
  }

  const loginUser = async() => {

    if (!loginErrors(login)){
      try{
        let response = await API.userLogin(login)
          if (response.isSuccess){
        
          document.cookie = `username=${response.data.name}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}`
          document.cookie = `email=${login.email};  expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}`

          sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);


          navigate('/page')
          }
          else{
            setError('Something went wrong')
          }
      }catch(error){
        setError(error.message)
      }
    
    }
    else{
      setError(loginErrors(login))
    }
  }
  
  const signupUser =async () => {
      if(!signupErrors(signup)){
        try{
          let response = await API.userSignup(signup)
          if (response.isSuccess){
            setError('')
            setSuccess('User registered successfully')
            setSignup(signupValues)
            setAccount('login')
          }else{
          setError("Something went wrong! Please try again later.")
          setSuccess('')
          }
        } catch(error){
          setError(signupErrors(error))
        }
    }else{
      setError(signupErrors(signup))
    }
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-gradient">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Sumz"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {account === "login" ? "Sign in to your account" : "Register your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Login */}
        {account==='login'?
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); loginUser();}}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                onChange={(e) => onInputChange(e)}
                value= {login.email}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              {account === "login" && (
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                onChange={(e) => onInputChange(e)}
                required
                value= {login.password}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
        
          <button
              id="submit"
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
            
            {error &&
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
    {error}
  </div>
    }
            {success && isVisible &&
    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400" role="alert">
    User successfully registered.
  </div>
    }
   
          </div>  
        </form>
    :
    // Register account
    <form className="space-y-6">
    {account === "signup" && (
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Enter Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => onInputChange(e)}
            value= {signup.name}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    )}

    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={(e) => onInputChange(e)}
          value={signup.email}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
      </div>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={(e) => onInputChange(e)}
          value={signup.password}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
      {error && 
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
      {error}
    </div>}

    <div>
  
    <button
        id="submit"
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={(e) => {
          e.preventDefault(); // Prevent the form from submitting
          signupUser(); // Calling registration function
      }}

      >
        Register
      </button>
    
    </div>
  </form>
}
  

        <p className="mt-10 text-center text-sm text-gray-500">
          {account === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={toggleAccount}>
            {account === "login" ? "Register" : "Sign in"}
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login