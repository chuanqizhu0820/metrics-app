
import { useState, useEffect } from 'react';

function Details({country}){

   let datenow = new Date();
   let datebefore = new Date();
   datenow.setDate(datenow.getDate() - 1);
   datenow = datenow.toISOString().split('T')[0];
   datebefore.setDate(datebefore.getDate() - 7);
   datebefore = datebefore.toISOString().split('T')[0];
   const [data, setData] = useState(null);

   useEffect(()=>fetch(`https://api.covid19tracking.narrativa.com/api/country/${country}?date_from=${datebefore}&date_to=${datenow}`)
  .then(res => res.json())
  .then(data => setData(data.dates)),[])// eslint-disable-line

    return (
        <div>
             <h1>here are the details of {country}</h1>
             {!!data ? Object.keys(data).map((item)=>{
                 return (
                     <>
                     <div>{item}</div>
                     <div>{Object.values(Object.values(data[item])[0])[0].today_new_confirmed}</div>
                     <div>{Object.values(Object.values(data[item])[0])[0].today_new_deaths}</div>
                     </>
                 )
             }
             ): ""}

        </div>
    )
}

export default Details