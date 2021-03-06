import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardContainer from './DashboardContainer'
import {StripeProvider} from 'react-stripe-elements'

class App extends Component {

	render() {
		return (
			<StripeProvider apiKey={process.env.PUBLISHABLE_KEY}>
				<Router>
					<div className="App">
						<Switch>
							<Route exact path= '/' render={(props)=><DashboardContainer {...props} timeout = {this.props.timeout}/> } />
						</Switch>
					</div>
				</Router>
			</StripeProvider>
		)
	}
}

export default App
