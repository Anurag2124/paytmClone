import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
  return <div>
    <Heading label={'Signup'}/>
    <SubHeading label={'Enter your information to create an account'}/>
    <InputBox label={'First Name'} placeholder={'John'}/>
    <InputBox label={'Last Name'} placeholder={'Doe'}/>
    <InputBox label={'Email'} placeholder={'John@gmail.com'}/>
    <InputBox label={'Password'} placeholder={'123456'}/>
    <Button label={'Signup'}/>
    <BottomWarning label={'Already have an account'} buttonText={'Sign in'} to={'/signin'}/>
  </div>
}