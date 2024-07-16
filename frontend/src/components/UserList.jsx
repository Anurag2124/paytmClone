import { useRecoilState, useRecoilValue } from "recoil"
import { filterState, usersState } from "../store/atoms"
import { useEffect } from "react"
import axios from "axios"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'

export const UserList = () => {
  const filter = useRecoilValue(filterState)
  const [users, setUsers] = useRecoilState(usersState)
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token);
  const loggedInUserId = decodedToken.userId

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const allUsers = response.data.users;
      const filteredUsers = allUsers.filter( user => user._id !== loggedInUserId )
      
      setUsers(filteredUsers)
    } 
    fetchUsers()
  },[filter, setUsers])

  return <div>
   {users.map(user => <User user={user} key={user._id}/>)}
  </div>
}

function User({user}) {
  const navigate = useNavigate();

  return <div className="flex justify-between items-center mt-4">
  <div className="flex items-center">

    <div className="rounded-full size-10 bg-slate-200 flex justify-center
      items-center mr-2">
      <div className="text-lg">
        {user.firstName[0]}
      </div>
    </div>

    <div>
      {user.firstName} {user.lastName}
    </div>

  </div>

  <div>
    <Button onClick={(e) => {
      navigate(`/sendMoney?id=${user._id}&name=${user.firstName} ${user.lastName}`)
    }} label={'Send Money'}/>
  </div>
</div>
}