import './App.css';
import Home from './componets/home';
import Details from './componets/details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
