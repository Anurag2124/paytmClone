import { UserList } from "./UserList"
import { FilterInput } from "./FilterInput"

export const Users = () => {
  return <div>
    <div className="font-semibold mt-6 text-lg">
      Users
    </div>
    <FilterInput/>
    <UserList/>
  </div>
}

