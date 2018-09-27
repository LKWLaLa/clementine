import React from 'react'

class ExchangeRow extends React.Component {

	render() {
		const upgrade = this.props.upgrade
		const oldItem = this.props.oldItem
		const newItem = this.props.newItem
		const selected = this.props.selected
		const enabled = this.props.enabled
		const handleSelection = this.props.handleSelection

		// construct spans
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'

		let oldItemSpan = <span className={className}>{oldItem.name}</span>
		let newItemSpan = <span className={className}>{newItem.name}</span>
		let priceSpan = <span className={className}>free</span>

		return (
			<tr>
				<td>
					<input 
  						type = "checkbox"
  						disabled = {!enabled}
  						checked = {selected}
  						onChange = {handleSelection}
  						id = {upgrade.id}
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