"use client"

import { addToFav } from "~/services/local"

const Button = ({fun} : { fun:any}) =>{
    return <button onClick={()=> addToFav(fun)} style={{color:'black'}}>aaaaaaa</button>
}

export default Button