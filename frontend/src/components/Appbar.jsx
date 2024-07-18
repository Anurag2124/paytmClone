import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {jwtDecode} from 'jwt-decode'
import { loggedInUserState } from "../store/atoms";

export const Appbar = () => {
  const [user, setUser] = useRecoilState(loggedInUserState)
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token);
  const loggedInUserId = decodedToken.userId

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const allUsers = response.data.users;

      const filteredUsers = allUsers.filter( user => user._id === loggedInUserId )
      
      setUser(filteredUsers)
    } 
    fetchUsers()
  },[setUser,loggedInUserId,token])



  return <div className="flex justify-between h-14 p-2 shadow items-center">
    <div className="mb-1 mt-1 font-bold ml-4">
      PayTM App
    </div>

    <div className="flex items-center mb-1 mt-1">
      <div className="mr-2 font-semibold">
        Hello
      </div>

      <div className="rounded-full size-10 bg-slate-200 flex justify-center
      items-center mr-4">
        <div className="text-lg font-semibold">
          {user && user.length > 0 ? user[0].firstName[0].toUpperCase() : '...'}
        </div>
      </div>

    </div>
  </div>
}