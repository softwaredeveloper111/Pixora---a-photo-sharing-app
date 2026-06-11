import {registerUserAPI,loginUserAPI,getMeUserProfileAPI,logoutOutUserAPI} from "../services/auth.api"
import {authContext} from "../auth.context"
import {useContext} from "react"
import {toast} from "react-toastify"

const useAuth = () => {
  
const {user,loading,isAuthenticated,error,skeletonLoading,setUser,setLoading,setIsAuthenticated,setError,setSkeletonLoading} = useContext(authContext)







  return ({



  })
}

export default useAuth