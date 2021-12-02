import './App.css';
import Home from './componets/home';
import Details from './componets/details';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadHome } from './redux/app';

export const countryList = ['China', 'Japan', 'Germany', 'US', "United Kingdom", "Russia", "France", "Italy", "Spain", "India"];

let datenow = new Date();
datenow.setDate(datenow.getDate() - 1);
datenow = datenow.toISOString().split('T')[0];

export const dateNow = datenow;

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://api.covid19tracking.narrativa.com/api/${datenow}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadHome({ home: data }));
      });
  }, []); // eslint-disable-line

  return (
    <Router>
      <div>
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
           <Route path="/home">
            <Home />
          </Route>
          {
            countryList.map((item)=>{
              return (
              <Route path={`/details/${item.toLowerCase()}`}>
              <div style={{backgroundColor:'rgb(85, 85, 230)', paddingLeft:'10px', border: 'solid 5px rgb(85, 85, 230)'}}>
              <Link to="/home" style={{textDecoration: 'none', fontSize:'20px', color:"white"}}>{"<"}</Link>
              </div>
              <Details country={`${item.toLowerCase()}`} />
              </Route> 
              )
            })
            
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
