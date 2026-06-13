import  {useState,createContext ,useEffect} from "react";
export const authContext = createContext();
import {getMeUserProfileAPI} from "./services/auth.api"


const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated,setIsAuthenticated]  = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  
   useEffect(() => {
    getMeUserProfileAPI()
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        // No active session — perfectly fine
      })
      .finally(() => setIsInitializing(false));
  }, []);


  return (
    <authContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated,isInitializing}}>
        {children}
    </authContext.Provider>
  )
}

export default  AuthContextProvider

