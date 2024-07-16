export const InputBox = ({label, placeholder, onChange}) => {
  return <div className="">
    <div className="font-medium text-sm text-left py-2">
      {label}
    </div>
    <input onChange={onChange} className='w-full px-2 py-1 border border-slate-200 rounded'  placeholder={placeholder}/>
  </div>
}