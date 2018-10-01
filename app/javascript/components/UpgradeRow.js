import React from 'react'

class UpgradeRow extends React.Component {
	render() {
		// bind all props to local variables
		const upgrade = this.props.upgrade
		const upgradeFrom = this.props.upgradeFromItem
		const upgradeTo = this.props.upgradeToItem
		const price = this.props.price
		const selected = this.props.selected
		const enabled = this.props.enabled
		const handleSelection = this.props.handleSelection

		// construct spans
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'

		let upgradeFromSpan = <span className={className}>{upgradeFrom.name}</span>
		let upgradeToSpan = <span className={className}>{upgradeTo.name}</span>
		let priceSpan = <span className={className}>{price}</span>
		
		return (
			<tr className="item-row">
				<td>
					<input 
  						type = "checkbox"
  						disabled = {!enabled}
  						checked = {selected}
  						onChange = {handleSelection}
  						id = {upgrade.id}
  					/>
				</td>
				<td>{upgradeFromSpan}</td>
				<td>{upgradeToSpan}</td>
				<td>{priceSpan}</td>
			</tr>
		)
	}
}

export default UpgradeRow