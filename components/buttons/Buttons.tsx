"use client"

import {Status} from "@/interface/post";
import action from "@/components/buttons/actions";

export function ButtonConfirm({item_id}:{item_id:number}) {
    return(
        <button
            onClick={async () => {
                await Confirm(item_id)
            }}
            className={"bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-2.5 rounded focus:outline-none focus:shadow-outline"}>
            Принять
        </button>
    )
}
async function Confirm(item_id:number){
    await fetch(`http://localhost:3001/post/${item_id}`,{
        method:"PATCH",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({status:Status.подтверждено})
    },)
    action(item_id.toString())
}

export function ButtonDecline({item_id}:{item_id:number}) {
    return(
        <button
            onClick={async () => {
                await Decline(item_id)
            }}
            className={"bg-red-600 hover:bg-red-800 text-white font-bold py-1.5 px-2.5 rounded focus:outline-none focus:shadow-outline"}>
            Отклонить
        </button>
    )
}
async function Decline(item_id:number){
    await fetch(`http://localhost:3001/post/${item_id}`,{
        method:"PATCH",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({status:Status.отклонено})
    })
    action(item_id.toString())
}
