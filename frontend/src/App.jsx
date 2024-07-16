import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { SendMoney } from './pages/SendMoney'
import { RecoilRoot } from 'recoil'
function App() {

  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/' element = {<Signin/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path='/sendMoney' element = {<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
