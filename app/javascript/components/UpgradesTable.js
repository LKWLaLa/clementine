import React from 'react'
import UpgradeRow from './UpgradeRow.js'

class UpgradesTable extends React.Component {
	render() {
		const upgrades = this.props.upgrades
		const exchanges = this.props.exchanges
		const item = this.props.item
		const selectedUpgradeIds = this.props.selectedUpgradeIds
		const status = this.props.status
		const handleSelection = this.props.handleSelection

		let upgradeRows = upgrades.map(u => {
			let enabled = this.props.enabled(u.id)
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

		return (
			<table>
				<thead>
					<tr><th colSpan="4">Upgrades</th></tr>
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
			</table>
		)
	}
}

export default UpgradesTable