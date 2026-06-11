import  {useState,createContext} from "react";
export const authContext = createContext();



const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(null);
  const [isAuthenticated,setIsAuthenticated]  = useState(null);
  const [error,setError] = useState(null);
  const [skeletonLoading,setSkeletonLoading] = useState(null)

  return (
    <authContext.Provider value={{user,loading,isAuthenticated,error,skeletonLoading,setUser,setLoading,setIsAuthenticated,setError,setSkeletonLoading}}>
        {children}
    </authContext.Provider>
  )
}

export default  AuthContextProvider

