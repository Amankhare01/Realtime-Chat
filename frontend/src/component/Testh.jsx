import { useState } from "react"

const Testh = () => {
  return (
    <>
    <Mycomponent/>
    </>
  )
}
function Mycomponent(){
    const [count, setcount]=useState(0);
    const increament=()=>{
        setcount(count+1)
    };

    return(
        <>
        <center><h1>{count}</h1></center>
        <button onClick={increament}>click</button>
        </>
    )
}
export default Testh
