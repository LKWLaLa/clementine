import React from 'react'

class ExchangeRow extends React.Component {

	render() {
		const upgradeId = this.props.upgradeId
		const item = this.props.item
		const oldItemId = this.props.oldItemId
		const newItemId = this.props.newItemId
		const selected = this.props.selected
		const enabled = this.props.enabled
		const handleSelection = this.props.handleSelection

		// construct spans
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'

		let oldItemSpan = <span className={className}>{item[oldItemId].name}</span>
		let newItemSpan = <span className={className}>{item[newItemId].name}</span>
		let priceSpan = <span className={className}>free</span>

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
				<td>{oldItemSpan}</td>
				<td>{newItemSpan}</td>
				<td>{priceSpan}</td>
			</tr>
		)
	}
}

export default ExchangeRow