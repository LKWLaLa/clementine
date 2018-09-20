import React from 'react'
import UpgradeRow from './UpgradeRow.js'
import ExchangeRow from './ExchangeRow.js'
import ItemTypeRow from './ItemTypeRow.js'

class UpgradesTable extends React.Component {
	toEnabled(upgradeId) {
		let upgradeToItemId = this.props.upgrade[upgradeId].upgradeToItemId
		let s = this.props.status[upgradeToItemId]
		return !(s.ineligible || s.excluded || this.props.item[upgradeToItemId].soldOut)
	}

	fromEnabled(upgradeId) {
		let upgradeFromItemId = this.props.upgrade[upgradeId].upgradeFromItemId
		return this.props.priorItemIds.has(upgradeFromItemId)
	}

	enabled(upgradeId) {
		return this.props.selectedUpgradeIds.has(upgradeId) ||
				(this.toEnabled(upgradeId) && this.fromEnabled(upgradeId))
	}

	render() {
		const upgrades = this.props.upgrades
		const exchanges = this.props.exchanges
		const item = this.props.item
		const selectedUpgradeIds = this.props.selectedUpgradeIds
		const status = this.props.status
		const handleSelection = this.props.handleSelection

		let upgradeRows = upgrades.map(u => {
			let enabled = this.enabled(u.id)
			return <UpgradeRow
				key = {u.id}
				upgradeId = {u.id}
				upgradeFromItemId = {u.upgradeFromItemId}
				upgradeToItemId = {u.upgradeToItemId}
				price = {u.upgradePrice}
				item = {item}
				selected = {selectedUpgradeIds.has(u.id)}
				enabled = {enabled}
				handleSelection = {handleSelection} />
		})

		let exchangeRows = exchanges.map(u => 
			<ExchangeRow
				key = {u.id}
				upgradeId = {u.id}
				oldItemId = {u.upgradeFromItemId}
				newItemId = {u.upgradeToItemId}
				item = {item}
				selected = {selectedUpgradeIds.has(u.id)}
				enabled = {this.enabled(u.id)}
				handleSelection = {handleSelection}/>
		)

		return (
			<table>
				<thead>
					<tr><th colSpan="4">Upgrades and Exchanges</th></tr>
					<tr><td colSpan="4">Upgrades</td></tr>
					<tr>
						<th> </th>
						<th>Upgrade From Item</th>
						<th>To Item</th>
						<th>Price of Upgrade</th>
					</tr>
				</thead>
				<tbody>
					{upgradeRows}
				</tbody>
				<thead>
					<tr><td colSpan="4">Exchanges</td></tr>
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

export default UpgradesTable