import React from 'react'
import {User,Sale,Item} from '../helpers/models.js'
import BuyerPartnershipRow from './BuyerPartnershipRow.js'

class BuyerPartnershipsTable extends React.Component {

	render() {
		let partnerships = this.props.partnerships
		if (!partnerships || partnerships.length == 0) {
			return null
		}

		let rows = []
		partnerships.forEach((p) => {
			rows.push(
				<BuyerPartnershipRow
					key = {p.id}
					handleInviteeChange = {this.props.handleInviteeChange}
					partnership = {p}
					currentUser = {this.props.currentUser}
				/>
			)
		})

		return (
			<div className="partner-container">
				<div>Fill in your partner's name for each of these activities. If your partner has not registered for the event, please ask them to do so.  You can leave this box blank and update it once your partner has registered.</div><br/>
				<table className="partner-table">
					<thead>
						<tr>
							<th className="category-header">Activity</th>
							<th colspan="2" className="category-header">Partner</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

export default BuyerPartnershipsTable