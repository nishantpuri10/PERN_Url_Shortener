import { useState } from "react"
import React, { useEffect }  from 'react'

function Listurltable({ updateTable }) {
  const [urls, seturls] = useState([]);

  /////SHOW urltable//////////////////
  const geturls = async()=>{
    try {
        const resp = await fetch("http://localhost:5000/all");
        const jsonData =await resp.json();

        console.log(jsonData);
        seturls(jsonData);

    } catch (err) {
        console.error(err.message);
    }
}

useEffect(() => {
  geturls();
}, [updateTable]);

console.log({urls});

  return (
    <>
        <h3 style={{textAlign : "center" , fontFamily:"Times New Roman" }}>URL LIST</h3>

    <table class="table">
  
    <tr>
      <th scope="col">S.no.</th>
      <th scope="col">Orignal URL</th>
      <th scope="col">Shorten URL</th>
      
    </tr>
  
  {urls.map((todo,index)=>(
        <tr>
            <td>{index+1}</td>
            <td>{todo.origurl}</td>
            <td>{todo.shorturl}</td>
             </tr>
    ))}
    
  
  
</table>

    </>
  )
}

export default Listurltable