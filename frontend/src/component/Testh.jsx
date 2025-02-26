import {  useEffect, useState } from "react"


function Testh(){
  const [rendor, setrendor]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setrendor(false)
    },10000)
},[])

return(
  <>
  {rendor ? <Mycomponent/> : <div>Aman</div>}
  </>
)
}
function Mycomponent(){
    // const [count, setcount]=useState(0);
    // const increament=()=>{
    //     setcount(count+1)
    // };
    useEffect (()=>{
      console.log("component mouted")
    return ()=>{
      console.log("Domponent unmounted")
    }
  },[])
    
  return <div>
    form inside my component
  </div>
}
export default Testh
