import React, {Component} from 'react'

class ItemRow extends React.Component {
	render() {
		const item = this.props.item
    const limitingItems = this.props.limitingItems
		const color = this.props.enabled ? 'black' : 'grey'
		const nameSpan = <span style={{color: color}}>{item.name}</span>
		const priceSpan = <span style={{color: color}}>{item.currentPrice}</span>
    const limitingItemDivs = limitingItems ? limitingItems.map(itemId => {
        let limitingItem = this.props.items.find(item => item.id == itemId)
        return <div key = {itemId}>{limitingItem.name}</div>
      }) : []
   
    const nameDiv = this.props.enabled ? nameSpan :
              (<div className="tooltip">
                {nameSpan}
                <div className="tooltiptext">
                  {this.props.message}
                  {limitingItemDivs}
                </div>
              </div>)

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
  				<td>{nameDiv}</td>
  				<td>{priceSpan}</td>
      </tr> 
		)
	}
}

export default ItemRow