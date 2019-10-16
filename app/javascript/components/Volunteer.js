import React from 'react'
import {User} from '../helpers/models.js'
import Network from '../helpers/Network.js'

class Volunteer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let descriptionDiv = "I would like to volunteer at " + this.props.currentEventName

		return (
			<table>
				<thead>
					<tr><th colSpan="2" className="category-header">Volunteering</th></tr>
					<tr>
						<th colSpan="2" className="category-subheader">
							Volunteers receive compensation of $15 per hour of service.  Volunteers do not receive discounted entry to the event.
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="item-row">
						<td>
							<input 
								type = "checkbox"
								checked = {this.props.selected}
								onChange = {this.props.handleSelection}
			  				/>
			  			</td>
		  				<td>
		  					<span>{descriptionDiv}</span>
		  				</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default Volunteer