import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage"

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Router>
            <Switch>
              <Route path='/' exact component={LoginPage}/>
              <Route path='/main' exact component={MainPage} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
