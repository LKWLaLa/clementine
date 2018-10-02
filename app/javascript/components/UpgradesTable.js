import React from 'react'
import UpgradeRow from './UpgradeRow.js'

class UpgradesTable extends React.Component {
	render() {
		const upgrades = this.props.upgrades
		const selectedUpgrades = this.props.selectedUpgrades
		const handleSelection = this.props.handleSelection

		let upgradeRows = upgrades.map(u => {
			let enabled = this.props.enabled(u)
			return <UpgradeRow
				key = {u.id}
				upgrade = {u}
				upgradeFromItem = {u.upgradeFromItem}
				upgradeToItem = {u.upgradeToItem}
				price = {u.upgradePrice}
				selected = {selectedUpgrades.has(u)}
				enabled = {enabled}
				handleSelection = {handleSelection} />
		})

		return (
			<table>
				<thead>
					<tr><th colSpan="4" className="category-header">Upgrades</th></tr>
					<tr>
						<th className="column-header"> </th>
						<th className="column-header">Upgrade From Item</th>
						<th className="column-header">To Item</th>
						<th className="column-header">Price of Upgrade</th>
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