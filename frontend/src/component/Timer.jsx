import { useEffect, useState } from "react";
function useInterval(fn, timeout){
    useEffect(()=>{
        setInterval(()=>{
            fn();
        }, timeout);
    },[]);
}
const Timer = () => {
    const [ count, setcount]= useState(0);
    useInterval(()=>{
        setcount(c=>c+1);
    }, 1000)
  return (
    <div>
      Stopwatch Started {count}
    </div>
  )
}

export default Timer
