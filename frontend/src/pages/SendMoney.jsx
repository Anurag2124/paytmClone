import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export const SendMoney = () => {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);


  return <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex items-center">
        <div className="bg-white w-96 p-2 px-4 h-max rounded-lg text-center shadow-lg">
        
        <div className="text-3xl font-bold pb-6 pt-4">
          Send Money
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <div className="rounded-full size-12 bg-green-600 flex justify-center
            items-center mr-2">
              <div className="text-2xl text-white">
                {name[0].toUpperCase()}
              </div>
            </div>

            <div className="text-xl font-semibold"> {name} </div>
          </div>

          <div className="flex flex-col pt-2 pb-4 gap-1">
            <label className="pl-1 text-left font-semibold">Amount (in Rs)</label>
            <input onChange={(e) => {
              setAmount(e.target.value)
            }} 
            className="border w-full rounded-lg px-2 py-1 
            border-slate-200" 
            type="number" 
            placeholder="Enter amount"/>
          </div>

          <button onClick={() => {
            axios.post("http://localhost:3000/api/v1/account/transfer", {
              to: id,
              amount
            }), {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          }} className="bg-green-600 hover:bg-green-700 focus:ring-4 
        focus:ring-slate-300 text-white text-sm w-full focus:outline-none
          font-medium rounded-lg px-5 py-2.5 me-2 mb-2">Initiate Transfer</button>
        </div>

        </div>
    </div>
  </div>
}