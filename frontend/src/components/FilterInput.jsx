import { useSetRecoilState } from "recoil"
import { filterState } from "../store/atoms"

export const FilterInput = () => {
  const setFilter = useSetRecoilState(filterState)
  return (
    <div className="my-2">
      <input onChange={(e) => {
        setFilter(e.target.value)
      }} className="border w-full rounded px-2 py-1 
      border-slate-200" type="text" placeholder="Search users..."/>
    </div>
  )
}