import React from 'react'

class UpgradeRow extends React.Component {

	render() {
		// bind all props to local variables
		const upgradeId = this.props.upgradeId
		const item = this.props.item
		const upgradeFromItemId = this.props.upgradeFromItemId
		const upgradeToItemId = this.props.upgradeToItemId
		const price = this.props.price
		const selected = this.props.selected
		const enabled = this.props.enabled
		const handleSelection = this.props.handleSelection
		const limitingItems = this.props.limitingItems

		// retrieve names
		const upgradeFromName = item[upgradeFromItemId].name
		const upgradeToName = item[upgradeToItemId].name

		// construct spans
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'

		let upgradeFromSpan = <span className={className}>{upgradeFromName}</span>
		let upgradeToSpan = <span className={className}>{upgradeToName}</span>
		let priceSpan = <span className={className}>{price}</span>
		
		return (
			<tr>
				<td>
					<input 
  						type = "checkbox"
  						disabled = {!enabled}
  						checked = {selected}
  						onChange = {handleSelection}
  						id = {upgradeId}
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