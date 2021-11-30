import { useState, useEffect } from 'react';
import './home.css';

export const countryList = ['China', 'Japan', 'Germany', 'US', "United Kingdom", "Russia", "France"];

function Home(){
   
   let datenow = new Date();
   datenow.setDate(datenow.getDate() - 1);
   datenow = datenow.toISOString().split('T')[0];
   const [data, setData] = useState(null);

   useEffect(()=>fetch(`https://api.covid19tracking.narrativa.com/api/${datenow}`)
  .then(res => res.json())
  .then(data => setData(data)),[])// eslint-disable-line

    return (
        <>
        <h4>{datenow}</h4>
        <div className="row row-cols-2">
            {countryList.map((item)=>
            {
                return (<a href={`details/${item.toLowerCase()}`}>
                <div key={item} className="home-items col d-flex flex-row justify-content-between">
                    <div>{item}</div>
                    <div>{!!data ? data.dates[datenow].countries[item].today_new_confirmed : "0"}</div>
                </div>
                </a>)
            }
                )}
        </div>
        
        </>
    )
}

export default Home