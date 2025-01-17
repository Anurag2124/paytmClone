import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleOnClick = async() => {
    try{
      const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
      username: username,
      password: password
    })
    localStorage.setItem('token', response.data.token)
    navigate('/dashboard')
  }catch(error){
    console.error(error);
    setError(error.message)
  }
  }

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
        <Button onClick={handleOnClick} label={'Sign In'}/>
      </div>
      {error && <p className="text-red-500 text-sm mx-auto">{error}</p>}
      <BottomWarning label={'Don\'t have an account?'} buttonText={'Sign Up'} to={'/signup'}/>
    </div>
  </div>
</div>
}