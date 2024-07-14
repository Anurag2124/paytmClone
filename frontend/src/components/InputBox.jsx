export const InputBox = ({label, placeholder}) => {
  return <div>
    <div>
      {label}
    </div>
    <input placeholder={placeholder}/>
  </div>
}