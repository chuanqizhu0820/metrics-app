
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './details.css'

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
  .then(data => 
    {
        let dataChart = []
        Object.keys(data.dates).map((item)=>{
            const newCases = Object.values(Object.values(data.dates[item])[0])[0].today_new_confirmed;
            const newDeaths = Object.values(Object.values(data.dates[item])[0])[0].today_new_deaths;
            let dataObj = {date:item.substring(5), new: newCases, deaths: newDeaths }
            dataChart = [...dataChart, dataObj];
            return 0
        });
        setData(dataChart);
    }),[])// eslint-disable-line

     console.log(data);
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                width={600}
                height={300}
                data={data}
                >
                <XAxis axisLine={false} dataKey="date" height={50}/>
                <Bar dataKey="new" fill="#8884d8" label={{ fill: 'black', fontSize: 15 }}/>
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                width={600}
                height={300}
                data={data}
                >
                <XAxis axisLine={false} dataKey="date" height={50}/>
                <Bar dataKey="deaths" fill="#242E52" label={{ fill: 'white', fontSize: 15 }}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Details