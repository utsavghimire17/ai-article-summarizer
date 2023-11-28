import React from 'react'
import { logo } from '../assets'
import { useNavigate } from 'react-router-dom';
// import { useData } from "../context/DataProvider";





const Hero = () => {
  const navigate = useNavigate();
  // const { name,setName } = useData();
  const getUserNameFromCookie = () => {
    const cookies = document.cookie.split(';');
    const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));
  
    if (usernameCookie) {
      return usernameCookie.split('=')[1].trim();
    }
  
    return null;
  
  }

  const handlelogOut = () => {
    navigate('/')
  }
  

  const username = getUserNameFromCookie();

  // console.log(name)
  return (
    <div>
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src={logo} alt="sumz_logo" className= "w-28 object-contain"/>
            <p className="text-3xl text-bold font-bold mt-3 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 inline-block text-transparent bg-clip-text">Welcome {username}!</p>
            <button className="black_btn" type = "button" onClick = {handlelogOut}>
              Logout
            </button>
        </nav> 
    
        <h1 className="head_text">Summarize Articles with <br className= 'max-md:hidden' />
    <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 inline-block text-transparent bg-clip-text">SUMZ</span>
    </h1>
    <h2 className="descc  text-2xl">
        Simplify your reading with Sumz, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
    </h2>
    <h2 className="desc mt-10  text-2xl">
        How do you want to summarize your text?
    </h2>
    </header>
    </div>
  )
}

export default Hero