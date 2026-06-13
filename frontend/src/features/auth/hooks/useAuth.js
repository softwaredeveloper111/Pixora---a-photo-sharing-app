import {registerUserAPI,loginUserAPI,logoutUserAPI} from "../services/auth.api"
import {authContext} from "../auth.context"
import {useContext , useCallback} from "react"
import useAsync from "../../shared/useAsync"

const useAuth = () => {
  
const {user,setUser,isAuthenticated,setIsAuthenticated , isInitializing,} = useContext(authContext);
const {loading,error,run} = useAsync()

/** register a user */
  const registerUser = useCallback(async (data) => {
    return await run(async () => {
      const res = await registerUserAPI(data);
      setUser(res.data);
      setIsAuthenticated(true);
      return res;
    });
  }, [run, setUser, setIsAuthenticated]);


/** login a user */
  const loginUser = useCallback(async (data) => {
    return await run(async () => {
      const res = await loginUserAPI(data);
      setUser(res.data);
      setIsAuthenticated(true);
      return res;
    });
  }, [run, setUser, setIsAuthenticated]);



/**logout a user */
  const logoutUser = useCallback(async () => {
    return await run(async () => {
      await logoutUserAPI();
      setUser(null);
      setIsAuthenticated(false);
    });
  }, [run, setUser, setIsAuthenticated]);


  return ({

   // --- State ---
    user,
    isAuthenticated,
    isInitializing,
    loading,
    error,
    // --- Actions ---
    registerUser,
    loginUser,
    logoutUser,

  })
}

export default useAuth