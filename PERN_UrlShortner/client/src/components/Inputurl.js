import React , {useState }from 'react'
import Listurltable from './Listurltable';

function Inputurl() {
    const [originalUrl, setoriginalUrl] = useState("");

    const updateTable = async () => {
       
        try {
          const response = await fetch("http://localhost:5000/all");
          const jsonData = await response.json();
          
        } catch (err) {
          console.error(err.message);
        }
      };


    const addurl = async(e)=>{
        
        try {
            const response = await fetch("http://localhost:5000/shorten" ,{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify({originalUrl})
            })

            console.log(response);
           
            setoriginalUrl("");     ///clear the input field after clicking add
            
            if (response.ok) {
                updateTable(); // Call the updateTable function to fetch the updated URL table
              }
        } catch (err) {
            console.error(err.message);
        }

    }


  return (
    <>
    <h1 className='text-center mt-5'>ContloAI's URL Shortening Project</h1>
    <form >
        <input type= "text"  value={originalUrl} onChange={(e)=>{setoriginalUrl(e.target.value)}}></input>
        <button className='btn btn-warning' type="button" onClick={addurl}>Shorten</button>    
    </form>
    <Listurltable updateTable={updateTable} />
    </>
  )
}

export default Inputurl