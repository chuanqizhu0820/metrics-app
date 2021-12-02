
import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, LabelList, ResponsiveContainer } from 'recharts';
import './details.css'

function ChartNew(props){
    return (
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart 
                title="New cases"
                data={props.data}
                >
                <XAxis axisLine={false} tick={{ fill: 'white' }} dataKey="date" height={50} label={{ value: 'Daily new cases', position: 'insideBottom', fontSize: '20', fill: 'white'}} />
                <Scatter dataKey="new" fill="white" line shape="square">
                <LabelList dataKey="new" position="bottom" style={{ fill: 'white' }}/>
                </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
    )
}

function ChartDeaths(props){
    return (
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart 
                title="New deaths"
                data={props.data}
                >
                <XAxis axisLine={false} tick={{ fill: 'white' }} dataKey="date" height={50} label={{ value: 'Daily new deaths', position: 'insideBottom', fontSize: '20', fill: 'white'}} />
                <Scatter dataKey="deaths" fill="white" line shape="square">
                <LabelList dataKey="deaths" position="bottom" style={{ fill: 'white' }}/>
                </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
    )
}

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

    return (!!data? (
        <div className="detail-page d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center" style={{paddingBottom:'15px'}}>
            <h1>{country}</h1>
            <p>Recent daily cases and deaths</p>
        </div>
        <div className="chart-container">
            <ChartNew data={data} />
            <ChartDeaths data={data} />
        </div>
        </div>
    ):<div>data is loading...</div>)
}

export default Details