import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export const SendMoney = () => {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState('');
  const [transfer, setTransfer] = useState('')
  const [loading , setLoading ] = useState(false)

  const handleOnClick = async() => {
    if(amount<=0){
      setTransfer('invalid');
      setAmount('')
      setTimeout(() => setTransfer(''),700)
      return;
    }
    setLoading(true)
    try{
        await axios.post("http://localhost:3000/api/v1/account/transfer", {
          to: id,
          amount
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }).then(() => {
          setAmount("");
          setTransfer('success');
          setTimeout(() => setTransfer(''),2000)
        })
      }catch(error){
      console.log(error);
      setTransfer('failure');
    }finally{
      setLoading(false)
    }
  }


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
            value={amount}
            className="border w-full rounded-lg px-2 py-1 
            border-slate-200" 
            type="number" 
            placeholder="Enter amount"/>
          </div>

          <button onClick={handleOnClick} className="bg-green-600 hover:bg-green-700 focus:ring-4 
        focus:ring-slate-300 text-white text-sm w-full focus:outline-none
          font-medium rounded-lg px-5 py-2.5 me-2 ">{loading ? 'Processing...' : 'Initiate Transfer'}</button>
        {transfer === 'success' && <p className="text-green-500 pt-6 text-sm mx-auto">Transfer Successful</p>}
        {transfer === 'failure' && <p className="text-red-500 pt-6 text-sm mx-auto">Transfer Failed</p>}
        {transfer === 'invalid' && <p className="text-red-500 pt-6 text-sm mx-auto">Invalid amount</p>}
        </div>


        </div>
    </div>
  </div>
}