import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
const [loggedInUser, setLoggedInUser] = useState(window.localStorage.getItem('NC_NEWS_APP'));

return <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
  {children}
</UserContext.Provider>
};