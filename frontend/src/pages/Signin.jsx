import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
  return <div className="bg-slate-100 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="bg-white w-80 p-2 px-4 h-max rounded-lg text-center shadow-lg">
      <Heading label={'Signin'}/>
      <SubHeading label={'Enter your credentials to access your account'}/>
      <InputBox label={'Email'} placeholder={'john@gmail.com'}/>
      <InputBox label={'Password'} placeholder={'123456'}/>
      <div className="pt-4">
        <Button label={'Sign In'}/>
      </div>
      <BottomWarning label={'Don\'t have an account?'} buttonText={'Sign Up'} to={'/signup'}/>
    </div>
  </div>
</div>
}