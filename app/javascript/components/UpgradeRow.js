import React from 'react'

class UpgradeRow extends React.Component {

	render() {
		const upgradeId = this.props.upgradeId
		const item = this.props.item
		const upgradeFromItemId = this.props.upgradeFromItemId
		const upgradeToItemId = this.props.upgradeToItemId
		const price = this.props.price
		const selected = this.props.selected
		const enabled = this.props.enabled
		const handleSelection = this.props.handleSelection
		const limitingItems = this.props.limitingItems

		const upgradeFromSpan = <span>{item[upgradeFromItemId].name}</span>
		const upgradeToSpan = <span>{item[upgradeToItemId].name}</span>
		const priceSpan = <span>{price}</span>

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