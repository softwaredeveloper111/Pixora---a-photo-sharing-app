
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  AuthContextProvider from "./features/auth/auth.context.jsx"
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(


<AuthContextProvider>
<BrowserRouter>
  <App />
  <ToastContainer />
</BrowserRouter>
</AuthContextProvider>

)
