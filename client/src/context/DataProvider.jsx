import React, { createContext, useContext } from 'react';
import { useState } from 'react';

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
 const [name,setName] = useState('')

  return (
    <DataContext.Provider value={{name,setName}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
