import React from 'react'
import ExchangeRow from './ExchangeRow.js'

class ExchangesTable extends React.Component {
	render() {
		const exchanges = this.props.exchanges
		const selectedUpgrades = this.props.selectedUpgrades
		const handleSelection = this.props.handleSelection

		let exchangeRows = exchanges.map(u => 
			<ExchangeRow
				key = {u.id}
				upgrade = {u}
				oldItem = {u.upgradeFromItem}
				newItem = {u.upgradeToItem}
				selected = {selectedUpgrades.has(u)}
				enabled = {this.props.enabled(u)}
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