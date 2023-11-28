import React from 'react'
import DataProvider from './context/DataProvider'
import Login from './components/Login'
import './App.css'


const App = () => {
  return (
    <DataProvider>
    <main>
        <div className= "main">
       
        <div className= "gradient" />
        </div>
        <div className="app">
            <Page />
            <Login />
        </div>
    </main>
    </DataProvider>

 

     
  )
}

export default App