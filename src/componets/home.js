import { useState, useEffect } from 'react';
export const countryList = ['China', 'Japan', 'Germany', 'US', "United Kingdom", "Russia", "France"];

function Home(){
   
   let datenow = new Date();
   datenow.setDate(datenow.getDate() - 1);
   datenow = datenow.toISOString().split('T')[0];
   console.log(datenow);
   const [data, setData] = useState(null);

   useEffect(()=>fetch(`https://api.covid19tracking.narrativa.com/api/${datenow}`)
  .then(res => res.json())
  .then(data => setData(data)), [])

  console.log(data);

    return (
        <>
        <h4>{datenow}</h4>
        <ul>
            {countryList.map((item)=>
            {
                return (<a href={`details/${item.toLowerCase()}`}>
                <li key={item}>
                    <div>{item}</div>
                    <div>{!!data ? data.dates[datenow].countries[item].today_new_confirmed : "0"}</div>
                </li>
                </a>)
            }
                )}
        </ul>
        
        </>
    )
}

export default Home