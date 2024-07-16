import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signin = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return <div className="bg-slate-100 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="bg-white w-80 p-2 px-4 h-max rounded-lg text-center shadow-lg">
      <Heading label={'Signin'}/>
      <SubHeading label={'Enter your credentials to access your account'}/>

      <InputBox onChange={(e) => {
        setUsername(e.target.value)
      }} label={'Email'} placeholder={'john@gmail.com'}/>

      <InputBox onChange={(e) => {
        setPassword(e.target.value)
      }} label={'Password'} placeholder={'123456'}/>

      <div className="pt-4">
        <Button onClick={async() => {
          const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
            username,
            password
          })
          localStorage.setItem('token', response.data.token)
        }} label={'Sign In'}/>
      </div>
      <BottomWarning label={'Don\'t have an account?'} buttonText={'Sign Up'} to={'/signup'}/>
    </div>
  </div>
</div>
}