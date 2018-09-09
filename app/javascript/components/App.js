import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardContainer from './DashboardContainer'


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
        {this.props.greeting}
          <Switch>
            <Route exact path= '/' render={(props)=><DashboardContainer {...props} /> } />          
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
