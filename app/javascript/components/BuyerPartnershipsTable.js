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
					handlePartnerChange = {this.props.handlePartnerChange}
					partnership = {p}
				/>
			)
		})

		return (
			<div>
				<div>Fill in your partner's name for each of these activities. If your partner has not registered for the event, please ask them to do so.  You can leave this box blank and update it once your partner has registered.</div><br/>
				<table>
					<thead>
						<tr>
							<th className="category-header">Activity</th>
							<th className="category-header">Partner</th>
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