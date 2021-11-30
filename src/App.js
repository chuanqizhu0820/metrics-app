import './App.css';
import Home from './componets/home';
import Details from './componets/details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { countryList } from './componets/home';

function App() {

  return (
    <Router>
      <div>
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {
            countryList.map((item)=>{
              return (
              <Route path={`/details/${item.toLowerCase()}`}>
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
