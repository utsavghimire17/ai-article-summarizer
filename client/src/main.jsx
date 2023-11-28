import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './App.css'
import { store } from './services/store'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './Routes.jsx'
import DataProvider from './context/DataProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
    <AppRouter />
    </Provider>
  </React.StrictMode>
)
