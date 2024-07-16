export const Button = ({label, onClick}) => {
  return <button className="bg-slate-800 hover:bg-slate-900 focus:ring-4 
  focus:ring-slate-300 text-white text-sm w-full focus:outline-none
  font-medium rounded-lg px-5 py-2.5 me-2 mb-2" onClick={onClick}>
    {label}
  </button>
}