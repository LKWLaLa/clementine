import React, {Component} from 'react'

class ItemRow extends React.Component {
	render() {
		const item = this.props.item
		const color = this.props.enabled ? 'black' : 'grey'
		const nameSpan = <span style={{color: color}}>{item.name}</span>
		const priceSpan = <span style={{color: color}}>{item.currentPrice}</span>
   
		return (
			<tr>
      	<td>
					<input 
						type = "checkbox"
						disabled = {!this.props.enabled}
						checked = {this.props.selected}
						onChange = {this.props.handleSelection}
						id = {item.id}
					/>
  		  </td>
				<td>{nameSpan}</td>
				<td>{priceSpan}</td>
			</tr>
		)
	}
}

export default ItemRow