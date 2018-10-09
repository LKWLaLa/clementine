import React from 'react'
import {User,Sale,Item} from '../helpers/models.js'

class InviteePartnershipsTable extends React.Component {

	render() {
		let rows = [] // TODO fill in

		return (
			<div>
				<div>You've been selected by another attendee as a partner!</div>
				<table>
					<thead>
						<th>Item</th>
						<th>Person who selected you as their partner</th>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

export default InviteePartnershipsTable