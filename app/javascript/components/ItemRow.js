import React from 'react'

class ItemRow extends React.Component {
	render() {
    const item = this.props.item
    const limitingItems = this.props.limitingItems
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'
		const nameSpan = <span className={className}>{item.name}</span>
    let remaining
    const warningThreshold = 5
    if (item.soldOut) {
      remaining = "Sold Out"
    } else if (item.quantityRemaining < warningThreshold) {
      remaining = `only ${item.quantityRemaining} left!`
    } else {
      remaining = ''
    }

		const remainingSpan = <span className={className}>{remaining}</span>
    const limitingItemDivs = limitingItems ? limitingItems.map(limitingItem => {
        return <div key = {limitingItem.id}>{limitingItem.name}</div>
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
  			<tr className="item-row">
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
  				<td>{remainingSpan}</td>
      </tr> 
		)
	}
}

export default ItemRow