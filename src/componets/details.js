import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScatterChart, Scatter, XAxis, YAxis, LabelList, ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { loadDetails } from '../redux/details';
import './details.css';

function ChartNew({ data, mm }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        title="New cases"
        data={data}
      >
        <XAxis
          axisLine={false}
          tick={{ fill: 'white' }}
          dataKey="date"
          height={50}
          label={{
            value: 'Daily new cases', position: 'insideBottom', fontSize: '20', fill: 'white',
          }}
        />
        <YAxis hide type="number" domain={mm} />
        <Scatter dataKey="new" fill="white" line shape="square">
          <LabelList dataKey="newc" position="top" style={{ fill: 'white' }} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function ChartDeaths({ data, mm }) {
  return (
    <ResponsiveContainer width="100%" height={300} style={{ paddingTop: '20px' }}>
      <ScatterChart
        title="New deaths"
        data={data}
      >
        <XAxis
          axisLine={false}
          tick={{ fill: 'white' }}
          dataKey="date"
          height={50}
          label={{
            value: 'Daily new deaths', position: 'insideBottom', fontSize: '20', fill: 'white',
          }}
        />
        <YAxis hide type="number" domain={mm} />
        <Scatter dataKey="deaths" fill="white" line shape="circle">
          <LabelList dataKey="deathsc" position="top" style={{ fill: 'white' }} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function Details({ country }) {
  let datenow = new Date();
  let datebefore = new Date();
  datenow.setDate(datenow.getDate() - 1);
  [datenow] = [...datenow.toISOString().split('T')];
  datebefore.setDate(datebefore.getDate() - 7);
  [datebefore] = [...datebefore.toISOString().split('T')];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.detailReducer[0]);

  useEffect(() => fetch(`https://api.covid19tracking.narrativa.com/api/country/${country}?date_from=${datebefore}&date_to=${datenow}`)
    .then((res) => res.json())
    .then((data) => {
      let dataChart = [];
      Object.keys(data.dates).map((item) => {
        const newCases = Object.values(Object.values(data.dates[item])[0])[0].today_new_confirmed;
        const newDeaths = Object.values(Object.values(data.dates[item])[0])[0].today_new_deaths;
        const dataObj = {
          date: item.substring(5), new: newCases, deaths: newDeaths, newc: newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), deathsc: newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        };
        dataChart = [...dataChart, dataObj];
        return 0;
      });
      const newArr = [];
      const dArr = [];
      dataChart.forEach(((item) => { newArr.push(item.new); dArr.push(item.deaths); }));
      let newMin = Math.min(...newArr);
      let newMax = Math.max(...newArr);
      const newRange = newMax - newMin;
      newMin -= newRange * 0.3;
      newMax += newRange * 0.3;

      let dMin = Math.min(...dArr);
      let dMax = Math.max(...dArr);
      const dRange = dMax - dMin;
      dMin -= dRange * 0.3;
      dMax += dRange * 0.3;
      dispatch(loadDetails({ detail: dataChart, newMM: [newMin, newMax], dMM: [dMin, dMax] }));
    }),[])// eslint-disable-line

  return (data ? (
    <div className="detail-page d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center" style={{ paddingBottom: '15px' }}>
        <h1>{country.toUpperCase()}</h1>
        <p>Recent daily cases and deaths</p>
      </div>
      <div className="chart-container">
        <ChartNew data={data.detail} mm={data.newMM} />
        <hr />
        <ChartDeaths data={data.detail} mm={data.dMM} />
      </div>
    </div>
  ) : (
    <div style={{
      position: 'fixed', top: '0%', left: '50%', transform: 'translate(-50%, 0)', paddingTop: '40vh', fontSize: '30px', backgroundColor: 'rgb(85, 85, 230)', height: '100vh', width: '100vw', textAlign: 'center', color: 'white',
    }}
    >
      Loading...
    </div>
  ));
}

Details.defaultProps = {
  country: null,
};

Details.propTypes = {
  country: PropTypes.string,
};

ChartNew.defaultProps = {
  data: null,
  mm: null,
};

ChartNew.propTypes = {
  data: PropTypes.objectOf,
  mm: PropTypes.arrayOf,
};

ChartDeaths.defaultProps = {
  data: null,
  mm: null,
};

ChartDeaths.propTypes = {
  data: PropTypes.objectOf,
  mm: PropTypes.arrayOf,
};

export default Details;
