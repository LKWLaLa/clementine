import React from 'react'
import InviteePartnershipRow from './InviteePartnershipRow.js'

class InviteePartnershipsTable extends React.Component {

	render() {
		if (!this.props.partnerships || this.props.partnerships.length == 0) {
			return null;
		}

		let rows = []
		this.props.partnerships.forEach(p => {
			rows.push(<InviteePartnershipRow
				key = {p.id}
				partnership = {p}
			/>)
		})
			
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