import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({children})=>{
    const [searchQuery, setSearchQuery] = useState('');
    const searchItem = (arr)=>{
        return(
          arr.filter(item=>{
            return searchQuery === '' ? item : Object.values(item)
              .join(' ')
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          })
        )
      }
    
    return(
        <SearchContext.Provider value={{searchItem, setSearchQuery}} >
            {children}
        </SearchContext.Provider>
    )
}