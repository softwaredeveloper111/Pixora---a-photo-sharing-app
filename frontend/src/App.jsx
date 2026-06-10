
import AppRouter from './AppRouter'
import {registerUserAPI} from "./features/auth/services/auth.api"


const App = () => {
 
  console.log(registerUserAPI({
    fullname:"Samuykta kapoor",
    username:"samuu",
    email:"samuykta123@gmail.com",
    password:"sammu1234"
  }))

  return (
   
   <div>
       <AppRouter />
   </div>

  )
}

export default App