import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Page from './components/Page';
import DataProvider from './context/DataProvider';

const AppRouter = () => {
  return (
    
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<DataProvider><Login /></DataProvider>} />
        <Route path="/page" element={<DataProvider><Page /></DataProvider>} />

      </Routes>
    </BrowserRouter>
   
  );
};

export default AppRouter;