import React from 'react'
import ExchangeRow from './ExchangeRow.js'

class ExchangesTable extends React.Component {
	render() {
		const exchanges = this.props.exchanges
		const item = this.props.item
		const selectedUpgradeIds = this.props.selectedUpgradeIds
		const status = this.props.status
		const handleSelection = this.props.handleSelection

		let exchangeRows = exchanges.map(u => 
			<ExchangeRow
				key = {u.id}
				upgradeId = {u.id}
				oldItemId = {u.upgradeFromItemId}
				newItemId = {u.upgradeToItemId}
				item = {item}
				selected = {selectedUpgradeIds.has(u.id)}
				enabled = {this.props.enabled(u.id)}
				handleSelection = {handleSelection}/>
		)

		return (
			<table>
				<thead>
					<tr><th colSpan="4">Exchanges</th></tr>
					<tr>
						<th> </th>
						<th>Exchange Item</th>
						<th>For Item</th>
						<th>Price of Exchange</th>
					</tr>
				</thead>
				<tbody>
					{exchangeRows}
				</tbody>
			</table>
		)
	}
}

export default ExchangesTable